pb.collection('*').onError((e) => {
  pb.collection('error_logs').create({
    user_id: e.http?.data?.user?.id || null,
    error_message: e.error.message,
    stack_trace: e.error.stack,
    timestamp: new Date(),
    metadata: {
      path: e.http?.path,
      method: e.http?.method,
      status: e.http?.status,
    },
  });
});
