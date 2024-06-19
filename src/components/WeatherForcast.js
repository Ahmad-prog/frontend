import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForcast.css'; // Import the CSS file

const WeatherForm = () => {
  const [formData, setFormData] = useState({
  
    precipitation: '',
    temp_max: '',
    temp_min: '',
    wind: '',
  
  });

  const [prediction, setPrediction] = useState(null);
  const [weatherClass, setWeatherClass] = useState('');

  useEffect(() => {
    // Set the weather class to "rainy" for demo purposes
    setWeatherClass('raino');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      console.log('API response:', response.data);
      
      // Extracting prediction directly without the surrounding object
      const weatherPrediction = response.data.Prediction[0]; // Assuming only one prediction is returned
      setPrediction(response.data);

      // Determine the weather class based on the prediction
      switch (weatherPrediction) {
        case 'rain':
        case 'drizzle':
          setWeatherClass('rainy');
          break;
        case 'sunny':
        case 'sun':
          setWeatherClass('sunny');
          break;
        case 'windy':
          setWeatherClass('windy');
          break;
        case 'snow':
          setWeatherClass('snowy');
          break;
        default:
          setWeatherClass('');
          break;
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (

    
    <div className={`weather-form ${weatherClass}`}>
      
      <header className="weather-form-header">
        <h1>Weather Prediction Form</h1>
      </header>
      {weatherClass === 'rainy' && Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="droplet"></div>
      ))}
      <form onSubmit={handleSubmit}>
     
        <div className="form-group1">
          <label>Precipitation:</label>
          <input type="number" name="precipitation" value={formData.precipitation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Temp Max:</label>
          <input type="number" name="temp_max" value={formData.temp_max} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Temp Min:</label>
          <input type="number" name="temp_min" value={formData.temp_min} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Wind:</label>
          <input type="number" name="wind" value={formData.wind} onChange={handleChange} required />
        </div>
    
        <button type="submit" >Get Prediction </button>
      </form>
      {prediction && (
               
                  
               <div className="prediction-result">
                  <h3>Prediction Result:</h3>
{JSON.stringify(prediction) === '{"Prediction":["rain"]}' ? (
<p>It's going to rain!</p>
) : JSON.stringify(prediction) === '{"Prediction":["sun"]}' ? (
<p>Looks like it will be sunny!</p>
) : JSON.stringify(prediction) === '{"Prediction":["fog"]}'  ? (
<p>Expect some Fog!</p>
) :JSON.stringify(prediction) === '{"Prediction":["snow"]}' ? (
<p>Get ready for snow!</p>
) : (
<p>No specific prediction available.</p>
)}
</div>
     
       )}
    
      
    </div>
  );
};

export default WeatherForm;
