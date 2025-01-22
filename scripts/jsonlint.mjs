import { jsonlint } from "./jsonlint";

jsonlint().catch((err) => {
  console.error(err);
  process.exit(1);
});
