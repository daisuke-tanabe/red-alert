import React from 'react';

type Sum = {
  (x: number, y: number): number;
};

const sum: Sum = (x, y) => x + y;
const sum2: Sum = (x, y) => x + y;

export const App = () => {
  return (
    <>
      <div>{sum(12, 4)}</div>
      <div>{sum2(12, 4)}</div>
      <div>Hello World!</div>
    </>
  );
};
