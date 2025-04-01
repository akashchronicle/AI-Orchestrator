const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { analyzeRequest } = require('../services/groq');
const axios = require('axios');

router.post('/tasks', async (req, res) => {
  try {
    const { request } = req.body;

    const task = new Task({
      request,
      status: 'processing'
    });
    await task.save();

    const responseContent = await analyzeRequest(request);
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

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 