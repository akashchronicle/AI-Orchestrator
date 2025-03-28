AI Orchestrator with Containers

A containerized financial data analysis system using AI for real-time transaction insights.

![image](https://github.com/user-attachments/assets/4e538cec-5f4c-4aec-81c9-46ceb48b440c)
![image](https://github.com/user-attachments/assets/1c54fa36-36d6-455b-b68f-af3fd6e5c75b)


🚀 Features

Real-time transaction processing

Smart expense & income categorization

Multi-user support (Personal, Business, Student)

Containerized microservices for scalability

🏗 Architecture

Microservices

Data Cleaner – Parses, validates & normalizes data

Data Preprocessor – Categorizes transactions & detects patterns

Data Normalizer – Generates insights & financial reports

Tech Stack

Backend: Node.js, Express

Database: MongoDB

AI Integration: Groq LLM API

Containerization: Docker, Docker Compose

Frontend: React, Tailwind CSS

🛠 Setup

Clone repo: git clone https://github.com/yourusername/ai-orchestrator.git

Setup .env file with MongoDB & Groq API keys

Install dependencies & start services:

cd backend && npm install
cd ../frontend && npm install
docker-compose up -d

Access the app at http://localhost:80

🔍 API Endpoints

POST /api/tasks – Process transaction data

GET /api/tasks – Retrieve analysis history

🔄 Future Enhancements

AI-driven spending predictions

Multi-currency & tax support

Bank API integrations & mobile app

🔐 Security Best Practices

Store sensitive data in env variables

Use strong database passwords & backups

👥 Contributing

Fork & create a branch

Commit changes & push

Open a pull request
