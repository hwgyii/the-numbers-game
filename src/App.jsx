import { Box, Button, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import logoWhite from "./assets/logo-no-background.svg";

import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';


import { questionTypes, questions } from './questions.js';

const theme = createTheme({
  typography: {
    fontFamily: ['Playpen Sans', "cursive"].join(","),
    h4: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.125rem',
      },
    }
  },
  palette: {
    buttonColor: {
      main: "#3A3B3C",
      contrastText: "#FFFFFF",
    }
  }
});

function App() {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [enabledTypes, setEnabledTypes] = useState(questionTypes);
  const [questionSet, setQuestionSet] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const randomize = (event) => {
    event.preventDefault();
    console.log("randomizing");
    setButtonEnabled(false);
    const time = 50;
    const ending = 3000 / time;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      let randomized = Math.floor(Math.random() * questionSet.length);
      while (answered.includes(randomized)) randomized = Math.floor(Math.random() * questionSet.length);

      setIndex(randomized);

      if (i === ending) {
        console.log(randomized);
        console.log(answered);
        setAnswered(answered.concat(randomized));
        setButtonEnabled(true);
        clearInterval(interval);
      }
    }, time);
  };

  const onSetQuestions = () => {
    let newQuestions = enabledTypes.map((type) => {
      if (type.enabled) {
        return (questions[type.value]);
      }
    });

    newQuestions = newQuestions.flat();

    console.log(newQuestions);

    setQuestionSet(newQuestions);
  };
  
  useEffect(() => {
    onSetQuestions();
  }, []);

  return (
    
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#18191A",
          width: "100vw"
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
        <img 
            src={logoWhite}
            style={{
              height: "100px",
              width: "300px",
              objectFit: "contain",
            }}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            mt: "-200px",
            width: "100vw",
            height: "calc(100vh + 100px)",
            backgroundColor: "#18191A",
          }}
        >
          <Typography variant='h4' sx={{color: "#FFFFFF"}}>{`${index + 1}: ${questionSet[index]}`}</Typography>      
          <Button disabled={!buttonEnabled} onClick={randomize} variant='contained' size='large' sx={{borderRadius: "8px",}} color={"buttonColor"}>Randomize</Button>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default App
