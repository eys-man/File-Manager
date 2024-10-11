export async function cd(newPath) {
    try {
        process.chdir(newPath);
    } catch {
        process.stdout.write(`Operation failed`);
    }
}
