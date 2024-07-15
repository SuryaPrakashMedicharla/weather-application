import React from 'react';
import './Weather.css';

const Weather = ({ data }) => {
  const organizeDataByDate = () => {
    const organizedData = {};
    data.list.forEach((forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!organizedData[date]) {
        organizedData[date] = [];
      }
      organizedData[date].push(forecast);
    });
    return organizedData;
  };

  const organizedData = organizeDataByDate();

  return (
    <div className="weather-container">
      {Object.keys(organizedData).map((date) => (
        <div key={date} className="weather-table-container">
          <table className="weather-table">
            <tbody>
              <tr className='table-date'>
                <td colSpan="3"> Date : {new Date(date).toLocaleDateString('en-GB')}</td>
              </tr>
              <tr className='table-grey'>
                <td colSpan="3">Temperature</td>
              </tr>
              <tr className='table-grey'>
                <td>Min-Max</td>
                <td colSpan="3">{organizedData[date][0].main.temp_min} - {organizedData[date][0].main.temp_max} °C</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td colSpan="3">{organizedData[date][0].main.pressure} hPa</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td colSpan="3">{organizedData[date][0].main.humidity} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Weather;
