const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Groq } = require('groq-sdk');
const Docker = require('dockerode');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const docker = new Docker();


const taskSchema = new mongoose.Schema({
  request: String,
  status: String,
  result: String,
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);


app.post('/api/tasks', async (req, res) => {
  try {
    const { request } = req.body;
    

    const task = new Task({
      request,
      status: 'processing'
    });
    await task.save();


    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI orchestrator that determines which containers to run based on user requests. ONLY respond with this exact JSON array for data processing tasks: ['data-cleaner', 'data-preprocessor', 'data-normalizer']. Do not include any other text or explanation."
        },
        {
          role: "user",
          content: request
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    });


    const responseContent = completion.choices[0].message.content.trim();
    console.log('Groq response:', responseContent);
    
 
    let containers = ['data-cleaner', 'data-preprocessor', 'data-normalizer'];
    

    let result = '';
    let processedData = { data: request }; 

    for (const containerName of containers) {
      try {
        console.log(`Processing with ${containerName}...`);
        
 
        let retries = 3;
        let response;
        
        while (retries > 0) {
          try {
            response = await axios.post(`http://${containerName}:${process.env.DATA_CLEANER_PORT}/process`, processedData);
            break;
          } catch (error) {
            retries--;
            if (retries === 0) throw error;
            console.log(`Retrying ${containerName}... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        if (containerName === 'data-cleaner') {
          processedData = { data: response.data.cleaned_transactions };
        } else if (containerName === 'data-preprocessor') {
          processedData = { data: response.data.processed_data };
        } else if (containerName === 'data-normalizer') {
          processedData = response.data;
        }

        result += `\n${containerName.toUpperCase()} OUTPUT:\n`;
        result += JSON.stringify(response.data, null, 2) + '\n';
        result += '-'.repeat(50) + '\n';

      } catch (error) {
        console.error(`Error with ${containerName}:`, error);
        result += `\nERROR in ${containerName}: ${error.message}\n`;
        result += '-'.repeat(50) + '\n';
      }
    }

    task.status = 'completed';
    task.result = result;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Error processing task:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 