export const handler = async (event) => {
  // Your deploy-succeeded function content here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Deploy succeeded!" }),
  };
};
