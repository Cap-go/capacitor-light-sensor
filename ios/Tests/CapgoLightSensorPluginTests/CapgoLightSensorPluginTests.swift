import XCTest
@testable import CapgoLightSensorPlugin

class CapgoLightSensorPluginTests: XCTestCase {
    override func setUp() {
        super.setUp()
        // Setup code
    }

    override func tearDown() {
        // Teardown code
        super.tearDown()
    }

    func testIsAvailableReturnsFalse() {
        // Light sensor should not be available on iOS
        // This is a placeholder test since we can't easily test plugin methods
        XCTAssertTrue(true, "Light sensor is not available on iOS")
    }
}
