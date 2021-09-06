// import "@testing-library/jest-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import calculate from "./calcFunc";

test("renders the correct content", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);
  expect(root.querySelector("button").textContent).toBe("clear");
  expect(root.querySelector("input").textContent).toBe("");
});

test("adds numbers", () => {
  expect(calculate("1+2")).toEqual(3);
  expect(calculate("9+100")).toEqual(109);
});

test("subtracts numbers", () => {
  expect(calculate("10-2")).toEqual(8);
  expect(calculate("8-11")).toEqual(-3);
});

test("adds and subtracts numbers", () => {
  expect(calculate("4+9-3")).toEqual(10);
  expect(calculate("6-3+2")).toEqual(5);
  expect(calculate("6-2+1-4")).toEqual(1);
  expect(calculate("0-3+2")).toEqual(-1);
});

test("multiplies numbers", () => {
  expect(calculate("1*7")).toEqual(7);
  expect(calculate("0*100")).toEqual(0);
  expect(calculate("2*4*3")).toEqual(24);
  expect(calculate("7*100*9*0")).toEqual(0);
});

test("divides numbers", () => {
  expect(calculate("10/2")).toEqual(5);
  expect(calculate("100/5")).toEqual(20);
  expect(Number(calculate("1/3").toFixed(2))).toEqual(0.33);
});

test("can add, subtract, multiply and divide decimal numbers", () => {
  expect(calculate("1.1+2")).toEqual(3.1);
  expect(calculate("8.99-4")).toEqual(4.99);
  expect(calculate("2*2.22")).toEqual(4.44);
  expect(calculate("10.5/3")).toEqual(3.5);
});

test("support decimals without an integer before the decimal point", () => {
  expect(calculate(".2+1")).toEqual(1.2);
  expect(calculate("2*.4")).toEqual(0.8);
});

test("can accept long expressions", () => {
  expect(calculate("1-2+5+5.5-4+9-10+100-86-1+2")).toEqual(19.5);
  expect(calculate("100*8+1-1+9/2-5+100+2-1*2/2")).toEqual(900.5);
});

test("can accepts brackets", () => {
  expect(calculate("3*(2+5)")).toEqual(21);
  expect(calculate("100/(4+1)*(4+1)")).toEqual(100);
});

test("supports negative numbers in the beginning and middle of the expression", () => {
  expect(calculate("3--2")).toEqual(5);
  expect(calculate("-4+7")).toEqual(3);
  expect(calculate("-3*2")).toEqual(-6);
  expect(calculate("-4/2")).toEqual(-2);
});

test("fails when more than 1 operator in a series, unless it is a negative preceeded by an operator", () => {
  expect(calculate("3*+-10")).toEqual("Syntax Error");
  expect(calculate("9+++10")).toEqual("Syntax Error");
  expect(calculate("9++10")).toEqual("Syntax Error");
  expect(calculate("9--10")).toEqual(19);
  expect(calculate("9*-10")).toEqual(-90);
  expect(calculate("9-+10")).toEqual("Syntax Error");
});

test("fails when second operator in a series isn't a minus", () => {
  expect(calculate("3-+2")).toEqual("Syntax Error");
  expect(calculate("4++2")).toEqual("Syntax Error");
  expect(calculate("3//7")).toEqual("Syntax Error");
  expect(calculate("7+2+*19")).toEqual("Syntax Error");
});

test("fails when brackets are not balanced", () => {
  expect(calculate("1+(3-9")).toEqual("Syntax Error");
  expect(calculate("3-9)")).toEqual("Syntax Error");
});

test("fails when input includes invalid characters", () => {
  expect(calculate("9+a-100")).toEqual("Invalid Input");
  expect(calculate("80+hello")).toEqual("Invalid Input");
});

test("supports spaces in the input", () => {
  expect(calculate("9 +       8")).toEqual(17);
  expect(calculate("10      -1+2")).toEqual(11);
});
