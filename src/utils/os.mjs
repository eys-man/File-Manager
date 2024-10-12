import os from 'os';

export async function getOsInfo(request) {
    try {
        switch (request.toLowerCase()) {
          case '--eol':
              console.log(`EOL = ${JSON.stringify(os.EOL)}`);
              break;
          case '--cpus':
              const cpus = os
                .cpus()
                .map(({model, speed}) => ({ model, speed: `${speed/1000} GHz`}));
              console.table(cpus);
              break;
          case '--homedir':
              // console.log(`${os.homedir}`);
              console.log(`${os.userInfo().homedir}`);
              break;
          case '--username':
              console.log(`${os.userInfo().username}`);
              break;
          case '--architecture':
              console.log(`${os.arch()}`);
              break;
          default:
              console.log(`Invalid input`);
              break;
        }
    } catch (err) {
        console.log(`${err} Operation failed`)
    }
}
