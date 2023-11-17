/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  useTheme,
} from '@mui/material';
import axios from 'axios';

function App() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttons, setButtons] = useState<any>([]);
  const [arrayPw, setArrayPw] = useState<string[]>([]);

  const generateRandomNumbers = useCallback(() => {
    let group = 0;
    const result: any[] = [];
    const arrayNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(
      () => 0.5 - Math.random(),
    );

    for (let i = 0; i < arrayNumbers.length; i++) {
      result.push(`${arrayNumbers[i]} ou ${arrayNumbers[i + 1]}`);

      // Incrementa i para pular para o próximo par
      i++;

      group = group + 1;
    }

    setButtons(result);
  }, []);

  const handleClick = (value: string) => {
    const replaceValue = value.replace('ou', ',');
    setArrayPw((prevState) => [...prevState, replaceValue]);
  };

  const submitParallel = () => {
    axios
      .post('http://localhost:3003/parallel', {
        email,
        arrayPw,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const submit = () => {
    axios
      .post('http://localhost:3003', {
        email,
        arrayPw,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const clearState = () => {
    setArrayPw([]);
    setPassword('');
  };

  useEffect(() => {
    function renderPassword() {
      if (arrayPw) {
        const dots = '.'.repeat(arrayPw.length);

        setPassword(dots);
      }
    }

    renderPassword();
  }, [arrayPw]);

  useEffect(() => {
    generateRandomNumbers();
  }, [generateRandomNumbers]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          clearState();
          setOpen(false);
          setEmail('');
        }}
        fullWidth
        maxWidth="sm"
      >
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={() => {
            clearState();
            setOpen(false);
            setEmail('');
          }}
        >
          Fechar
        </Button>
        <DialogContent>
          <Box
            width="290px"
            margin="0 auto"
            bgcolor={theme.palette.grey[100]}
            padding="10px"
          >
            <Box>
              <TextField
                type="email"
                label="E-mail"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Box>
            <Box>
              <TextField
                type="password"
                label="Senha"
                variant="standard"
                fullWidth
                inputProps={{ maxLength: 6 }}
                disabled
                value={password}
              />
            </Box>
            <Box mt={4}>
              <Grid container gap={3} margin="0 auto">
                {buttons.map((item: string) => (
                  <Grid
                    item
                    key={item}
                    sx={{
                      pointerEvents: password.length === 6 ? 'none' : 'auto',
                      opacity: password.length === 6 ? 0.5 : 100,
                    }}
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{ textTransform: 'lowercase' }}
                      fullWidth
                      onClick={() => handleClick(item)}
                    >
                      {item}
                    </Button>
                  </Grid>
                ))}
                <Grid item>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => clearState()}
                    sx={{ textTransform: 'capitalize' }}
                    fullWidth
                  >
                    Limpar
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => submit()}
                fullWidth
                disabled={!email || password.length < 6}
              >
                Acessar
              </Button>
            </Box>
            <Box mt={4}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => submitParallel()}
                fullWidth
                disabled={!email || password.length < 6}
              >
                Acessar (paralelizado)
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Box
        component="section"
        maxWidth="sm"
        margin="120px auto"
        bgcolor={theme.palette.color.grey[100]}
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button type="button" variant="contained" onClick={() => setOpen(true)}>
          Acessar sistema
        </Button>
      </Box>
    </>
  );
}

export default App;
