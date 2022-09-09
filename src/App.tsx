import React from 'react';
import Button from '@mui/material/Button';

type Sum = {
  (x: number, y: number): number;
};

const sum: Sum = (x, y) => x + y;

export const App = () => {
  return (
    <>
      <div>{sum(12, 4)}</div>
      <Button variant="contained">Hello World</Button>
      <div>Hello World!</div>
    </>
  );
};
