
export default class Memory {
  constructor(frames, frameSize) {
    this.frames = frames;
    this.frameSize = frameSize;
    this.data = Array.from(Array(frames), () => this.createEmptyFrame());
  }

  add(pid, memory) {
    if (!this.fits(memory)) {
      return null;
    }

    return this.insert(memory, pid);
  }

  remove(pid) {
    const frameIndexes = [...this.data.entries()]
      .filter(([, frame]) => frame[0] === pid)
      .map(([i]) => i);

    for (const index of frameIndexes) {
      const emptyFrame = this.createEmptyFrame();
      this.data.splice(index, 1, emptyFrame);
    }
  }

  insert(memory, pid) {
    const freeFrames = this.freeFrames();
    const wholeFrames = Math.floor(memory / this.frameSize);
    const pratialFrameSpace = memory % this.frameSize;

    let partialFrameIndex;
    let frameIndex = [];

    frameIndex = freeFrames.slice(0, wholeFrames).map((i) => {
      const newData = Array.from(Array(this.frameSize), () => pid);

      this.data.splice(i, 1, newData);

      return i;
    });

    if (pratialFrameSpace) {
      partialFrameIndex = freeFrames[wholeFrames];

      frameIndex.push(partialFrameIndex);

      for (let i = 0; i < pratialFrameSpace; i++) { // eslint-disable-line no-plusplus
        this.data[partialFrameIndex].splice(i, 1, pid);
      }
    }

    return frameIndex;
  }

  freeFrames() {
    const empties = [...this.data.entries()]
      .filter(([, frame]) => frame[0] === null)
      .map(([i]) => i);

    return empties;
  }

  fits(memory) {
    const freeFrames = this.freeFrames();
    const memFrames = this.toFrames(memory);

    if (freeFrames.length >= memFrames) {
      return true;
    }

    return false;
  }

  createEmptyFrame() {
    return Array.from(Array(this.frameSize), () => null);
  }

  toFrames(memory) {
    return Math.ceil(memory / this.frameSize);
  }
}
