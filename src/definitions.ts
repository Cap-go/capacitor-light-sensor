import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Result of a permission request or check.
 *
 * @since 0.0.1
 */
export interface PermissionStatus {
  /**
   * Whether the high sampling rate sensor permission is granted.
   * On Android 12+, this permission is required for update intervals below 200ms.
   *
   * @since 0.0.1
   */
  highSamplingRate: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';
}

/**
 * A single light sensor measurement.
 *
 * @since 0.0.1
 */
export interface LightSensorMeasurement {
  /**
   * Ambient light level in lux (lx).
   *
   * @since 0.0.1
   */
  illuminance: number;

  /**
   * Timestamp of the measurement in seconds since epoch.
   *
   * @since 0.0.1
   */
  timestamp: number;
}

/**
 * Options for starting the light sensor listener.
 *
 * @since 0.0.1
 */
export interface StartOptions {
  /**
   * The desired interval between sensor updates in milliseconds.
   * On Android 12+, there's a minimum interval of 200ms unless the app
   * has the HIGH_SAMPLING_RATE_SENSORS permission.
   *
   * @default 200
   * @since 0.0.1
   */
  updateInterval?: number;
}

/**
 * Result indicating whether the sensor is available.
 *
 * @since 0.0.1
 */
export interface IsAvailableResult {
  /**
   * Whether the light sensor is available on this device.
   * Always false on iOS as the light sensor API is not available.
   *
   * @since 0.0.1
   */
  available: boolean;
}

/**
 * Plugin version information.
 *
 * @since 0.0.1
 */
export interface VersionResult {
  /**
   * The current version of the plugin.
   *
   * @since 0.0.1
   */
  version: string;
}

/**
 * Callback function for light sensor updates.
 *
 * @since 0.0.1
 */
export type LightSensorCallback = (measurement: LightSensorMeasurement) => void;

/**
 * Capacitor plugin for accessing the device's ambient light sensor.
 *
 * @since 0.0.1
 */
export interface LightSensorPlugin {
  /**
   * Check if the light sensor is available on the current device.
   * You should always check sensor availability before attempting to use it.
   *
   * @returns Promise resolving to availability status
   * @since 0.0.1
   * @example
   * ```typescript
   * const { available } = await LightSensor.isAvailable();
   * ```
   */
  isAvailable(): Promise<IsAvailableResult>;

  /**
   * Start listening to light sensor updates.
   * This will begin sensor measurements at the specified interval.
   * Use `addListener` to receive the sensor data.
   *
   * @param options - Configuration options for the sensor
   * @returns Promise that resolves when the sensor has started
   * @since 0.0.1
   * @example
   * ```typescript
   * await LightSensor.start({ updateInterval: 500 });
   * ```
   */
  start(options?: StartOptions): Promise<void>;

  /**
   * Stop listening to light sensor updates.
   * This will stop the sensor and conserve battery.
   *
   * @returns Promise that resolves when the sensor has stopped
   * @since 0.0.1
   * @example
   * ```typescript
   * await LightSensor.stop();
   * ```
   */
  stop(): Promise<void>;

  /**
   * Add a listener for light sensor change events.
   * The listener will be called whenever new sensor data is available.
   *
   * @param eventName - Must be 'lightSensorChange'
   * @param listenerFunc - Callback function to receive sensor data
   * @returns Promise resolving to a handle for removing the listener
   * @since 0.0.1
   * @example
   * ```typescript
   * const handle = await LightSensor.addListener('lightSensorChange', (data) => {
   *   console.log('Illuminance:', data.illuminance);
   * });
   * ```
   */
  addListener(
    eventName: 'lightSensorChange',
    listenerFunc: LightSensorCallback,
  ): Promise<PluginListenerHandle>;

  /**
   * Remove all listeners for light sensor events.
   *
   * @returns Promise that resolves when all listeners have been removed
   * @since 0.0.1
   * @example
   * ```typescript
   * await LightSensor.removeAllListeners();
   * ```
   */
  removeAllListeners(): Promise<void>;

  /**
   * Check the current permission status for high sampling rate sensors.
   * On Android 12+, the HIGH_SAMPLING_RATE_SENSORS permission is required
   * for sensor update intervals below 200ms.
   *
   * @returns Promise resolving to the current permission status
   * @since 0.0.1
   * @example
   * ```typescript
   * const status = await LightSensor.checkPermissions();
   * ```
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permission for high sampling rate sensors.
   * On Android 12+, this requests the HIGH_SAMPLING_RATE_SENSORS permission.
   *
   * @returns Promise resolving to the updated permission status
   * @since 0.0.1
   * @example
   * ```typescript
   * const status = await LightSensor.requestPermissions();
   * ```
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Get the current version of the plugin.
   *
   * @returns Promise resolving to the plugin version
   * @since 0.0.1
   * @example
   * ```typescript
   * const { version } = await LightSensor.getPluginVersion();
   * ```
   */
  getPluginVersion(): Promise<VersionResult>;
}
