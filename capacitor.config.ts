import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.habloso.hablo',
  appName: 'Hablo',
  // The app is the same website build, minus the recorded clips (streamed from habloso.netlify.app).
  webDir: 'dist',
  android: { backgroundColor: '#d6cfc4' },
  plugins: {
    LocalNotifications: { iconColor: '#145a4a' },
  },
};

export default config;
