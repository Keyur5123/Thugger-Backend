import React, { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(25 * 60);
  const [isStarted, setIsStarted] = useState(false);
  // let isStarted = false;
  // let startTime, endTime;

  useEffect(() => {
    if (isStarted === true) {
      let id = setInterval(() => {
        if (counter <= 0) {
          setIsStarted(false);
        } else {
          setCounter((p) => p - 1);
        }
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [isStarted,counter]);

  const reset = (m = 25) => {
    setCounter(Math.trunc(m * 60));
    console.log(counter)
  };

  const startCounter = () => {
    if (!isStarted) {
      // isStarted = true;
      setIsStarted(true);
    }
  };

  const stopCounter = () => {
    if (isStarted) {
      // isStarted = true;
      setIsStarted(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tomato Timer</h1>
      </header>
      <nav>
        <button onClick={() => reset(25)}>Pomodoro</button>
        <button onClick={() => reset(0.1)}>Short Break</button>
        <button onClick={() => reset(15)}>Long Break</button>
      </nav>
      <main>
        <section>
          <h1>{`${Math.trunc(counter / 60)
            .toString()
            .padStart(2, "0")}:${(counter % 60)
            .toString()
            .padStart(2, "0")}`}</h1>
          <button onClick={startCounter}>Start</button>
          <button onClick={stopCounter}>Stop</button>
          <button onClick={reset}>Reset</button>
          <div>
            <label name="log">Log</label>
            <input name="log" type="text" placeholder="Enter log"></input>
          </div>
        </section>
        <section>
          <h4>Activity</h4>
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Log</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11:00</td>
                <td>11:30</td>
                <td>Organised frontend masters courses on external hdd</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
//AfGNmEs7V59LNKVb0wasGq55F1QHAM19zStQ918CzvqF_Q93vE6zy2g5HcKVH8VsfdIvhDyXJM99gUpD