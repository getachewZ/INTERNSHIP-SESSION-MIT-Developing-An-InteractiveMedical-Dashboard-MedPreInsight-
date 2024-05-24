import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function LinearRegression() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [predictionVisible, setPredictionVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/getdata')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patient data!', error);
        setError('There was an error fetching the patient data.');
      });
  }, []);
  const handleSubmitVisits = () => {
    axios.post('http://localhost:8000/predict_visits', {
      patients: data.map(d => d.count)
    })
    .then(response => {
      const roundedPredictions = response.data.map(pred => Math.round(pred));
      const lastYear = data[data.length - 1].year;
      const nextYear = lastYear + 1;
      const nextYearMonths = Array.from({ length: 12 }, (_, i) => ({
        month: data[i].month,
        year: nextYear,
        count: roundedPredictions[i]
      }));
      setPredictions(nextYearMonths);
      setPredictionVisible(true); // Show prediction chart
    })
    .catch(error => {
      console.error('There was an error making the prediction request!', error);
      setError('There was an error making the prediction request.');
    });
  };
  return (
    <div className="App">
      <h1>Well come to the linear regression prediction page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button onClick={handleSubmitVisits}>Predict Next Year</button>

      {predictionVisible && (
        <div style={{ width: '100%', height: 300 }}>
            <h1><i>patients that visit hospital next year</i></h1>
          <ResponsiveContainer>
            <LineChart
              data={predictions}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
export default LinearRegression;