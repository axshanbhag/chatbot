const express = require('express');
require('dotenv').config();
const { OpenAI } = require('openai');

const router = express.Router();

// ✅ Use Hugging Face OpenAI-compatible endpoint
const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HUGGINGFACE_API_KEY, // or HF_TOKEN
});

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
        return res.status(500).json({ error: 'Server misconfigured: missing Hugging Face API key' });
    }

    try {
        const chatCompletion = await client.chat.completions.create({
            model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
            messages: [{ role: "user", content: message }],
        });

        let aiReply = chatCompletion.choices?.[0]?.message?.content
            || "I'm sorry, I couldn't process that.";

        if (aiReply.includes("</think>")) {
            aiReply = aiReply.split("</think>")[1].trim();
        }

        res.json({ reply: aiReply });
    } catch (error) {
        console.error('Error communicating with Hugging Face Router API:', error.message || error);
        res.status(500).json({ error: 'Error communicating with AI service' });
    }
});

module.exports = router;