require("dotenv").config();

const { OpenAI } = require("openai");
const express = require("express");
const router = express.Router();

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

router.get("/description", async (req, res) => {
  let { title } = req.query;

  const response = await perplexity.chat.completions.create({
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      {
        role: "user",
        content: `Give me 75 word description of the anime ${title}, do not include spoilers`,
      },
    ],
  });
  console.log(response);
  res.json({ response });
});

module.exports = router;
