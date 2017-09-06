
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '^': (a, b) => a ** b,
};

export default class Program {
  constructor({ operand1, operand2, operator }, timeMax = 0) {
    this.id = 1;
    this.timeMax = timeMax;
    this.operation = {
      operand1,
      operand2,
      operator,
      result: 0,
    };
    this.time = 0;
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

    this.result = operations[operator](operand1, operand2);

    return this.result;
  }

  processOperation() {
    const processTime = this.timeMax - this.time;

    this.startTimer();

    return new Promise((resolve) => {
      this.timeoutId = setTimeout(() => {
        const result = this.solverOperation();

        this.stopTimer();

        resolve(result);
      }, processTime * 1000);
    });
  }

  pauseProcess() {
    clearTimeout(this.timeoutId);
    this.stopTimer();
  }
}
