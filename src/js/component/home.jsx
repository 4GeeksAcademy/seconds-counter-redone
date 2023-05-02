import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/clock-512.png";



//create your first component
const Home = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let hoursStr = hours > 0 ? `${hours}:` : "";
    let minutesStr = minutes.toString().padStart(2, "0");
    let secondsStr = remainingSeconds.toString().padStart(2, "0");

    return `${hoursStr}${minutesStr}:${secondsStr}`;
  };

  const secondsArr = formatSeconds(seconds)
    .split("")
    .filter((num) => num !== ":")
    .map(Number);

  const renderSeconds = () => {
    if (seconds === 0) {
      return (
        <div key={0} className="seconds-box">
          <img src={rigoImage} alt="clock" className="clock-img" />
        </div>
      );
    }

    const totalBoxes = 6;
    const extraBoxes = totalBoxes - secondsArr.length;

    let boxes = [];
    for (let i = 0; i < extraBoxes; i++) {
      boxes.push(
        <div key={i} className="seconds-box">
          0
        </div>
      );
    }

    boxes = boxes.concat(
      secondsArr.map((num, index) => {
        return (
          <div key={index + extraBoxes} className="seconds-box">
            {num}
          </div>
        );
      })
    );

    return boxes;
  };

  return (
    <div className="container">
      <div className="clock-box">
        <img src={rigoImage} alt="clock" className="clock-img" />
      </div>
      <div className="seconds-container">{renderSeconds()}</div>
    </div>
  );
};

export default Home;
