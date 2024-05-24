import React, { useState, useEffect } from "react";
import axios from "axios";

function Super() {
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
  const [svm_predictions, setSvm_predictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [svm_accuracy_test, setSvm_accuracy_test] = useState(null);
  const [classification_report, setClassification_report] = useState({});

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
      setSvm_predictions(response.data.svm_predictions);
      setSvm_accuracy_test(response.data.svm_accuracy_test);
      setClassification_report(response.data.classification_report);
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
      <h1 style={{ color: "indigo" }}>Super Vector Machine Prediction</h1>
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
          name="Age" value={inputData.Age}
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
      {!isLoading && svm_predictions && svm_predictions.length > 0 && (
        <div>
          <h2>SVM Predictions:</h2>

          {svm_predictions.map((svm_prediction, index) => {
            return (
              <p key={index} style={{ color: "red", fontSize: "25px" }}>
                Prediction:{svm_prediction}
              </p>
            );
          })}
          {svm_accuracy_test !== null && (
            <p style={{ color: "black", fontSize: "20px" }}>
              Accuracy Score:{svm_accuracy_test}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Super;