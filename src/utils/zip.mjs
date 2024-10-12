import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export async function brotli(sourcePath, destinationPath, operation) {
    const absSourcePath = path.resolve(sourcePath);
    const absDestinationPath = path.resolve(destinationPath);

    try {
        const inputStream = fs.createReadStream(absSourcePath);
        const outputStream = fs.createWriteStream(absDestinationPath);

        const brotliStream = operation === 'compress' ?
            createBrotliCompress() : createBrotliDecompress();

        await pipeline(inputStream, brotliStream, outputStream);
    } catch {
        console.log(`Operation failed`);
    }
};
