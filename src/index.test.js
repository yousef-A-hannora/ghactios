const { add, multiply } = require("./index");

test("adds two numbers", () => {
  expect(add(2, 3)).toBe(5);
});

test("multiplies two numbers", () => {
  expect(multiply(4, 5)).toBe(20);
});