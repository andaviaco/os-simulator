
export default class ProgramBatcher {
  MAX_PROGRAM_PER_BARCH = 5;

  constructor(programs = []) {
    // TODO: remove dummy data
    this.batches = [];

    programs.forEach(this.addProgram.bind(this));
  }

  get lastBatch() {
    try {
      return this.batches[this.batches.length - 1];
    } catch (e) {
      return null;
    }
  }

  addProgram(program) {
    const lastBatch = this.lastBatch;

    if (lastBatch && lastBatch.length < this.MAX_PROGRAM_PER_BARCH) {
      lastBatch.push(program);
    } else {
      this.createBatch(program);
    }
  }

  createBatch(...programs) {
    this.batches.push(programs);
  }

  dequeueBatch() {
    return this.batches.shift();
  }

  isIdAvailable(id) {
    const flatPrograms = this.batches.reduce((acc, batch) => acc.concat(batch), []);
    const takenIds = flatPrograms.map(program => program.id);

    return !takenIds.find(programId => programId === id);
  }
}
