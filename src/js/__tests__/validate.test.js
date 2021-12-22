import validate from '../validateCoordinates';

test.each([
  ['validate input', '51.50851, -0.12572', true],
  ['validate input', '51.50851,-0.12572', true],
  ['validate input', '[51.50851, -0.12572]', true],
])(('validate input'), (_, input, expected) => {
  expect(validate(input)).toEqual(expected);
});
