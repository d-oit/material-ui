import { utils } from "./utils";

utils().catch((err) => {
  console.error(err);
  process.exit(1);
});
