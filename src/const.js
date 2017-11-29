
export const OPERATORS = {
  plus: '+',
  minus: '-',
  times: '*',
  divition: '/',
  pow: '^',
  mod: '%',
};

export const OPERATORS_REP = {
  plus: '+',
  minus: '-',
  times: '×',
  divition: '÷',
  pow: '^',
  mod: 'mod',
};

export const PROCESOR_STATUS = {
  paused: 'paused',
  processing: 'processing',
};

export const PROCESS_STATUS = {
  ok: 'Ok',
  error: 'Error',
  pending: 'Pending',
  blocked: 'Blocked',
  inProcess: 'In process',
  ready: 'Ready',
  new: 'New',
  suspended: 'Suspended',
};

export const PROCESS_STATUS_CLASS = {
  [PROCESS_STATUS.ok]: 'is-success',
  [PROCESS_STATUS.error]: 'is-danger',
  [PROCESS_STATUS.blocked]: 'is-dark',
  [PROCESS_STATUS.inProcess]: 'is-warning',
  [PROCESS_STATUS.ready]: 'is-primary',
  [PROCESS_STATUS.suspended]: 'is-light',
};

export const DEFAULT_BLOCK_TIME = 8000;

export const MAX_PROCESSES_IN_MEMORY = 5;

export const FRAMES_QTY = 30;
export const FRAME_SIZE = 4;
export const OS_FRAME_MEMORY = 3;
