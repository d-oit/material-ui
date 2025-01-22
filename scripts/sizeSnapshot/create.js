import { createSizeSnapshot } from "./createSizeSnapshot";

createSizeSnapshot().catch((err) => {
  console.error(err);
  process.exit(1);
});
