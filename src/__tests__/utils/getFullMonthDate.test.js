import getFullMonthDate from '../../utils/getFullMonthDate'

test('test full month date display', () => {
  expect(getFullMonthDate("01.01.2011")).toBe("01 February 2011");
});
