import { coreTypeScriptProjects } from "./coreTypeScriptProjects";

coreTypeScriptProjects().catch((err) => {
  console.error(err);
  process.exit(1);
});
