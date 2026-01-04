package app.capgo.capacitor.lightsensor

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "CapgoLightSensor")
class CapgoLightSensorPlugin : Plugin(), SensorEventListener {

    companion object {
        private const val PLUGIN_VERSION = "0.0.1"
        private const val EVENT_LIGHT_SENSOR_CHANGE = "lightSensorChange"
        private const val DEFAULT_UPDATE_INTERVAL = 200000 // 200ms in microseconds
    }

    private var sensorManager: SensorManager? = null
    private var lightSensor: Sensor? = null
    private var isListening = false
    private var updateInterval = DEFAULT_UPDATE_INTERVAL

    override fun load() {
        sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        lightSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_LIGHT)
    }

    @PluginMethod
    fun isAvailable(call: PluginCall) {
        val ret = JSObject()
        ret.put("available", lightSensor != null)
        call.resolve(ret)
    }

    @PluginMethod
    fun start(call: PluginCall) {
        if (lightSensor == null) {
            call.reject("Light sensor is not available on this device")
            return
        }

        if (isListening) {
            call.resolve()
            return
        }

        val intervalMs = call.getInt("updateInterval", 200) ?: 200
        updateInterval = intervalMs * 1000 // Convert to microseconds

        val registered = sensorManager?.registerListener(
            this,
            lightSensor,
            updateInterval
        ) ?: false

        if (registered) {
            isListening = true
            call.resolve()
        } else {
            call.reject("Failed to register light sensor listener")
        }
    }

    @PluginMethod
    fun stop(call: PluginCall) {
        if (isListening) {
            sensorManager?.unregisterListener(this)
            isListening = false
        }
        call.resolve()
    }

    @PluginMethod
    fun checkPermissions(call: PluginCall) {
        val ret = JSObject()
        // HIGH_SAMPLING_RATE_SENSORS is a normal permission, granted at install time
        // if declared in manifest. For now, we assume it's granted.
        ret.put("highSamplingRate", "granted")
        call.resolve(ret)
    }

    @PluginMethod
    fun requestPermissions(call: PluginCall) {
        // HIGH_SAMPLING_RATE_SENSORS is a normal permission, automatically granted
        // if declared in the manifest. No runtime request needed.
        val ret = JSObject()
        ret.put("highSamplingRate", "granted")
        call.resolve(ret)
    }

    @PluginMethod
    fun getPluginVersion(call: PluginCall) {
        val ret = JSObject()
        ret.put("version", PLUGIN_VERSION)
        call.resolve(ret)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_LIGHT) {
            val illuminance = event.values[0]
            val timestamp = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                // Convert nanoseconds to seconds
                event.timestamp / 1_000_000_000.0
            } else {
                System.currentTimeMillis() / 1000.0
            }

            val data = JSObject()
            data.put("illuminance", illuminance.toDouble())
            data.put("timestamp", timestamp)

            notifyListeners(EVENT_LIGHT_SENSOR_CHANGE, data)
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Not used for light sensor
    }

    override fun handleOnDestroy() {
        if (isListening) {
            sensorManager?.unregisterListener(this)
            isListening = false
        }
        super.handleOnDestroy()
    }
}
