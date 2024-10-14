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

export async function renameFile(filePath, newFileName) {
    const absolutePath = path.resolve(filePath);

    // узнать имя папки, содержащей этот файл
    const parentPath = path.dirname(filePath);

    const newAbsolutePath = path.join(parentPath, newFileName);

    try {
        await rename(absolutePath, newAbsolutePath);
    } catch {
        console.log(`Operation failed`);
    }
}

export async function copyFile(sourcePath, destinationFolder) {
    const absSourcePath = path.resolve(sourcePath);
    const absDestinationFolder = path.resolve(destinationFolder);

    // извлечь имя файла из первого параметра пути
    const fileName = path.basename(absSourcePath);

    // добавить имя файла к пути назначения
    const finalDestinationPath = path.join(absDestinationFolder, fileName);

    try {
        await pipeline(fs.createReadStream(absSourcePath), fs.createWriteStream(finalDestinationPath));
    } catch {
        console.log(`Operation failed`);
    }
};

export async function moveFile(sourcePath, destinationFolder) {
    const absSourcePath = path.resolve(sourcePath);
    const absDestinationFolder = path.resolve(destinationFolder); // это должен быть путь к папке

    // извлечь имя файла из первого параметра пути
    const fileName = path.basename(absSourcePath);

    // добавить имя файла к пути назначения
    const finalDestinationPath = path.join(absDestinationFolder, fileName);

    try {
        // скопировать
        await pipeline(fs.createReadStream(absSourcePath), fs.createWriteStream(finalDestinationPath));
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
