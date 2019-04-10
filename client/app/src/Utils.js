import React from "react";
import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newCourse = () => {
  const statusChance = Math.random();
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    subject: namor.generate({ words: 1, numbers: 0 }),
    level: Math.floor(Math.random() * 30),
    startTime: Math.floor(Math.random() * 100),
    endTime: Math.floor(Math.random() * 100),
    price:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newCourse(),
      children: range(10).map(newCourse)
    };
  });
}

export const Logo = () => (
  <div
    style={{
      margin: "1rem auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    For more examples, visit {""}
    <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>
);

export const Tips = () => (
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
);
