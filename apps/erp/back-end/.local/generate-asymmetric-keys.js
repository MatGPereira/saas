import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { generateKeyPair } from 'node:crypto';

function generateLocalAsymmetricKeys() {
  const KEY_LENGTH_IN_BITS = 4096;

  generateKeyPair(
    'rsa',
    {
      modulusLength: KEY_LENGTH_IN_BITS,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    },
    async (err, publicKey, privateKey) => await generateKeyPairFiles(err, publicKey, privateKey)
  );
}

async function generateKeyPairFiles(err, publicKey, privateKey) {
  if(err) {
    console.error('Opps! An error occurred while creating the cryptographic keys');
    throw new Error('Opps! An error occurred while creating the cryptographic keys');
  }

  const tmpPathName = join('/', 'tmp');

  const cleanedPublicKey = publicKey
    .replace(/\n/g, '')
    .replace(/-----BEGIN PUBLIC KEY-----/, '-----BEGIN PUBLIC KEY-----\\n')
    .replace(/-----END PUBLIC KEY-----/, '\\n-----END PUBLIC KEY-----\\n');

  const cleanedPrivateKey = privateKey
    .replace(/\n/g, '')
    .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\\n')
    .replace(/-----END PRIVATE KEY-----/, '\\n-----END PRIVATE KEY-----\\n');

  await writeFile(`${tmpPathName}/public_key.pem`, cleanedPublicKey);
  await writeFile(`${tmpPathName}/private_key.pem`, cleanedPrivateKey);
}

generateLocalAsymmetricKeys();
