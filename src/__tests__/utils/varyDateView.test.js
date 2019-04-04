import varyDateView from '../../utils/varyDateView'

test('test date display', () => {
  expect(varyDateView("01.01.2011")).toBe("February 01, 2011");
});
