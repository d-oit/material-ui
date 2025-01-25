const PocketBase = require('pocketbase/cjs');
require('dotenv').config();

async function deleteCollection(pb, name) {
  try {
    const collection = await pb.collections.getOne(name);
    await pb.collections.delete(collection.id);
    console.log(`Deleted existing ${name} collection`);
  } catch (error) {
    if (error.status !== 404) {
      throw error;
    }
  }
}

async function createCollections() {
  const pb = new PocketBase(process.env.VITE_POCKETBASE_URL);

  // Authenticate as an admin
  try {
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD);
    console.log('Authenticated successfully');
  } catch (error) {
    console.error('Authentication failed:', error);
    return;
  }

  try {
    // Delete existing collections
    await deleteCollection(pb, 'links');
    await deleteCollection(pb, 'security_logs');

    // Create links collection
    const links = await pb.collections.create({
      name: "links",
      type: "base",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "url",
          required: true
        },
        {
          name: "description",
          type: "text",
          required: false,
        },
        {
          name: "category",
          type: "text",
          required: true,
          options: {
            min: 1,
            max: 200
          }
        },
        {
          name: "user_id",
          type: "relation",
          required: true,

            collectionId: "_pb_users_auth_",
            cascadeDelete: false,
            maxSelect: 1
        }
      ]
    });
    console.log('Links collection created successfully');

    // Create security_logs collection
    const securityLogs = await pb.collections.create({
      name: "security_logs",
      type: "base",
      fields: [
        {
          name: "action",
          type: "text",
          required: true,
          options: {
            min: 1,
            max: 100
          }
        },
        {
          name: "user_id",
          type: "relation",
          required: false,
            collectionId: "_pb_users_auth_",
            cascadeDelete: false,
            maxSelect: 1
        },
        {
          name: "ip",
          type: "text",
          required: true,
          options: {
            min: 7,
            max: 45
          }
        },
        {
          name: "details",
          type: "text",
          required: false,
          options: {
            max: 2000
          }
        }
      ]
    });
    console.log('Security logs collection created successfully');

    // Update links collection with auth rules
    await pb.collections.update(links.id, {
      listRule: '@request.auth.id != "" && user_id = @request.auth.id',
      viewRule: '@request.auth.id != "" && user_id = @request.auth.id',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != "" && user_id = @request.auth.id',
      deleteRule: '@request.auth.id != "" && user_id = @request.auth.id'
    });
    console.log('Links collection rules updated successfully');

    // Update security_logs collection with auth rules
    await pb.collections.update(securityLogs.id, {
      listRule: '@request.auth.id != "" && user_id = @request.auth.id',
      viewRule: '@request.auth.id != "" && user_id = @request.auth.id',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != "" && user_id = @request.auth.id',
      deleteRule: '@request.auth.id != "" && user_id = @request.auth.id'
    });
    console.log('Security logs collection rules updated successfully');

  } catch (error) {
    console.error('Error creating collections:', error);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
}

createCollections().catch(console.error);
