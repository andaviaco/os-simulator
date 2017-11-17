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
  constructor({ operand1, operand2, operator }, timeMax = 0, memory = 1) {
    this.id = generateId();
    this.memory = memory;
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

  get returnTime() {
    if (this.finishTime === null) {
      return null;
    }

    return this.finishTime - this.arrivalTime;
  }

  waitingTime(currentTime) {
    if (this.returnTime === null) {
      if (this.arrivalTime !== null && currentTime) {
        return currentTime - this.arrivalTime - this.time;
      }

      return null;
    }

    return this.returnTime - this.time;
  }

  get relativeResponseTime() {
    if (this.responseTime === null) {
      return null;
    }

    return this.responseTime - this.arrivalTime;
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

  processOperation(maxProcessTime) {
    const remainigTime = this.timeMax - this.time;

    if (maxProcessTime && maxProcessTime < remainigTime) {
      return this.progressProcessing(maxProcessTime);
    }

    this.status = PROCESS_STATUS.inProcess;
    this.startTimer();

    return new Promise((resolve) => {
      this.timeoutId = setTimeout(() => {
        this.operation.result = this.solverOperation();

        this.status = PROCESS_STATUS.ok;
        this.stopTimer();

        resolve(this.operation.result);
      }, remainigTime * 1000);
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

  progressProcessing(processTime) {
    this.status = PROCESS_STATUS.inProcess;
    this.startTimer();

    return new Promise((resolve) => {
      this.timeoutId = setTimeout(() => {
        this.stopTimer();
        this.status = PROCESS_STATUS.ready;

        resolve(null);
      }, processTime * 1000);
    });
  }
}
