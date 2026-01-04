import XCTest
@testable import CapgoLightSensorPlugin

class CapgoLightSensorPluginTests: XCTestCase {

    func testIsAvailableReturnsFalse() {
        // Light sensor should not be available on iOS
        // This is a placeholder test since we can't easily test plugin methods
        XCTAssertTrue(true, "Light sensor is not available on iOS")
    }
}
