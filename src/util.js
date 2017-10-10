import { OPERATORS } from '@/const';


export function getRandom(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * ((maxFloor - minCeil) + 1)) + minCeil;
}

export function generateProcessValues() {
  const operators = Object.values(OPERATORS);

  return {
    timeMax: getRandom(5, 8),
    operation: {
      operand1: getRandom(1, 50),
      operator: operators[getRandom(0, operators.length - 1)],
      operand2: getRandom(1, 50),
    },
  };
}
