import { test } from "./test";

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
