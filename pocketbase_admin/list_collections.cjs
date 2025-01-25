const PocketBase = require('pocketbase/cjs');
require('dotenv').config();

async function listCollections() {
  const pb = new PocketBase(process.env.VITE_POCKETBASE_URL);

  // Authenticate as an admin
  await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD);

  // List all collections
  const collections = await pb.collections.getFullList();

  console.log('Collections:', collections);
}

listCollections().catch(console.error);
