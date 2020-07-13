const fs = require('fs');

const dataDirection = fs.readFileSync('./res/direction.dat');
const dataSpeed = fs.readFileSync('./res/speed.dat');

const dataDirectionSplit = String(dataDirection).split('\n');
const dataSpeedSplit = String(dataSpeed).split('\n');

function sortData() {
  const output = [];

  for (let i = 0; i < dataDirectionSplit.length; i += 1) {
    const rowDirection = dataDirectionSplit[i];
    const rowSpeed = dataSpeedSplit[i];
    const tmpObj = {};
    tmpObj.date = rowDirection.split('\t')[0].split(' ')[0];
    tmpObj.time = rowDirection.split('\t')[0].split(' ')[1];
    tmpObj.direction = rowDirection.split('\t')[1];
    tmpObj.speed = rowSpeed.split('\t')[1];
    output.push(JSON.stringify(tmpObj));
  }

  fs.writeFileSync('./res/output.json', `[${output.toString()}]`);
}

function getAverage() {
  const output = [];
  let dates = [];

  dataDirectionSplit.forEach((element) => {
    dates.push(element.split('\t')[0].split(' ')[0]);
  });

  dates = dates.map((date) => date);
  dates = dates.filter((a, b) => dates.indexOf(a) === b);
  dates = dates.sort();

  dates.forEach((date) => {
    const speedRows = dataSpeedSplit.filter((element) => element.split('\t')[0].split(' ')[0] === date);
    const directionRows = dataDirectionSplit.filter((element) => element.split('\t')[0].split(' ')[0] === date);

    const speeds = [];
    const directions = [];

    speedRows.forEach((element) => {
      speeds.push(element.split('\t')[1]);
    });
    directionRows.forEach((element) => {
      directions.push(element.split('\t')[1]);
    });

    let sumSpeeds = 0;
    for (let i = 0; i < speeds.length; i += 1) {
      sumSpeeds += parseInt(speeds[i], 10);
    }
    const avgSpeeds = sumSpeeds / speeds.length;

    let sumDirections = 0;
    for (let i = 0; i < directions.length; i += 1) {
      sumDirections += parseInt(directions[i], 10);
    }
    const avgDirections = sumDirections / directions.length;

    const tmpObj = {};
    tmpObj.date = date;
    tmpObj.time = speedRows[0].split('\t')[0].split(' ')[1];
    tmpObj.direction = avgDirections;
    tmpObj.speed = avgSpeeds;
    output.push(JSON.stringify(tmpObj));
  });

  fs.writeFileSync('./res/outputAvg.json', `[${output.toString()}]`);
}

sortData();
getAverage();
