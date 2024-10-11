// разбор пути с пробелами и без
export function parseRealPath(args) {
    let realPath = ''; // будет передаваться в chdir
    let pathWithSpaces = [];
    if (args[0].startsWith('"') ) { // если путь в двойных кавычках
        for(let i = 0; i < args.length; i++) {
            pathWithSpaces.push(args[i]);
            if (args[i].endsWith('"') ) {
                realPath = pathWithSpaces.join(' ').slice(1, -1);
                break;
            }
        }
    }
    else realPath = args[0]; // если путь не в двойных кавычках

    return realPath;
}
