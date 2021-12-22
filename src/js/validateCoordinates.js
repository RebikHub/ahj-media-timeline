export default function validate(coordinates) {
  const coorArr = coordinates.split(',');
  const latitude = coorArr[0];
  const longitude = coorArr[1];

  if (/^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(latitude)
  && /^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(longitude)) {
    return true;
  }

  return false;
}
