/// <reference lib="dom" />
/// <reference types="vite/client" />
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Use confirm directly as it's a global function
    const shouldUpdate = confirm('New content available. Reload?');
    if (shouldUpdate) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  onRegistered(registration) {
    if (registration) {
      console.log('Service worker registered successfully');
    }
  },
  onRegisterError(error) {
    console.error('Service worker registration failed:', error);
  },
  immediate: true
});

export default updateSW;
