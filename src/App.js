// Importing React and its hooks: useState (for managing state) and useEffect (for side effects like intervals)
import React, { useState, useEffect } from "react";

// Importing the CSS file for styling the application
import "./App.css";

// Defining the main functional component `App`
function App() {
  // State to store the time (hours, minutes, seconds) with an initial value of 0 for each
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // State to track whether the stopwatch is running; initially set to `false`
  const [isRunning, setIsRunning] = useState(false);

  // useEffect hook to handle the timer logic when the `isRunning` state changes
  useEffect(() => {
    let timer; // Variable to store the interval ID

    // If the stopwatch is running, start an interval
    if (isRunning) {
      timer = setInterval(() => {
        // Update the `time` state every second
        setTime((prevTime) => {
          const { hours, minutes, seconds } = prevTime; // Destructure the previous time

          // If seconds reach 59, reset seconds and increment minutes
          if (seconds === 59) {
            // If minutes reach 59, reset minutes and increment hours
            if (minutes === 59) {
              return { hours: hours + 1, minutes: 0, seconds: 0 }; // Increment hours, reset minutes and seconds
            }
            return { hours, minutes: minutes + 1, seconds: 0 }; // Increment minutes, reset seconds
          }
          return { hours, minutes, seconds: seconds + 1 }; // Increment seconds
        });
      }, 1000); // Timer runs every 1000 milliseconds (1 second)
    } else {
      clearInterval(timer); // If stopwatch is not running, clear the interval
    }

    // Cleanup function to clear the interval when the component unmounts or `isRunning` changes
    return () => clearInterval(timer);
  }, [isRunning]); // Dependency array ensures this effect runs only when `isRunning` changes

  // Function to start the stopwatch by setting `isRunning` to `true`
  const start = () => setIsRunning(true);

  // Function to stop the stopwatch by setting `isRunning` to `false`
  const stop = () => setIsRunning(false);

  // Function to reset the stopwatch: stop it and reset the time to 0
  const reset = () => {
    setIsRunning(false); // Stop the stopwatch
    setTime({ hours: 0, minutes: 0, seconds: 0 }); // Reset the time to 0
  };

  // Function to format a time value (e.g., 7) into a two-digit string (e.g., "07")
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  // The component's UI
  return (
    <div className="app">
      {" "}
      {/* Main container with a CSS class `app` */}
      <h1 className="time-display">
        {" "}
        {/* Displays the formatted time */}
        {formatTime(time.hours)}:{formatTime(time.minutes)}:
        {formatTime(time.seconds)}
      </h1>
      <div className="buttons-container">
        {" "}
        {/* Container for the buttons */}
        {/* Button to start the stopwatch */}
        <button onClick={start} className="button start">
          Start
        </button>
        {/* Button to stop the stopwatch */}
        <button onClick={stop} className="button stop">
          Stop
        </button>
        {/* Button to reset the stopwatch */}
        <button onClick={reset} className="button reset">
          Reset
        </button>
      </div>
    </div>
  );
}

// Exporting the `App` component so it can be used in other files
export default App;
