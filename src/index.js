import { Command } from "commander";
import "dotenv/config";
import { appLogger, devLogger } from "./logger/index.js";

import whisper from "whisper_bozo";
import { chatLoop } from "./queryHandler/chatLoop.js";
import { singlePrompt } from "./queryHandler/singlePrompt.js";
const program = new Command();

program
  .version("1.0.0")
  .option("-s, --storage <path>", "Specify the storage location")
  .option("-i, --ignore-storage", "Ignore storage")
  .option("-v", "Specify GPT version (35, 35x, 4, 4x)"); //todo, refine

program
  .command("prompt <prompt>")
  .alias("p")
  .description("Prompt a context-free answer")
  .action(async (prompt) => {
    try {
      await singlePrompt(prompt);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

program
  .command("chat")
  .description("Start a loop for continuous conversations")
  .action(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Starting a chat");
      //TODO: Query user for chat title/save timestamp, nullTitle = default id? notSaved?
      await chatLoop();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

program
  .command("listen")
  .description("Starts listening through mic for commands")
  .action(async () => {
    try {
      await whisper();
    } catch (error) {
      console.error("Whisper Failed:", error);
    }
  });

program.parse(process.argv);

// Accessing options
if (program.opts().storage) {
  console.log(`Using storage at: ${program.opts().storage}`);
}
