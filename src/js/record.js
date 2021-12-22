export default class Record {
  constructor(element) {
    this.chunks = [];
    this.recorder = null;
    this.element = element;
  }

  async createRecord() {
    if (!window.MediaRecorder) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.recorder = new MediaRecorder(stream);

    this.recorder.addEventListener('start', () => {
      console.log('recording started');
    });

    this.recorder.addEventListener('dataavailable', (ev) => {
      console.log('data available');
      this.chunks.push(ev.data);
    });

    this.recorder.addEventListener('stop', () => {
      console.log('recording stopped');
      const blob = new Blob(this.chunks);
      this.element.src = URL.createObjectURL(blob);
    });

    this.recorder.start();
  }
}
