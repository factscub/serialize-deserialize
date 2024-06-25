const Deserializer = require("./deserialize");
const Serializer = require("./serialize");

function runTests() {
    const serializer = new Serializer();
    const deserializer = new Deserializer();
    const tests = [
        { description: "Empty array", numbers: [] },
        { description: "Single number", numbers: [123] },
        { description: "Small range of numbers", numbers: [1, 2, 3, 4, 5] },
        { description: "Random numbers (50)", numbers: Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1) },
        { description: "Random numbers (100)", numbers: Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1) },
        { description: "Random numbers (500)", numbers: Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1) },
        { description: "Random numbers (1000)", numbers: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1) },
        { description: "Boundary (all 1-digit)", numbers: Array.from({ length: 10 }, (_, i) => i + 1) },
        { description: "Boundary (all 2-digits)", numbers: Array.from({ length: 90 }, (_, i) => i + 10) },
        { description: "Boundary (all 3-digits)", numbers: Array.from({ length: 210 }, (_, i) => i + 100) },
        { description: "Three of each number (900 total)", numbers: Array.from({ length: 300 }, (_, i) => [i + 1, i + 1, i + 1]).flat() }
    ];

    for (const { description, numbers } of tests) {
        const serialized = serializer.serialize(numbers);
        const deserialized = deserializer.deserialize(serialized);
        const compressionRatio = (1 - (serialized.length / (numbers.length * 4))) * 100;

        console.log(`Test: ${description}`);
        console.log(`Original Numbers: ${numbers}`);
        console.log(`Serialized String: ${serialized}`);
        console.log(`Deserialized Numbers: ${deserialized}`);
        console.log(`Compression Ratio: ${compressionRatio.toFixed(2)}%`);
        console.log(`Test Passed: ${JSON.stringify(numbers) === JSON.stringify(deserialized)}`);
        console.log("\n");
    }
}

runTests();

