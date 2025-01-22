import { loadComparison } from "./loadComparison";

loadComparison().catch((err) => {
  console.error(err);
  process.exit(1);
});
