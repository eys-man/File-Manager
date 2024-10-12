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

export default async function parseCommand(str, stream) {
    // команды и параметры должны быть разделены пробелами
    const [command, ...args] = str.split(' ');

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
            // const firstArgumentIndex = 0;
            const secondArgumentIndex = parseRealPath(args, 0).start;
            // console.log(`firstArgumentIndex=${firstArgumentIndex}, secondArgumentIndex=${secondArgumentIndex}`);
            await renameFile(
                // parseRealPath(args, firstArgumentIndex).realPath,
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
        default:
            console.log(`Invalid input`);
    }
}
