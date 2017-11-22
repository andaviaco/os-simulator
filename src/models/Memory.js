
export default class Memory {
  constructor(frames, frameSize) {
    this.frames = frames;
    this.frameSize = frameSize;
    this.data = Array.from(Array(frames), () => (
      Array.from(Array(frameSize), () => null)
    ));
  }

}
