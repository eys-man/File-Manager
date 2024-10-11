export default function showCurrentDirectory() {
  process.stdout.write(`\nYou are currently in '${process.cwd()}'\n`);
}
