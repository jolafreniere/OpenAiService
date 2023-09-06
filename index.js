import "dotenv/config";
import { createCompletion } from "./src/openai/OpenAIService.js";

async function main() {
  let results = await createCompletion("test");
  console.log(results);
}

main();
