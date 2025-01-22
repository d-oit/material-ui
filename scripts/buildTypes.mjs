import { buildTypes } from "./buildTypes";

buildTypes().catch((err) => {
  console.error(err);
  process.exit(1);
});
