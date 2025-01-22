import { generateProptypes } from "./generateProptypes";

generateProptypes().catch((err) => {
  console.error(err);
  process.exit(1);
});
