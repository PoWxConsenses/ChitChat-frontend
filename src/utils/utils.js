exports.howLongAgo = (date) => {
  const newDate = new Date(date).getTime();
  let timeDiff = (Date.now() - newDate) / 1000;
  if (Math.floor(timeDiff / 60) === 0) return `${Math.floor(timeDiff)}sec ago`;
  timeDiff /= 60;
  if (Math.floor(timeDiff / 60) === 0) return `${Math.floor(timeDiff)}min ago`;
  timeDiff /= 60;
  if (Math.floor(timeDiff / 60) === 0)
    return `${Math.floor(timeDiff)}hours ago`;
  timeDiff /= 24;
  if (Math.floor(timeDiff / 7) === 0) return `${Math.floor(timeDiff)}days ago`;
  timeDiff /= 7;
  if (Math.floor(timeDiff / 30) === 0)
    return `${Math.floor(timeDiff)}weeks ago`;
  timeDiff /= 30;
  if (Math.floor(timeDiff / 12) === 0)
    return `${Math.floor(timeDiff)}months ago`;
  timeDiff /= 12;
  return `${Math.floor(timeDiff)}years ago`;
};

exports.timeInHourAndMin = (givenDate) => {
  let date = new Date(givenDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
