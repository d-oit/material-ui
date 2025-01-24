interface Window {
  confirm: (message: string) => boolean;
}

declare global {
  interface Window {
    confirm: (message: string) => boolean;
  }
}
