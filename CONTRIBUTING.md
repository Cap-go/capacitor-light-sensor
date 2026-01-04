# Contributing to @capgo/capacitor-light-sensor

Thank you for your interest in contributing to this Capacitor plugin!

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Install SwiftLint for iOS linting (macOS only):
   ```bash
   brew install swiftlint
   ```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the plugin (TypeScript + Rollup) |
| `npm run watch` | Watch mode for TypeScript |
| `npm run lint` | Fix all linting issues (ESLint, Prettier, SwiftLint) |
| `npm run lint:check` | Check for linting issues without fixing |
| `npm run fmt` | Format all code |
| `npm run verify` | Verify all platforms build correctly |
| `npm run verify:ios` | Verify iOS builds |
| `npm run verify:android` | Verify Android builds |
| `npm run verify:web` | Verify web/TypeScript builds |
| `npm run docgen` | Generate API documentation |

## Project Structure

```
capacitor-light-sensor/
├── src/                          # TypeScript source
│   ├── definitions.ts           # Plugin interface & types
│   ├── index.ts                 # Plugin registration
│   └── web.ts                   # Web implementation (stub)
├── ios/                         # iOS implementation
│   └── Sources/CapgoLightSensorPlugin/
│       └── CapgoLightSensorPlugin.swift
├── android/                     # Android implementation
│   └── src/main/java/app/capgo/capacitor/lightsensor/
│       └── CapgoLightSensorPlugin.kt
├── example-app/                 # Example Capacitor app
├── dist/                        # Build output (generated)
└── .github/                     # GitHub workflows & templates
```

## Making Changes

### TypeScript Changes
1. Edit files in `src/`
2. Run `npm run build` to compile
3. Run `npm run lint` to fix formatting

### Android Changes
1. Edit Kotlin files in `android/src/main/java/`
2. Run `npm run verify:android` to verify the build

### iOS Changes
1. Edit Swift files in `ios/Sources/`
2. Run `npm run swiftlint -- --fix` to format
3. Run `npm run verify:ios` to verify the build

### Documentation Changes
1. Update JSDoc comments in `src/definitions.ts`
2. Run `npm run docgen` to regenerate README API docs

## Testing

### Example App
The `example-app/` directory contains a test application:

```bash
cd example-app
bun install
bun run build
npx cap add android
npx cap sync
npx cap open android
```

Run on a physical Android device to test the light sensor.

## Pull Request Guidelines

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` to ensure code style
4. Run `npm run verify` to ensure all platforms build
5. Submit a PR with a clear description

## Code Style

- **TypeScript**: ESLint with `@ionic/eslint-config`
- **Prettier**: `@ionic/prettier-config`
- **Swift**: SwiftLint with `@ionic/swiftlint-config`
- **Kotlin**: Standard Android/Kotlin style

## Publishing

Publishing is handled automatically by GitHub Actions when version tags are pushed:

1. Merge changes to `main`
2. The `bump_version` workflow automatically:
   - Runs tests
   - Updates documentation
   - Bumps the version
   - Creates a git tag
3. The `build` workflow then:
   - Builds the package
   - Publishes to npm
   - Creates a GitHub release

## Questions?

Open an issue if you have questions or need help!
