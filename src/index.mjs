import readline from 'node:readline/promises';

// прочитать имя пользователя
const userName = process.env.npm_config_username ?
    process.env.npm_config_username :
    'Guest';

console.log(`Welcome to the File Manager, ${userName}`);

const userInterface = readline.createInterface(process.stdin, process.stdout);

userInterface
    .on('line', async (input) =>
    {
        // TODO: здесь будет разбор команд
        console.log(`скоро будет разбор команд...`);
        // после каждой операции вывод рабочего каталога
    })
    .on('SIGINT', () => {
        // Ctrl-C
        userInterface.close();
    });
