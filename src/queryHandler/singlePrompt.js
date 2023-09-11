import chalk from "chalk";
import { appLogger, devLogger } from "../logger/index.js";
import { createCompletion } from "../openai/OpenAIService.js";

export async function singlePrompt(prompt) {
  try {
    appLogger.info(chalk.green.bold(`[USER]: ${prompt}`));
    let results = await createCompletion(prompt);
    appLogger.info(chalk.blue(`[GPT]: ${results[0].message.content}`));
  } catch (error) {
    devLogger.error("An error occurred:", error);
  }
}
