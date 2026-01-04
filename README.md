<a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/ArunRawat404/static/refs/heads/main/capgo_banner.webp' alt='Capgo - Instant updates for Capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin"> ➡️ Get Instant updates for your App with Capgo 🚀</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin"> Fix your annoying satisfying bug, billed by mass improvement🪿</a></h2>
</div>

# @capgo/capacitor-light-sensor

Capacitor plugin for accessing the device's ambient light sensor.

## Why Capacitor Light Sensor?

- **Real Ambient Light Data**: Get accurate light level readings in lux
- **Efficient Sensor Access**: Uses native Android sensor APIs for optimal performance
- **Configurable Update Intervals**: Control how often you receive sensor updates
- **Battery Conscious**: Start and stop the sensor as needed to conserve battery
- **TypeScript Support**: Full type definitions for a great developer experience

## Platform Support

| Platform | Support |
|----------|---------|
| Android  | ✅ Full support via TYPE_LIGHT sensor |
| iOS      | ❌ Not available (no public API) |
| Web      | ❌ Not available |

## Installation

```bash
npm install @capgo/capacitor-light-sensor
npx cap sync
```

## Requirements

### Android
- Minimum SDK: 24 (Android 7.0)
- Target SDK: 36
- Device must have a light sensor (most Android phones do)

### High Sampling Rate (Android 12+)
For update intervals below 200ms on Android 12 and above, add this permission to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.HIGH_SAMPLING_RATE_SENSORS" />
```

## Usage

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

// Check if sensor is available
const { available } = await LightSensor.isAvailable();

if (available) {
  // Start listening with 500ms update interval
  await LightSensor.start({ updateInterval: 500 });

  // Add listener for sensor data
  const handle = await LightSensor.addListener('lightSensorChange', (data) => {
    console.log(`Light level: ${data.illuminance} lux`);
    console.log(`Timestamp: ${data.timestamp}`);
  });

  // Later, stop the sensor
  await LightSensor.stop();
  await handle.remove();
}
```

## Light Level Reference

| Lux Value | Condition |
|-----------|-----------|
| 0.0001 | Moonless, overcast night |
| 0.27-1 | Full moon on a clear night |
| 3.4 | Dark limit of civil twilight |
| 50 | Family living room |
| 80 | Office hallway |
| 100 | Very dark overcast day |
| 400 | Sunrise/sunset on clear day |
| 1,000 | Overcast day |
| 10,000-25,000 | Full daylight (indirect) |
| 32,000-100,000 | Direct sunlight |

## API

<docgen-index>
</docgen-index>

<docgen-api>
</docgen-api>

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this plugin.

## License

[MPL-2.0](./LICENSE)
