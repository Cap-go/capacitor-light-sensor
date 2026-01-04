# Light Sensor Example App

This is an example Capacitor application demonstrating the `@capgo/capacitor-light-sensor` plugin.

## Features

- Check if light sensor is available
- Check and request permissions
- Start/stop light sensor monitoring
- Live light level display with visual indicator
- Get plugin version

## Setup

```bash
# Install dependencies
bun install

# Build the web app
bun run build

# Add Android platform
npx cap add android

# Sync changes
npx cap sync

# Open in Android Studio
npx cap open android
```

## Running

### Web (for development)
```bash
bun run start
```

Note: The light sensor only works on Android devices. On web/iOS, `isAvailable()` will return `false`.

### Android
1. Build the web app: `bun run build`
2. Sync: `npx cap sync`
3. Open Android Studio: `npx cap open android`
4. Run on a physical device (emulators may not have light sensor support)

## Notes

- The light sensor is only available on Android devices
- Some Android emulators may not support the light sensor
- On Android 12+, update intervals below 200ms require the `HIGH_SAMPLING_RATE_SENSORS` permission
