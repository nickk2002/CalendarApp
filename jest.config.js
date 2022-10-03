export default {
    preset: 'ts-jest',
    moduleFileExtensions: [
        "js",
        "ts",
        "jsx"
    ],
    extensionsToTreatAsEsm: [".ts"],
    moduleDirectories: [
        "node_modules",
        "bower_components",
        "src",
        "components"
    ],
    transform: {
        "^.+\\.jsx?$": ["ts-jest", {"useESM":true}],
        "^.+\\.ts": ["ts-jest", {"useESM":true}]
    },
    transformIgnorePatterns: [
    ],
    testEnvironment: "jest-environment-node"
}