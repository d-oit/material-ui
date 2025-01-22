import { buildColorTypes } from "./buildColorTypes";

buildColorTypes().catch((err) => {
  console.error(err);
  process.exit(1);
});
