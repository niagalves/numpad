import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

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

  if (!email && !arrayPw.length)
    res.json({ success: false, msg: 'E-mail ou senha inválidos!' });

  const resultNumbers = numbersArray(arrayPw);
  const combinations = generateCombinations(resultNumbers, 6);

  combinations.forEach((combination) => {
    const password = combination.join('');
    if (bcrypt.compareSync(password, hash)) {
      console.log(`Senha encontrada: ${password}`);
    }
  });

  res.json({ success: true, msg: 'ok' });
});

app.listen(3003);
