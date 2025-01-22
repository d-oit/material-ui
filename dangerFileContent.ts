import { danger, warn, message, schedule } from 'danger';

schedule(async () => {
  const pr = danger.github.pr;
  const modifiedFiles = danger.git.modified_files;
  const createdFiles = danger.git.created_files;
  const deletedFiles = danger.git.deleted_files;

  // Example: Check for changes in specific files
  if (modifiedFiles.includes('src/services/pocketbase.ts')) {
    message('Changes detected in PocketBase service file.');
  }

  // Example: Warn if there are too many changes
  if (modifiedFiles.length > 10) {
    warn('Too many files modified in this PR.');
  }

  // Example: Fail if a specific file is deleted
  if (deletedFiles.includes('src/services/pocketbase.ts')) {
    fail('PocketBase service file should not be deleted.');
  }
});
