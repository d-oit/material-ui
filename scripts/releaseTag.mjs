import { releaseTag } from "./releaseTag";

releaseTag().catch((err) => {
  console.error(err);
  process.exit(1);
});
