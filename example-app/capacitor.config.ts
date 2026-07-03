import type { CapacitorConfig } from '@capacitor/cli';

import pkg from './package.json';

const config: CapacitorConfig = {
  appId: 'app.capgo.lightsensor',
  appName: '@capgo/capacitor-light-sensor',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    CapacitorUpdater: {
      appId: 'app.capgo.lightsensor',
      autoUpdate: true,
      autoSplashscreen: true,
      directUpdate: 'always',
      version: pkg.version,
    },
  },
};

export default config;
