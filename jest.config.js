/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
