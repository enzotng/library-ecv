module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleDirectories: ["node_modules", "src"],
};
