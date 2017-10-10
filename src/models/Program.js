import uniqueid from 'uniqueid';

import {
  OPERATORS,
  PROCESS_STATUS,
  DEFAULT_BLOCK_TIME,
  PROCESS_STATUS_CLASS,
} from '@/const';

const generateId = uniqueid('P');

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
    this.id = generateId();
    this.timeMax = timeMax;
    this.operation = {
      operand1,
      operand2,
      operator,
      result: 0,
    };

    this.time = 0;
    this.blockedTime = 0;
    this.arrivalTime = null;
    this.finishTime = null;
    this.responseTime = null;

    this.status = PROCESS_STATUS.new;
    this.interval = null;
  }

  get remainingTime() {
    return this.timeMax - this.time;
  }

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.time += 1;
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  startBlockedTimer() {
    if (!this.bloquedInterval) {
      this.bloquedInterval = setInterval(() => {
        this.blockedTime += 1;
      }, 1000);
    }
  }

  stopBlockedTimer() {
    clearInterval(this.bloquedInterval);

    this.bloquedInterval = null;
  }

  solverOperation() {
    const { operand1, operator, operand2 } = this.operation;

    return operations[operator](operand1, operand2);
  }

  processOperation() {
    const processTime = this.timeMax - this.time;

    this.startTimer();
    this.status = PROCESS_STATUS.inProcess;

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

  stopBlocked() {
    clearTimeout(this.blockedTimeoutId);
    this.stopBlockedTimer();
  }

  startBlocking() {
    const remainingTime = DEFAULT_BLOCK_TIME - (this.blockedTime * 1000);

    this.status = PROCESS_STATUS.blocked;
    this.startBlockedTimer();

    return new Promise((resolve) => {
      this.blockedTimeoutId = setTimeout(() => {
        this.stopBlockedTimer();
        this.blockedTime = 0;
        this.status = PROCESS_STATUS.ready;

        resolve();
      }, remainingTime);
    });
  }

  statusIs(status) {
    return this.status === PROCESS_STATUS[status];
  }

  statusClass() {
    return PROCESS_STATUS_CLASS[this.status];
  }

  setReady() {
    this.status = PROCESS_STATUS.ready;
  }
}
