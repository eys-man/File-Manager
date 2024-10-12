import { readFile } from './fileOperations.mjs';
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
            await cd( parseRealPath(args) );
            break;
        case 'ls':
            await ls();
            break;
        case 'cat':
            await readFile( parseRealPath(args) );
            break;
        default:
            console.log(`Invalid input`);
    }
}
