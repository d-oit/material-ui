import { copyFiles } from "./copyFiles";

copyFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});
