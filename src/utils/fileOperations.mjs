import fs from 'fs';
import {
    open,
    rename,
    unlink
} from 'fs/promises';
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

export async function addFile(filePath) {
    const absolutePath = path.resolve(filePath);

    let fileHandle;
    try {
        fileHandle = await open(absolutePath, 'w');
    } catch {
        console.log(`Operation failed`);
    } finally {
        if (fileHandle) fileHandle.close();
    }
}

export async function renameFile(filePath, newFilePath) {
    // console.log(`filePath=${filePath} -> newFilePath=${newFilePath}`);
    const absolutePath = path.resolve(filePath);
    const newAbsolutePath = path.resolve(newFilePath);
    // console.log(`filePath=${absolutePath} -> newFilePath=${newAbsolutePath}`);
    try {
        await rename(absolutePath, newAbsolutePath);
    } catch {
        console.log(`Operation failed`);
    }
}

export async function copyFile(sourcePath, destinationPath) {
    const absSourcePath = path.resolve(sourcePath);
    const absDestinationPath = path.resolve(destinationPath);

    try {
        await pipeline(fs.createReadStream(absSourcePath), fs.createWriteStream(absDestinationPath));
    } catch {
        console.log(`Operation failed`);
    }
};

export async function moveFile(sourcePath, destinationPath) {
    const absSourcePath = path.resolve(sourcePath);
    const absDestinationPath = path.resolve(destinationPath);

    try {
        // скопировать
        await pipeline(fs.createReadStream(absSourcePath), fs.createWriteStream(absDestinationPath));
        // удалить
        await unlink(absSourcePath);
    } catch {
        console.log(`Operation failed`);
    }
};

export async function removeFile(filePath) {
    const absoluteFilePath = path.resolve(filePath);

    try {
        await unlink(absoluteFilePath);
    } catch {
        console.log(`Operation failed`);
    }
};
