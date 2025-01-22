import { useReactVersion } from "./useReactVersion";

useReactVersion().catch((err) => {
  console.error(err);
  process.exit(1);
});
