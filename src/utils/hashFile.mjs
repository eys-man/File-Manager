import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import crypto from 'crypto';

export async function hashFile(filePath) {
    const absolutePath = path.resolve(filePath);

    try {
        const hash = crypto.createHash('sha256');
        await pipeline(
            fs.createReadStream(absolutePath),
            hash.setEncoding('hex'),
            process.stdout,
            { end: false }
        );
    } catch {
        console.log(`Operation failed`);
    }
};
