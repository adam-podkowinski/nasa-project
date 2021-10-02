function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("Test GET /launches", () => {
  test("it should respond with 200 success", () => {
    const response = 200;
    expect(response).toBe(200);
  });
});

describe("Test POST /launch", () => {
  test("it should respond with 201 success", () => {
    const response = 201;
  });

  test("it should catch missing required properties", () => {});

  test("it should catch invalid dates", () => {});
});
