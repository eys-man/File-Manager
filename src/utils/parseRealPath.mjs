// разбор пути с пробелами и без
// start - начальный индекс в строке аргументов, с которого разбор
export function parseRealPath(args, start) {
    let pathWithSpaces = [];

    // возвращается результат и индекс на следующий элемент массива аргументов
    let stop = { realPath: '', start: start };

    if (start >= args.length ) return stop;

    if (args[start].startsWith('"') ) { // если путь в двойных кавычках
        for(let i = start; i < args.length; i++) {
            pathWithSpaces.push(args[i]);
            if (args[i].endsWith('"') ) {
                stop.realPath = pathWithSpaces.join(' ').slice(1, -1,);
                stop.start = i+1;
                break;
            }
        }
    }
    else {
        stop.realPath = args[start]; // если путь не в двойных кавычках
        stop.start = start+1;
    }

    // return realPath;
    return stop;
}
