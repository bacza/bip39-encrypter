# bip39-encrypter

BIP39 Encrypter is a simple library package implementing BIP39 recovery phrase encryption/decryption.

Yes, basically, it's just encrypting one password (original recovery phrase) with another (your own password), but it might be usefull for anyone looking for additional layer of security before writing down the recovery phrase on paper.

## Installation

```sh
npm install bip39-encrypter
```

## Usage

```js
import { Encrypter } from "bip39-encrypter";

const password = "SuperSecret"; // min 8 chars long
const digits = 4; // 4, 5, 6 are valid

const encrypter = new Encrypter(password, digits);

// Original recovery phrase
// (should be a list of 12 or 24 valid BIP39 words)
const original = ["hello", "world", "void", "secret" /*, ... */];

// Encrypted recovery phrase
const encrypted = original.map((word, index) =>
  encrypter.encryptWord(word, index)
);

// Decrypted recovery phrase
const decrypted = encrypted.map((word, index) =>
  encrypter.decryptWord(word, index)
);

console.log("Original phrase  :", original.join(" "));
console.log("Encrypted phrase :", encrypted.join(" "));
console.log("Decrypted phrase :", decrypted.join(" "));

// Outputs:
// Original phrase  : hello world void secret
// Encrypted phrase : 4230 7160 5313 4932
// Decrypted phrase : hello world void secret
```

## Disclaimer

This is a hobby project, no warranty of any kind is provided. Do NOT use it at home unless you know what you are doing!

## License

Copyright (c) 2024 Jaroslaw Baczynski

Licensed under the [MIT license](LICENSE).
