import {
    readFile,
    addFile,
    renameFile,
    copyFile,
    moveFile,
    removeFile
} from './fileOperations.mjs';
import { cd, ls } from './navigation.mjs';
import { parseRealPath } from './parseRealPath.mjs'
import { hashFile } from './hashFile.mjs';
import { brotli } from './zip.mjs';
import { getOsInfo } from './os.mjs';

export default async function parseCommand(str, stream) {
    // команды и параметры должны быть разделены пробелами
    const [command, ...args] = str.split(' ');
    let secondArgumentIndex = parseRealPath(args, 0).start;

    // разобрать команды
    switch (command.toLowerCase()) {
        case '.exit':
            stream.close();
        case 'up':
            await cd('..');
            break;
        case 'cd':
            await cd( parseRealPath(args, 0).realPath );
            break;
        case 'ls':
            await ls();
            break;
        case 'cat':
            await readFile( parseRealPath(args, 0).realPath );
            break;
        case 'add':
            await addFile( parseRealPath(args, 0).realPath );
            break;
        case 'rn':
            await renameFile(
                parseRealPath(args, 0).realPath,
                parseRealPath(args, secondArgumentIndex).realPath);
            break;
        case 'rm':
            await removeFile( parseRealPath(args, 0).realPath );
            break;
        case 'cp':
            await copyFile(
                parseRealPath(args, 0).realPath,
                parseRealPath(args, secondArgumentIndex).realPath);
            break;
        case 'mv':
            await moveFile(
                parseRealPath(args, 0).realPath,
                parseRealPath(args, secondArgumentIndex).realPath);
            break;
        case 'hash':
            await hashFile( parseRealPath(args, 0).realPath );
            break;
        case 'compress':
            await brotli(
                parseRealPath(args, 0).realPath,
                parseRealPath(args, secondArgumentIndex).realPath,
                'compress'
            );
            break;
        case 'decompress':
            await brotli(
                parseRealPath(args, 0).realPath,
                parseRealPath(args, secondArgumentIndex).realPath,
                'decompress'
            );
            break;
        case 'os':
            await getOsInfo(args[0]);
            break;
        default:
            console.log(`Invalid input`);
    }
}
