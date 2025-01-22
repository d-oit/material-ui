import { worker } from "./worker";

worker().catch((err) => {
  console.error(err);
  process.exit(1);
});
