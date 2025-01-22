# PocketBase Admin Setup

This directory contains the necessary files and documentation for setting up the PocketBase admin interface.

## Collections

### Users Collection
The `users` collection is used to store user authentication data.

### Security Logs Collection
The `security_logs` collection is used to log security-related events.

## Files

### users_collection.json
Contains the schema for the `users` collection.

### security_logs_collection.json
Contains the schema for the `security_logs` collection.

## Instructions

1. **Create Collections:**
   - Use the JSON files to create the `users` and `security_logs` collections in the PocketBase admin interface.

2. **Documentation:**
   - This README file provides an overview of the PocketBase setup and the purpose of each collection.

## Example JSON Files

### users_collection.json
```json
{
  "name": "users",
  "type": "auth",
  "schema": [
    {
      "name": "email",
      "type": "email",
      "required": true,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "name": "password",
      "type": "text",
      "required": true,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    }
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "options": {}
}
```

### security_logs_collection.json
```json
{
  "name": "security_logs",
  "type": "base",
  "schema": [
    {
      "name": "action",
      "type": "text",
      "required": true,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "name": "user_id",
      "type": "relation",
      "required": false,
      "options": {
        "collectionId": "users",
        "cascadeDelete": false,
        "minSelect": null,
        "maxSelect": 1,
        "displayFields": null
      }
    },
    {
      "name": "ip_address",
      "type": "text",
      "required": true,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "name": "timestamp",
      "type": "date",
      "required": true,
      "options": {
        "min": null,
        "max": null
      }
    },
    {
      "name": "details",
      "type": "text",
      "required": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    }
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "options": {}
}
```

## Additional Information

For more details, refer to the PocketBase documentation: [PocketBase Documentation](https://pocketbase.io/docs/).
