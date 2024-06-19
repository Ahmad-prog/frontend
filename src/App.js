import React from 'react';
import './App.css';
import WeatherForm from './components/WeatherForcast';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Weather Prediction App</h1>
            </header>
            <main>
                <WeatherForm />
            </main>
        </div>
    );
};

export default App;
