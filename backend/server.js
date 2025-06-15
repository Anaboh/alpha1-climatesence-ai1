const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post('/api/chat', async (req, res) => {
  const { query } = req.body;
  
  const { data, error } = await supabase
    .from('chat_history')
    .insert([{ query }]);

  // Perplexity API integration
  const response = await fetch('https://api.perplexity.ai/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  res.json(await response.json());
});

app.listen(3000, () => console.log('Server running on port 3000'));
