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
          // TODO: провести разбор аргументов на строку с пробелами
          console.log(args[0]);
          await cd(args[0]);
          break;
      default:
          process.stdout.write(`Invalid input`);
  }
}
