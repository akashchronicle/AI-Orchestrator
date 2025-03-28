# AI Orchestrator with Containers

A sophisticated financial data analysis system that uses containerized microservices and AI to process, analyze, and generate insights from various types of transaction data.

## 🚀 Features

### Core Functionality
- Real-time transaction processing and analysis
- Smart categorization of expenses and income
- Detailed financial insights generation
- Multi-user type support (Personal, Business, Student)
- Containerized microservices architecture

### Supported Data Types
1. **Personal Finance**
   - Daily transactions
   - Credit/Debit tracking
   - Entertainment and utility bills
   - Shopping and food expenses

2. **Business Transactions**
   - Revenue streams
   - Operational expenses
   - Inventory management
   - Staff payments
   - Marketing costs

3. **Student Finances**
   - Educational expenses
   - Scholarship tracking
   - Part-time income
   - Basic necessities

## 🏗 Architecture

### Microservices
1. **Data Cleaner**
   - Raw data parsing
   - Data validation
   - Format standardization
   - Date normalization

2. **Data Preprocessor**
   - Transaction categorization
   - Pattern recognition
   - Daily totals calculation
   - Category grouping

3. **Data Normalizer**
   - Financial analysis
   - Insight generation
   - Trend identification
   - Report formatting

### Technologies Used
- Backend: Node.js with Express
- Database: MongoDB
- AI Integration: Groq LLM API
- Containerization: Docker
- Orchestration: Docker Compose
- Frontend: React with Chakra UI

## 🛠 Setup Instructions

### Prerequisites
```bash
- Node.js (v14 or higher)
- Docker
- Docker Compose
- MongoDB
- Git
```

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/ai-orchestrator.git
cd ai-orchestrator
```

2. **Environment Setup**
```bash
# Copy example environment file
cp .env.example .env

# Update .env with your values
# Required variables:
# - MONGODB_URI (Your MongoDB connection string)
# - GROQ_API_KEY (Your Groq API key)
```

3. **Install Dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

4. **Start the Application**
```bash
# Start all services
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost:80
- Backend API: http://localhost:5000

## 📝 Usage Examples

### 1. Personal Finance Analysis
```json
Input:
{
  "request": "Transaction Data:
  - HDFC Bank: INR 25,000 (Credit) - 15/03/2024
  - Amazon Pay: INR 2,499 (Debit) - 16/03/2024
  - PhonePe: INR 15,000 (Credit) - 16/03/2024
  - Swiggy: INR 750 (Debit) - 17/03/2024
  - Netflix: INR 649 (Debit) - 18/03/2024"
}
```

### 2. Business Transaction Analysis
```json
Input:
{
  "request": "Transaction Data:
  - Shop Rent: INR 45,000 (Debit) - 01/03/2024
  - Inventory Purchase: INR 1,25,000 (Debit) - 02/03/2024
  - Customer Payment: INR 35,000 (Credit) - 03/03/2024
  - Online Sales: INR 78,000 (Credit) - 05/03/2024"
}
```

### 3. Student Finance Tracking
```json
Input:
{
  "request": "Transaction Data:
  - Scholarship Credit: INR 15,000 (Credit) - 01/03/2024
  - Hostel Fee: INR 8,000 (Debit) - 02/03/2024
  - Books Purchase: INR 2,500 (Debit) - 05/03/2024
  - Part-time Work: INR 12,000 (Credit) - 10/03/2024"
}
```

## 📊 Sample Outputs

### Financial Analysis
```json
{
  "analysis": {
    "summary": {
      "total_credits": 40000,
      "total_debits": 3898,
      "net_balance": 36102
    },
    "categorized_expenses": {
      "shopping": {
        "total": 2499,
        "transactions": ["Amazon Pay"]
      },
      "food": {
        "total": 750,
        "transactions": ["Swiggy"]
      },
      "entertainment": {
        "total": 649,
        "transactions": ["Netflix"]
      }
    },
    "insights": [
      "Net savings rate: 90.25% of total income",
      "Highest expense category is shopping at 64.11%",
      "Entertainment expenses are 16.65% of total spending"
    ]
  }
}
```

## 🔍 API Endpoints

### POST /api/tasks
Process new transaction data
- Request: Transaction data in specified format
- Response: Processed analysis with insights

### GET /api/tasks
Retrieve processing history
- Response: List of processed tasks with results

## 🛡 Error Handling

The system includes robust error handling:
- Input validation
- Data processing retry logic
- Container health checks
- Graceful failure recovery

## 🔄 Container Orchestration

- Automatic container health monitoring
- Service dependency management
- Load balancing ready
- Scalable architecture

## 📈 Future Enhancements

1. **Advanced Analytics**
   - Machine learning for pattern recognition
   - Predictive spending analysis
   - Investment recommendations

2. **Additional Features**
   - Multi-currency support
   - Tax calculation
   - Budget planning tools
   - Investment tracking

3. **Integration Options**
   - Bank API connections
   - Export to accounting software
   - Mobile app support

## 🔐 Security Notes

1. **Environment Variables**
   - Never commit `.env` file
   - Use `.env.example` for documentation
   - Keep sensitive data secure

2. **API Keys**
   - Use environment variables
   - Rotate keys regularly
   - Monitor usage

3. **Database**
   - Use strong passwords
   - Enable authentication
   - Regular backups

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and queries:
1. Create an issue in the repository
2. Contact the maintainers
3. Check existing documentation 