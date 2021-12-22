import validate from './validateCoordinates';
import geolocation from './geolocation';

export default class Timeline {
  constructor() {
    this.timelineRecords = document.querySelector('.timeline-records');
    this.timelineInputText = document.querySelector('.timeline-input-text');
    this.message = null;
    this.modal = document.querySelector('.modal');
    this.modalInput = document.querySelector('.modal-input-text');
    this.coordinates = null;
    this.ok = document.querySelector('.modal-ok');
    this.cancel = document.querySelector('.modal-cancel');
    this.error = document.querySelector('.input-error');
  }

  events() {
    this.inputText();
    this.inputTextEnter();
    this.inputCoordinates();
    this.clickOk();
    this.clickCancel();
  }

  addRecord() {
    const record = document.createElement('div');
    const date = document.createElement('div');
    const content = document.createElement('div');
    const coordinates = document.createElement('div');
    const numCoordinates = document.createElement('p');
    const imgCoordinates = document.createElement('div');
    coordinates.appendChild(numCoordinates);
    coordinates.appendChild(imgCoordinates);
    record.appendChild(date);
    record.appendChild(content);
    record.appendChild(coordinates);
    this.timelineRecords.appendChild(record);
    record.classList.add('record');
    date.classList.add('record-date');
    imgCoordinates.classList.add('img-coordinates');
    coordinates.classList.add('coordinates');
    date.textContent = Timeline.getDate();
    content.textContent = this.message.trim();
    numCoordinates.textContent = this.coordinates;

    this.message = null;
    this.coordinates = null;
  }

  inputText() {
    this.timelineInputText.addEventListener('input', (ev) => {
      this.message = ev.target.value;
    });
  }

  async geo() {
    this.coordinates = await geolocation();
  }

  inputTextEnter() {
    this.timelineInputText.addEventListener('keyup', (ev) => {
      this.geo();

      if (ev.key === 'Enter' && this.coordinates === null) {
        this.modal.classList.remove('none');
        this.timelineInputText.value = null;
      } else if (ev.key === 'Enter' && this.message !== null && this.coordinates !== null && this.coordinates !== false) {
        this.addRecord();
        this.timelineInputText.value = null;
      }
    });
  }

  inputCoordinates() {
    this.modalInput.addEventListener('input', (ev) => {
      const coordinates = ev.target.value;
      const coorArr = coordinates.split(',');
      const latitude = coorArr[0].trim();
      const longitude = coorArr[1].trim();
      if (validate(coordinates)) {
        this.coordinates = `[${latitude}, ${longitude}]`;
      }
    });
  }

  clickOk() {
    this.ok.addEventListener('click', () => {
      if (this.coordinates === null) {
        this.inputError();
      } else {
        this.modal.classList.add('none');
        this.addRecord();
      }
    });
  }

  clickCancel() {
    this.cancel.addEventListener('click', () => {
      this.coordinates = null;
      this.modalInput.value = null;
      this.modal.classList.add('none');
    });
  }

  inputError() {
    this.error.classList.remove('none');
    setTimeout(() => this.error.classList.add('none'), 3000);
  }

  static getDate() {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${day}.${month}.${String(year).slice(2)} ${hours}:${minute}`;
  }
}
