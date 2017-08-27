export default class ProgramBatcher {
  MAX_PROGRAM_PER_BARCH = 5;

  constructor() {
    this.batches = [[
      {
        id: '55',
        programmerName: 'andres',
        timeMax: 3,
        operation: {
          operand1: 5,
          operator: '*',
          operand2: 6,
        },
      },
      {
        id: '3',
        programmerName: 'andres',
        timeMax: 4,
        operation: {
          operand1: 1,
          operator: '/',
          operand2: 5,
        },
      },
    ]];
  }

  get lastBatch() {
    return this.batches[this.batches.length - 1];
  }

  addProgram(program) {
    const lastBatch = this.lastBatch;


    if (lastBatch.length + 1 < this.MAX_PROGRAM_PER_BARCH) {
      lastBatch.push(program);
    } else {
      this.createBatch(program);
    }
  }

  createBatch(...programs) {
    this.batches.push(programs);
  }

  popBatch() {
    return this.batches.pop(-1);
  }

  isIdAvailable(id) {
    const flatPrograms = this.batches.reduce((acc, batch) => acc.concat(batch), []);
    const takenIds = flatPrograms.map(program => program.id);

    return !takenIds.find(programId => programId === id);
  }
}
