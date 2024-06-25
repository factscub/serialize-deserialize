module.exports = class Deserializer {
    constructor() { }
    
    deserialize(serializedStr) {
        let byteArray = this.#stringToByteArray(serializedStr);
        let bits = this.#byteArrayToBits(byteArray);
        let result = [];

        for (let i = 0; i < bits.length; i += 18) {
            let num = this.#decodeNumber(bits.slice(i, i + 9));
            let count = this.#decodeNumber(bits.slice(i + 9, i + 18));
            result.push(...Array(count).fill(num));
        }

        return result;
    }

    #byteArrayToBits(byteArray) {
        let bits = [];
        for (let byte of byteArray) {
            for (let i = 7; i >= 0; i--) {
                bits.push((byte >> i) & 1);
            }
        }
        return bits;
    }

    #stringToByteArray(str) {
        return Array.from(str).map(char => char.charCodeAt(0));
    }

    #decodeNumber(bits) {
        let num = 0;
        for (let i = 0; i < bits.length; i++) {
            num = (num << 1) | bits[i];
        }
        return num;
    }
}