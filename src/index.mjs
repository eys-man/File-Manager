import readline from 'readline';
import os from 'os';
import showCurrentDirectory from './utils/showCurrentDirectory.mjs';
import parseCommand from './utils/parseCommand.mjs';

// определить имя пользователя
const userName = process.env.npm_config_username ?
    process.env.npm_config_username :
    'Guest';

console.log(`Welcome to the File Manager, ${userName}!`);
process.chdir(os.homedir()); // перейти в папку пользователя
showCurrentDirectory();

const userInterface = readline.createInterface(process.stdin, process.stdout);

userInterface
    .on('line', async (userInput) =>
    {
        await parseCommand(userInput, userInterface);
        // после каждой операции - удачной или нет - вывод рабочего каталога
        showCurrentDirectory();
    })
    .on('SIGINT', () => {
        // Ctrl-C
        userInterface.close();
    })
    .on('close', () => {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!\n`);
        process.exit();
    });
