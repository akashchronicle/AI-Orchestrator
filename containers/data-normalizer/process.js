const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

function calculatePercentage(part, total) {
    return ((part / total) * 100).toFixed(2);
}

function generateInsights(summary, categories) {
    const insights = [];
    
    const savingsRate = calculatePercentage(summary.net_balance, summary.total_credits);
    insights.push(`Net savings rate: ${savingsRate}% of total income`);
    
    if (summary.total_debits > 0) {
        const sortedCategories = Object.entries(categories)
            .sort(([,a], [,b]) => b.total - a.total);
        
        if (sortedCategories.length > 0) {
            const [topCategory, topData] = sortedCategories[0];
            const topPercentage = calculatePercentage(topData.total, summary.total_debits);
            insights.push(`Highest expense category is ${topCategory} at ${topPercentage}% of total expenses`);
            
            sortedCategories.forEach(([category, data]) => {
                const percentage = calculatePercentage(data.total, summary.total_debits);
                if (percentage > 10) { // Only show significant categories
                    insights.push(`${category} expenses: ${percentage}% of total spending`);
                }
            });
        }
    }
    
    return insights;
}


app.post('/process', (req, res) => {
    try {
        console.log('Received data:', JSON.stringify(req.body, null, 2));
        
        const processedData = req.body.data;
        
        if (!processedData || !processedData.transactions_by_type) {
            throw new Error('Invalid input: expecting processed transaction data');
        }

        
        const summary = {
            total_credits: processedData.transactions_by_type.credits
                .reduce((sum, t) => sum + t.amount, 0),
            total_debits: processedData.transactions_by_type.debits
                .reduce((sum, t) => sum + t.amount, 0),
        };
        summary.net_balance = summary.total_credits - summary.total_debits;

        
        const insights = generateInsights(summary, processedData.categories);

        const analysis = {
            summary,
            categorized_expenses: processedData.categories,
            daily_summary: processedData.daily_totals,
            insights
        };

        res.json({ 
            analysis,
            metadata: {
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
    console.log(`Data normalizer service running on port ${PORT}`);
}); 