import chalk from "chalk";
import readline from "readline";
import { appLogger } from "../logger/index.js";
import { createCompletion } from "../openai/OpenAIService.js";
import { isWithinTokenLimit } from "../utils/tokenUtils.js";

export async function chatLoop() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  };

  let userPrompt = "";
  const conversationHistory = [];
  while (userPrompt.toLowerCase() !== "exit") {
    userPrompt = await askQuestion("[USER]: ");

    if (userPrompt.toLowerCase() === "exit") {
      break;
    }

    try {
      const payload = concatenateConversation(conversationHistory, userPrompt);
      if (!isWithinTokenLimit(payload, 1000)) {
        //TODO: CONFIG, REMOVE MAGIC NUMBER
        break;
      }
      const results = await createCompletion(payload);
      const response = results[0].message.content;
      appLogger.info(chalk.blue(`[GPT] ${response}`));

      conversationHistory.push({
        question: userPrompt,
        answer: response,
      });
    } catch (error) {
      appLogger.error("An error occurred:", error);
    }
  }
  appLogger.info(
    "Conversation History: " + JSON.stringify(conversationHistory, null, 2)
  );
  //TODO: store somewhere
  rl.close();
}

function concatenateConversation(conversationHistory, userPrompt) {
  let concatenatedString = "";

  for (const pair of conversationHistory) {
    concatenatedString += `[User]: ${pair.question} [END OF USER INPUT]\n`;
    concatenatedString += `${pair.answer} [END OF GPT OUTPUT]\n`;
  }

  // Add the latest user prompt
  concatenatedString += `[User]: ${userPrompt} [END OF USER INPUT]\n`;

  return concatenatedString;
}
