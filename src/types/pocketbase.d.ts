import PocketBase from 'pocketbase';

declare module 'pocketbase' {
  interface RecordService<T = RecordModel> {
    authWithOAuth2Callback(redirectUrl: string): Promise<void>;
  }
}
