import bcrypt from 'bcrypt';
import { parentPort, workerData } from 'worker_threads';

// minha senha: '251091';
const hash = '$2b$10$0OlGG/FzdMklfSBt/b7MLeZdIZLB0gm9Dx1GbI7e7ngz3rS.YHzR.';

const results = [];
for (const combination of workerData) {
  // console.log('combination', combination);
  const password = combination.join('');
  results.push(bcrypt.compareSync(password, hash));
}

parentPort.postMessage(results.some((r) => r));
