import { releaseChangelog } from "./releaseChangelog";

releaseChangelog().catch((err) => {
  console.error(err);
  process.exit(1);
});
