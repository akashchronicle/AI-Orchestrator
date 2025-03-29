const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});


app.post('/process', (req, res) => {
    try {
        const data = req.body.data;
        
        
        const lines = data.split('\n').filter(line => line.trim());
        
        
        const cleanedTransactions = [];
        
        lines.forEach(line => {
           
            if (line.includes('INR')) {
                
                const match = line.match(/- (.*?): INR ([\d,]+) \((Credit|Debit)\) - (\d{2}\/\d{2}\/\d{4})/);
                
                if (match) {
                    const [_, source, amountStr, type, dateStr] = match;
                    
                    
                    const amount = parseInt(amountStr.replace(/,/g, ''));
                    
                   
                    const [day, month, year] = dateStr.split('/');
                    const formattedDate = `${year}-${month}-${day}`;
                    
                    cleanedTransactions.push({
                        source: source.trim(),
                        amount,
                        type: type.toLowerCase(),
                        date: formattedDate
                    });
                }
            }
        });

        res.json({ 
            cleaned_transactions: cleanedTransactions,
            metadata: {
                total_transactions: cleanedTransactions.length,
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
    console.log(`Service running on port ${PORT}`);
}); 