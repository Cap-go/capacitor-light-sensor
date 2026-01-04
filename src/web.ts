import type { PluginListenerHandle } from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type {
  LightSensorPlugin,
  IsAvailableResult,
  StartOptions,
  PermissionStatus,
  VersionResult,
  LightSensorCallback,
} from './definitions';

export class LightSensorWeb extends WebPlugin implements LightSensorPlugin {
  async isAvailable(): Promise<IsAvailableResult> {
    // Light sensor is not available on web
    return { available: false };
  }

  async start(_options?: StartOptions): Promise<void> {
    throw this.unavailable('Light sensor is not available on web.');
  }

  async stop(): Promise<void> {
    // No-op on web
  }

  async addListener(
    _eventName: 'lightSensorChange',
    _listenerFunc: LightSensorCallback,
  ): Promise<PluginListenerHandle> {
    throw this.unavailable('Light sensor is not available on web.');
  }

  async removeAllListeners(): Promise<void> {
    // No-op on web
  }

  async checkPermissions(): Promise<PermissionStatus> {
    return { highSamplingRate: 'granted' };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return { highSamplingRate: 'granted' };
  }

  async getPluginVersion(): Promise<VersionResult> {
    return { version: '0.0.1' };
  }
}
