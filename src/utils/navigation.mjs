import { readdir, stat } from 'fs/promises';

export async function cd(newPath) {
    try {
        process.chdir(newPath);
    } catch {
        process.stdout.write(`Operation failed`);
    }
}

function compareFiles(a, b) {
    if (a.type === 'directory' && b.type === 'directory')
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else return 1;

    if (a.type === 'directory' && b.type === 'file') return -1;

    if (a.type === 'file' && b.type === 'directory') return 1;

    if (a.type === 'file' && b.type === 'file')
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else return 1;
}

export async function ls() {
    try {
        const files = await readdir(process.cwd());

        let filesInfo = [];

        for (const name of files) {
            try {
                const stats = await stat(name);
                const type = stats.isDirectory() ? 'directory' : 'file';
                filesInfo.push({name, type});
            } catch (err) {
                console.log(``);
            }
        }
        // отсортировать массив
        filesInfo.sort(compareFiles);

        console.table(filesInfo);
    } catch (err) {
        console.log(err);
        console.log(`Operation failed`);
    }
}
