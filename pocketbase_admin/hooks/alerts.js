pb.collection('error_logs').onCreate((record) => {
  if (record.status >= 500) {
    // Send alert (e.g., Slack, email)
    console.log('Critical error alert:', record);
    // Implement actual alerting mechanism here
  }
});
