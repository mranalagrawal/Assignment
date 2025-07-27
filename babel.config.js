module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Add unique names to each plugin
    ['react-native-reanimated/plugin', {}, 'reanimated'],
    ['react-native-worklets/plugin', {}, 'worklets'],
  ],
};
