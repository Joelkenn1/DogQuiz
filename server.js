// Whenever a server isn't running in terminal won't load. You have to start the server and then access the webpage from the local
// host url. If the server stops running in terminal, you have to kill past processes: 'lsof -i 3000:' -> 'kill 9 "pid"'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve your HTML from /public


app.post('/ask', async (req, res) => {
   try{
    const input = req.body.prompt;

    const server = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful dog breed expert." },
                { role: "user", content: input }
              ],
            max_tokens: 100 
        })
    });

    const data = await server.json();
    res.json({ reply: data.choices[0].message.content});
   }
   catch (error) {
    console.error("Error in /ask route:", error);
    res.status(500).json({ error: "Something went wrong" });
  }


});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


