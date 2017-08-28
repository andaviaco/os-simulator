
export default class Program {
  constructor(id, { operand1, operand2, operator }, timeMax, programmerName = '') {
    this.id = id;
    this.programmerName = programmerName;
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

  stopTime() {
    clearInterval(this.interval);
  }
}
