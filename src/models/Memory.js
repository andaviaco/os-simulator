
export default class Memory {
  constructor(frames, frameSize) {
    this.frames = frames;
    this.frameSize = frameSize;
    this.data = Array.from(Array(frames), () => (
      Array.from(Array(frameSize), () => null)
    ));
  }

  /**
   * Get available position given a required space
   * @param  {int}    memory required memory space
   * @return {int}           available space index. Null if no available space.
   */
  freePosition(memory) {
    const spaces = [];
    const empties = [...this.data.entries()]
      .filter(([, frame]) => frame[0] === null)
      .map(([i]) => i);

    let freePosition;

    for (let i = 0; i < empties.length; i++) { // eslint-disable-line no-plusplus
      const frameIndex = empties[i];
      let spaceCount = 1;


      for (let j = i; j < empties.length; j++) { // eslint-disable-line no-plusplus
        const currentIndex = empties[j];
        const nextIndex = empties[j + 1];

        if (j + 1 === empties.length || nextIndex - currentIndex !== 1) {
          i = j;
          break;
        }

        spaceCount += 1;
      }

      spaces.push([frameIndex, spaceCount * this.frameSize]);
    }

    freePosition = spaces.find(([, space]) => memory <= space);
    freePosition = freePosition ? freePosition[0] : null;

    return freePosition;
  }

}
