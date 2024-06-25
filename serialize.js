module.exports = class Serializer {
    constructor() { }

    serialize(numbersArray) {
        numbersArray.sort((a, b) => a - b);  // Sort the array
        let bits = [];
        let prev = null;
        let count = 0;

        for (let num of numbersArray) {
            if (num === prev) {
                count++;
            } else {
                if (prev !== null) {
                    bits.push(...this.#encodeNumber(prev));
                    bits.push(...this.#encodeNumber(count));
                }
                prev = num;
                count = 1;
            }
        }

        if (prev !== null) {
            bits.push(...this.#encodeNumber(prev));
            bits.push(...this.#encodeNumber(count));
        }

        let byteArray = this.#bitsToByteArray(bits);
        return this.#byteArrayToString(byteArray);
    }


    #encodeNumber(num) {
        let bits = [];
        for (let i = 0; i < 9; i++) {
            bits.push((num >> (8 - i)) & 1);
        }
        return bits;
    }


    #bitsToByteArray(bits) {
        const byteArray = [];
        for (let i = 0; i < bits.length; i += 8) {
            let byte = 0;
            for (let j = 0; j < 8; j++) {
                if (i + j < bits.length) {
                    byte = (byte << 1) | bits[i + j];
                } else {
                    byte = byte << 1;
                }
            }
            byteArray.push(byte);
        }
        return byteArray;
    }

    #byteArrayToString(byteArray) {
        return String.fromCharCode(...byteArray);
    }
}




