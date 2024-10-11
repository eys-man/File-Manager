export async function cd(path) {
    try {
        process.chdir(path);
    } catch {
        process.stdout.write(`Operation failed`);
    }
}
