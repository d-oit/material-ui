import { webpackConfig } from "./webpackConfig";

webpackConfig().catch((err) => {
  console.error(err);
  process.exit(1);
});
