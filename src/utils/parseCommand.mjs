import { cd } from './navigation.mjs';

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

          await cd(realPath);
          break;
      default:
          process.stdout.write(`Invalid input`);
  }
}
