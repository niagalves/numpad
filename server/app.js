import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Worker } from 'worker_threads';

const WORKERS_COUNT = 5;

const app = express();
app.use(express.json());
app.use(cors());

// minha senha: '251091';
const hash = '$2b$10$0OlGG/FzdMklfSBt/b7MLeZdIZLB0gm9Dx1GbI7e7ngz3rS.YHzR.';

const extractNumbers = (str) =>
  str.split(',').map((num) => parseInt(num.trim(), 10));

const numbersArray = (arr) => arr.map(extractNumbers);

// Função para gerar todas as combinações de 6 números
const generateCombinations = (arr, r) => {
  const combinations = [];

  // Função auxiliar recursiva
  const helper = (currentCombination, start) => {
    // Se a combinação atual atingiu o tamanho desejado (r), adicionamos ao array de combinações
    if (currentCombination.length === r) {
      combinations.push([...currentCombination]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        currentCombination.push(arr[i][j]);
        helper(currentCombination, i + 1);
        currentCombination.pop();
      }
    }
  };

  helper([], 0);

  return combinations;
};

app.post('/', function (req, res) {
  const { email, arrayPw } = req.body;

  if (!email && !arrayPw.length) {
    return res
      .status(400)
      .json({ success: false, msg: 'E-mail ou senha inválidos!' });
  }

  const resultNumbers = numbersArray(arrayPw);
  const combinations = generateCombinations(resultNumbers, 6);

  let found = false;
  combinations.forEach((combination) => {
    const password = combination.join('');
    if (bcrypt.compareSync(password, hash)) {
      found = true;
    }
  });

  if (!found) {
    return res
      .status(400)
      .json({ success: false, msg: 'E-mail ou senha inválidos!' });
  }
  return res.status(200).json({ success: true, msg: 'ok' });
});

const createChunks = (arr = [], chunks = 1) => {
  const group = [];
  for (let i = 0; i < chunks; i++) {
    group.push([]);
  }
  for (let i = 0; i < arr.length; i++) {
    group[i % chunks].push(arr[i]);
  }
  return group;
};

const createWorker = (chunk) =>
  new Promise((resolve) => {
    // const worker = new Worker("./worker.js", { workerData: chunk }); // Descomentar caso rodando api de dentro da pasta server
    const worker = new Worker('./server/worker.js', { workerData: chunk }); // Descomentar caso rodando api da root do projeto
    worker.on('message', (message) => {
      resolve(message);
    });
  });

app.post('/parallel', async (req, res) => {
  const { email, arrayPw } = req.body;

  if (!email && !arrayPw.length) {
    return res
      .status(400)
      .json({ success: false, msg: 'E-mail ou senha inválidos!' });
  }

  const resultNumbers = numbersArray(arrayPw);
  const combinations = generateCombinations(resultNumbers, 6);
  const chunks = createChunks(combinations, WORKERS_COUNT);

  let found = false;
  const results = chunks.map((chunk) => createWorker(chunk));
  const awaited = await Promise.all(results);
  found = awaited.some((r) => r);

  if (found) {
    return res
      .status(400)
      .json({ success: false, msg: 'E-mail ou senha inválidos!' });
  }
  return res.status(200).json({ success: true, msg: 'ok' });
});

app.listen(3003);
