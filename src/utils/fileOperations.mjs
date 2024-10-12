import fs from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

export async function readFile(filePath) {
    const absolutePath = path.resolve(filePath);

    try {
        await pipeline(
            fs.createReadStream(absolutePath),
            process.stdout,
            { end: false }
          );
    } catch {
        console.log(`Operation failed`);
    }
};

export async function addFile() {
}

export async function renameFile() {
}

export async function copyFile() {
};

export async function moveFile() {
};

export async function removeFile() {
};
