import { generateCodeowners } from "./generateCodeowners";

generateCodeowners().catch((err) => {
  console.error(err);
  process.exit(1);
});
