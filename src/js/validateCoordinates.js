export default function validate(text) {
  const coor = text.split(',');
  const latitude = +coor[0];
  const longitude = +coor[1];

  if (!Number.isNaN(latitude * 1) && !Number.isNaN(longitude * 1)) {
    return `[${latitude}, -${longitude}]`;
  }

  return false;
}
