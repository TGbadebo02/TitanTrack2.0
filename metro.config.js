const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase JS SDK's package.json "exports" map doesn't declare a
// "react-native" condition consistently across its subpaths, which makes
// Metro's newer exports-based resolution register firebase/auth's
// component against a different module instance than the one
// initializeApp() uses ("Component auth has not been registered yet").
// Falling back to the legacy main-fields resolution (react-native/browser/main)
// resolves this consistently. See: https://docs.expo.dev/guides/using-firebase/
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
