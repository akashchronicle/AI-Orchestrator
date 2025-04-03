# AI Orchestrator with Containers

A sophisticated containerized system for AI-powered data processing and analysis, featuring microservices architecture and real-time processing capabilities.

## 🏗 System Architecture

### 1. Core Components

#### Backend Service
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Groq LLM API for intelligent decision-making
- **API Documentation**: RESTful endpoints with proper error handling
- **Security**: Environment-based configuration, CORS protection

#### Frontend Service
- **Framework**: React with Vite
- **UI Library**: Chakra UI for modern, responsive design
- **State Management**: React Hooks for local state
- **Routing**: React Router for navigation
- **API Integration**: Axios for backend communication

#### Containerized Microservices
1. **Data Cleaner Service**
   - Input validation and sanitization
   - Data format standardization
   - Duplicate detection and removal
   - Health check endpoint: `/health`

2. **Data Preprocessor Service**
   - Feature extraction
   - Data transformation
   - Pattern recognition
   - Health check endpoint: `/health`

3. **Data Normalizer Service**
   - Data scaling and normalization
   - Missing value handling
   - Output standardization
   - Health check endpoint: `/health`

### 2. Network Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │     │   Backend   │     │  MongoDB    │
│  (React)    │◄───►│  (Express)  │◄───►│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
                           ▲
                           │
         ┌─────────┬───────┴───────┬─────────┐
         │         │               │         │
    ┌────▼───┐ ┌──▼───┐       ┌───▼──┐ ┌───▼──┐
    │ Data   │ │ Data │       │ Data │ │ Groq │
    │Cleaner │ │ Pre- │       │Norm- │ │ LLM  │
    │Service │ │proc. │       │alizer│ │ API  │
    └────────┘ └──────┘       └──────┘ └──────┘
```

### 3. Data Flow

1. **Request Processing**
   - User submits request through frontend
   - Backend receives and validates request
   - Task created in MongoDB
   - Groq LLM analyzes request

2. **Data Processing Pipeline**
   - Data Cleaner: Initial data processing
   - Data Preprocessor: Feature extraction
   - Data Normalizer: Final standardization
   - Results stored in MongoDB

3. **Response Generation**
   - Processed results returned to frontend
   - Real-time status updates
   - Error handling and retry logic

### 4. Environment Configuration

```plaintext
MONGODB_URI=mongodb://mongodb:27017/ai_orchestrator
GROQ_API_KEY=your_groq_api_key
PORT=5000
DATA_CLEANER_PORT=3000
DATA_PREPROCESSOR_PORT=3000
DATA_NORMALIZER_PORT=3000
DOCKER_NETWORK=app-network
```

### 5. API Endpoints

#### Backend API
- `POST /api/tasks`: Create new processing task
- `GET /api/tasks`: Retrieve task history
- `GET /api/tasks/:id`: Get specific task details

#### Microservice Health Checks
- `GET /health`: Service health status
- Response: `{ status: "healthy", timestamp: "..." }`

### 6. Error Handling

- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Not Found Errors**: 404 Not Found
- **Server Errors**: 500 Internal Server Error
- **Retry Logic**: 3 attempts with exponential backoff

### 7. Security Measures

- Environment variable management
- CORS configuration
- Input validation and sanitization
- Error message sanitization
- Container isolation
- Network segmentation

### 8. Monitoring and Logging

- Container health checks
- Request logging
- Error tracking
- Performance monitoring
- Resource utilization tracking

## 🚀 Features

- Real-time data processing
- AI-powered decision making
- Containerized microservices
- Scalable architecture
- Modern UI/UX
- Comprehensive error handling
- Health monitoring
- Secure configuration

## 🛠 Setup Instructions

1. **Prerequisites**
   - Node.js (v18 or higher)
   - Docker and Docker Compose
   - MongoDB
   - Groq API key

2. **Installation**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/ai-orchestrator.git
   cd ai-orchestrator

   # Install dependencies
   cd backend && npm install
   cd ../frontend && npm install

   # Setup environment
   cp .env.example .env
   # Edit .env with your configuration

   # Start services
   docker-compose up -d
   ```

3. **Access**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## 🔄 Future Enhancements

1. **AI Improvements**
   - Enhanced pattern recognition
   - Predictive analytics
   - Custom model training

2. **Scalability**
   - Kubernetes integration
   - Load balancing
   - Auto-scaling

3. **Features**
   - User authentication
   - Role-based access
   - Advanced analytics
   - Export capabilities

4. **Monitoring**
   - Prometheus integration
   - Grafana dashboards
   - Alerting system

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
