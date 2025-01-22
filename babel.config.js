import path from 'path';

export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve('./src')],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
