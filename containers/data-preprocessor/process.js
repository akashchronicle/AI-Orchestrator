const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const CATEGORIES = {
    'amazon': 'shopping',
    'swiggy': 'food',
    'netflix': 'entertainment',
    'hdfc': 'banking',
    'phonepe': 'transfer'
};

function categorizeTransaction(source) {
    const sourceLower = source.toLowerCase();
    for (const [keyword, category] of Object.entries(CATEGORIES)) {
        if (sourceLower.includes(keyword)) {
            return category;
        }
    }
    return 'other';
}

app.post('/process', (req, res) => {
    try {
        console.log('Received data:', JSON.stringify(req.body, null, 2));
        
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error('Invalid input: expecting array of transactions');
        }

        const processedData = {
            transactions_by_type: {
                credits: [],
                debits: []
            },
            daily_totals: {},
            categories: {}
        };

        data.forEach(transaction => {
            const { source, amount, type, date } = transaction;
            const category = categorizeTransaction(source);

            if (type === 'credit') {
                processedData.transactions_by_type.credits.push({
                    ...transaction,
                    category
                });
            } else {
                processedData.transactions_by_type.debits.push({
                    ...transaction,
                    category
                });
            }

            if (!processedData.daily_totals[date]) {
                processedData.daily_totals[date] = { credits: 0, debits: 0 };
            }
            processedData.daily_totals[date][type + 's'] += amount;

            if (!processedData.categories[category]) {
                processedData.categories[category] = { total: 0, transactions: [] };
            }
            if (type === 'debit') {
                processedData.categories[category].total += amount;
                processedData.categories[category].transactions.push(source);
            }
        });

        res.json({ 
            processed_data: processedData,
            metadata: {
                transactions_processed: data.length,
                processing_timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Processing error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Data preprocessor service running on port ${PORT}`);
}); 