export default function validate(latitude, longitude) {
  if (/^-?\d{1,2}\.\d{1,9}$/.test(latitude) && /^-?\d{1,2}\.\d{1,9}$/.test(longitude)) {
    return true;
  }

  return false;
}
