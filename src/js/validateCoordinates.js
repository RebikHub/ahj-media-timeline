export default function validate(text) {
//   const coor = text.split(',');
//   const latitude = +coor[0];
//   const longitude = +coor[1];

  //   if (!Number.isNaN(latitude * 1) && !Number.isNaN(longitude * 1)) {
  //     return `[${latitude}, -${longitude}]`;
  //     // return true;
  //   }

  //   return false;
  // }

  const coor = text.split(',');
  const latitude = coor[0].trim();
  const longitude = coor[1].trim();

  if (/^-?\d{1,2}\.\d{1,9}$/.test(latitude) && /^-?\d{1,2}\.\d{1,9}$/.test(longitude)) {
  // return `[${latitude}, ${longitude}]`;
    return true;
  }

  return false;
}
