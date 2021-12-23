export default class Record {
  constructor(element, type) {
    this.chunks = [];
    this.recorder = null;
    this.element = element;
    this.type = type;
  }

  async createRecord() {
    if (!window.MediaRecorder) {
      return;
    }

    let stream;
    if (this.type === 'audio') {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } else if (this.type === 'video') {
      stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    }

    this.recorder = new MediaRecorder(stream);

    this.recorder.addEventListener('start', () => {
      console.log('recording started');
    });

    this.recorder.addEventListener('dataavailable', (ev) => {
      console.log('data available');
      this.chunks = [];
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
