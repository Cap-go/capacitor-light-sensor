# @capgo/capacitor-light-sensor
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_light_sensor"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_light_sensor"> Missing a feature? We'll build the plugin for you 💪</a></h2>
</div>

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

* [`isAvailable()`](#isavailable)
* [`start(...)`](#start)
* [`stop()`](#stop)
* [`addListener('lightSensorChange', ...)`](#addlistenerlightsensorchange-)
* [`removeAllListeners()`](#removealllisteners)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor plugin for accessing the device's ambient light sensor.

### isAvailable()

```typescript
isAvailable() => Promise<IsAvailableResult>
```

Check if the light sensor is available on the current device.
You should always check sensor availability before attempting to use it.

**Returns:** <code>Promise&lt;<a href="#isavailableresult">IsAvailableResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### start(...)

```typescript
start(options?: StartOptions | undefined) => Promise<void>
```

Start listening to light sensor updates.
This will begin sensor measurements at the specified interval.
Use `addListener` to receive the sensor data.

| Param         | Type                                                  | Description                            |
| ------------- | ----------------------------------------------------- | -------------------------------------- |
| **`options`** | <code><a href="#startoptions">StartOptions</a></code> | - Configuration options for the sensor |

**Since:** 0.0.1

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stop listening to light sensor updates.
This will stop the sensor and conserve battery.

**Since:** 0.0.1

--------------------


### addListener('lightSensorChange', ...)

```typescript
addListener(eventName: 'lightSensorChange', listenerFunc: LightSensorCallback) => Promise<PluginListenerHandle>
```

Add a listener for light sensor change events.
The listener will be called whenever new sensor data is available.

| Param              | Type                                                                | Description                                |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------ |
| **`eventName`**    | <code>'lightSensorChange'</code>                                    | - Must be 'lightSensorChange'              |
| **`listenerFunc`** | <code><a href="#lightsensorcallback">LightSensorCallback</a></code> | - Callback function to receive sensor data |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 0.0.1

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all listeners for light sensor events.

**Since:** 0.0.1

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check the current permission status for high sampling rate sensors.
On Android 12+, the HIGH_SAMPLING_RATE_SENSORS permission is required
for sensor update intervals below 200ms.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 0.0.1

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permission for high sampling rate sensors.
On Android 12+, this requests the HIGH_SAMPLING_RATE_SENSORS permission.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 0.0.1

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<VersionResult>
```

Get the current version of the plugin.

**Returns:** <code>Promise&lt;<a href="#versionresult">VersionResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### Interfaces


#### IsAvailableResult

Result indicating whether the sensor is available.

| Prop            | Type                 | Description                                                                                                         | Since |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- | ----- |
| **`available`** | <code>boolean</code> | Whether the light sensor is available on this device. Always false on iOS as the light sensor API is not available. | 0.0.1 |


#### StartOptions

Options for starting the light sensor listener.

| Prop                 | Type                | Description                                                                                                                                                                    | Default          | Since |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----- |
| **`updateInterval`** | <code>number</code> | The desired interval between sensor updates in milliseconds. On Android 12+, there's a minimum interval of 200ms unless the app has the HIGH_SAMPLING_RATE_SENSORS permission. | <code>200</code> | 0.0.1 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### LightSensorMeasurement

A single light sensor measurement.

| Prop              | Type                | Description                                          | Since |
| ----------------- | ------------------- | ---------------------------------------------------- | ----- |
| **`illuminance`** | <code>number</code> | Ambient light level in lux (lx).                     | 0.0.1 |
| **`timestamp`**   | <code>number</code> | Timestamp of the measurement in seconds since epoch. | 0.0.1 |


#### PermissionStatus

Result of a permission request or check.

| Prop                   | Type                                                                      | Description                                                                                                                                | Since |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`highSamplingRate`** | <code>'prompt' \| 'prompt-with-rationale' \| 'granted' \| 'denied'</code> | Whether the high sampling rate sensor permission is granted. On Android 12+, this permission is required for update intervals below 200ms. | 0.0.1 |


#### VersionResult

Plugin version information.

| Prop          | Type                | Description                        | Since |
| ------------- | ------------------- | ---------------------------------- | ----- |
| **`version`** | <code>string</code> | The current version of the plugin. | 0.0.1 |


### Type Aliases


#### LightSensorCallback

Callback function for light sensor updates.

<code>(measurement: <a href="#lightsensormeasurement">LightSensorMeasurement</a>): void</code>

</docgen-api>

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this plugin.

## License

[MPL-2.0](./LICENSE)

## Credits

This SDK has been inspired by [Expo light sensor](https://docs.expo.dev/versions/latest/sdk/light-sensor/)
