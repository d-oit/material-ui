import { pushArgos } from "./pushArgos";

pushArgos().catch((err) => {
  console.error(err);
  process.exit(1);
});
