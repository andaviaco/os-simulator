import shortid from 'shortid';

import { OPERATORS, PROCESS_STATUS } from '@/const';

const operations = {
  [OPERATORS.plus]: (a, b) => a + b,
  [OPERATORS.minus]: (a, b) => a - b,
  [OPERATORS.times]: (a, b) => a * b,
  [OPERATORS.divition]: (a, b) => a / b,
  [OPERATORS.mod]: (a, b) => a % b,
  [OPERATORS.pow]: (a, b) => a ** b,
};

export default class Program {
  constructor({ operand1, operand2, operator }, timeMax = 0) {
    this.id = shortid.generate();
    this.timeMax = timeMax;
    this.operation = {
      operand1,
      operand2,
      operator,
      result: 0,
    };
    this.time = 0;
    this.status = PROCESS_STATUS.pending;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  solverOperation() {
    const { operand1, operator, operand2 } = this.operation;

    return operations[operator](operand1, operand2);
  }

  processOperation() {
    const processTime = this.timeMax - this.time;

    this.startTimer();

    return new Promise((resolve) => {
      this.timeoutId = setTimeout(() => {
        this.operation.result = this.solverOperation();

        this.status = PROCESS_STATUS.ok;
        this.stopTimer();

        resolve(this.operation.result);
      }, processTime * 1000);
    });
  }

  pauseProcess() {
    clearTimeout(this.timeoutId);
    this.stopTimer();
  }

  statusIs(status) {
    return this.status === PROCESS_STATUS[status];
  }
}
