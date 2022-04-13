import { useState } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchtext] = useState('');
  const [currentWeather, setCurrentWeather] = useState('');

  const apiKey = 'd36fe73cd7de8e737081206dc5a3178e';

  async function getWeather(event) {
    if (event.key === 'Enter') {
      let resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}`,
      );
      let data = await resp.json();

      setCurrentWeather(data);
      setSearchtext('');
    }
  }

  function date(date) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = date.getDate();
    let weekDay = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${weekDay} ${day} ${month} ${year}`;
  }

  return (
    <>
      <main
        className={
          typeof currentWeather.main !== 'undefined' && currentWeather.main.temp - 272 > 16
            ? 'app-worm'
            : 'app-cold'
        }>
        <div className="serchBar-wrapper">
          <input
            className="searchValue"
            type="text"
            placeholder="Search..."
            onChange={({ target }) => setSearchtext(target.value)}
            value={searchText}
            onKeyPress={getWeather}
          />
        </div>
        {typeof currentWeather.main != 'undefined' ? (
          <div className="mainContent">
            <div className="location">
              {currentWeather.name}, {currentWeather.sys.country}
            </div>
            <div className="date">{date(new Date())}</div>
            <div className="temperature">{Math.round(currentWeather.main.temp - 272)}°C</div>
            <div className="feelsLike">{currentWeather.weather[0].description}</div>
          </div>
        ) : null}
      </main>
    </>
  );
}

export default App;
