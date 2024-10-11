export default async function parseCommand(str, stream) {
  const [command, ...args] = str.split(' ');

  // разобрать команды
  switch (command.toLowerCase()) {
      case '.exit':
          stream.close();
      default:
          process.stdout.write(`Invalid input`);
  }
}
