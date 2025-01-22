import { sizeSnapshotIndex } from "./sizeSnapshotIndex";

sizeSnapshotIndex().catch((err) => {
  console.error(err);
  process.exit(1);
});
