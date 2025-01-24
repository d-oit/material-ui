import PocketBase, { ClientResponseError } from 'pocketbase';

class PocketBaseClient {
  private static instance: PocketBaseClient;
  private client: PocketBase;
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private retryDelay: number = 1000;

  private constructor() {
    const baseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
    this.client = new PocketBase(baseUrl);
    this.setupInterceptors();
  }

  public static getInstance(): PocketBaseClient {
    if (!PocketBaseClient.instance) {
      PocketBaseClient.instance = new PocketBaseClient();
    }
    return PocketBaseClient.instance;
  }

  private setupInterceptors() {
    this.client.beforeSend = (url, options) => {
      // Add custom headers or modify request if needed
      return { url, options };
    };
  }

  private async handleError(error: unknown): Promise<never> {
    if (error instanceof ClientResponseError) {
      if (error.status === 429 && this.retryCount < this.maxRetries) {
        this.retryCount++;
        const delay = this.retryDelay * Math.pow(2, this.retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Retry the original request
        try {
          const originalUrl = error.originalError?.url || error.url;
          if (originalUrl) {
            // Make a new request using the client
            return await this.client.send(originalUrl, {
              method: 'GET', // Default to GET if method unknown
            });
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }
      
      // Reset retry count after successful request or max retries
      this.retryCount = 0;
      
      // Handle specific error cases
      switch (error.status) {
        case 401:
          throw new Error('Unauthorized access');
        case 404:
          throw new Error('Resource not found');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(error.message);
      }
    }
    throw error;
  }

  public get pb(): PocketBase {
    return this.client;
  }

  public async collection(name: string) {
    try {
      return this.client.collection(name);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Export singleton instance
const pb = PocketBaseClient.getInstance().pb;
export default pb;
