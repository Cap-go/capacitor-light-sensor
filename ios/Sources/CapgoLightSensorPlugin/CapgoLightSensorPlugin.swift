import Foundation
import Capacitor

@objc(CapgoLightSensorPlugin)
public class CapgoLightSensorPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapgoLightSensorPlugin"
    public let jsName = "CapgoLightSensor"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let pluginVersion = "0.0.1"

    @objc func isAvailable(_ call: CAPPluginCall) {
        // Light sensor is not available on iOS - no public API
        call.resolve(["available": false])
    }

    @objc func start(_ call: CAPPluginCall) {
        call.reject("Light sensor is not available on iOS")
    }

    @objc func stop(_ call: CAPPluginCall) {
        // No-op on iOS
        call.resolve()
    }

    @objc func checkPermissions(_ call: CAPPluginCall) {
        // Always return granted since no permission is needed (sensor not available)
        call.resolve(["highSamplingRate": "granted"])
    }

    @objc func requestPermissions(_ call: CAPPluginCall) {
        // Always return granted since no permission is needed (sensor not available)
        call.resolve(["highSamplingRate": "granted"])
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": pluginVersion])
    }
}
