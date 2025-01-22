import { testBuiltTypes } from "./testBuiltTypes";

testBuiltTypes().catch((err) => {
  console.error(err);
  process.exit(1);
});
