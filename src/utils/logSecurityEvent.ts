import pb from '../services/pocketbase';

export const logSecurityEvent = async (action: string, userId?: string, details?: string) => {
  const ipAddress = await fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);

  const event = {
    action,
    user_id: userId,
    ip_address: ipAddress,
    timestamp: new Date().toISOString(),
    details,
  };

  try {
    await pb.collection('security_logs').create(event);
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};
