
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
  ok: 'ok',
  error: 'error',
  pending: 'pending',
  blocked: 'blocked',
  inProcess: 'in process',
  ready: 'ready',
  new: 'new',
};

export const PROCESS_STATUS_CLASS = {
  [PROCESS_STATUS.ok]: 'is-success',
  [PROCESS_STATUS.error]: 'is-danger',
  [PROCESS_STATUS.blocked]: 'is-info',
  [PROCESS_STATUS.inProcess]: 'is-warning',
  [PROCESS_STATUS.ready]: 'is-primary',
};

export const DEFAULT_BLOCK_TIME = 8000;
