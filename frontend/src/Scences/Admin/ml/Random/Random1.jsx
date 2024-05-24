import React, { useState, useEffect } from "react";
import axios from "axios";

function Random() {
  const [inputData, setInputData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [rf_predictions, setRf_Predictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        inputData
      );
      setRf_Predictions(response.data.rf_predictions);
      // setGraphData(response.data.graph);
      setAccuracy(response.data.accuracy);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <h1 style={{ color: "indigo" }}>RandomForest Prediction</h1>
      </div>
      <div>
        <label
          style={{ color: "green", marginTop: "15px", marginLeft: "16px" }}
        >
          pregnancies:
        </label>
        <input
          type="number"
          name="Pregnancies"
          value={inputData.Pregnancies}
          onChange={handleChange}
          style={{ marginLeft: "36px", marginTop: "15px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginTop: "15px", marginLeft: "16px" }}
        >
          Glucose:
        </label>
        <input
          type="number"
          name="Glucose"
          value={inputData.Glucose}
          onChange={handleChange}
          style={{ marginLeft: "56px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginTop: "15px", marginLeft: "16px" }}
        >
          BloodPressure:
        </label>
        <input
          type="number"
          name="BloodPressure"
          value={inputData.BloodPressure}
          onChange={handleChange}
          style={{ marginLeft: "16px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginTop: "15px", marginLeft: "16px" }}
        >
          Skin Thickness:
        </label>
        <input
          type="number"
          name="SkinThickness"
          value={inputData.SkinThickness}
          onChange={handleChange}
          style={{ marginLeft: "16px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginTop: "15px", marginLeft: "16px" }}
        >
          Insulin:
        </label>
        <input
          type="number"
          name="Insulin"
          value={inputData.Insulin}
          onChange={handleChange}
          style={{ marginLeft: "66px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginLeft: "16px", marginTop: "15px" }}
        >
          BMI:
        </label>
        <input
          type="number"
          name="BMI"
          value={inputData.BMI}
          onChange={handleChange}
          style={{ marginLeft: "86px" }}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginLeft: "16px", marginTop: "15px" }}
        >
          Diabetes Pedigree:
        </label>
        <input
          type="number"
          name="DiabetesPedigreeFunction"
          value={inputData.DiabetesPedigreeFunction}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          style={{ color: "green", marginLeft: "16px", marginTop: "15px" }}
        >
          Age:
        </label>
        <input
          type="number"
          name="Age"
          value={inputData.Age}
          onChange={handleChange}
          style={{ marginLeft: "86px" }}
        />
      </div>
      <button
        onClick={fetchData}
        style={{ color: "blue", marginTop: "15px", marginLeft: "55px" }}
      >
        Predict Diabetes
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && rf_predictions && rf_predictions.length > 0 && (
        <div>
          <h2 style={{ color: "blue", marginTop: "16px" }}>
            RandomForest Predictions:
          </h2>
          <ul>
            {rf_predictions.map((prediction, index) => (
              <li
                key={index}
                style={{ color: "red", marginTop: "15px", fontSize: "25px" }}
              >
                Prediction: {prediction}
              </li>
            ))}
          </ul>
          {accuracy !== null && (
            <p style={{ color: "indigo", fontSize: "20px" }}>
              Accuracy Score:{accuracy}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Random;