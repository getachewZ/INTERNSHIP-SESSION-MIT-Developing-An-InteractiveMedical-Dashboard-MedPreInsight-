import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomForest() {
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
  const [graph, setGraph] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [confusion_matrix, setConfusion_matrix] = useState([]);
  const [classification_report, setClassification_report] = useState({});
  const [roc_curve1, setRoc_curve1] = useState(null);
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
      setGraph(response.data.graph);
      setAccuracy(response.data.accuracy);
      setConfusion_matrix(response.data.confusion_matrix);
      setHeatmap(response.data.heatmap);
      setClassification_report(response.data.classification_report);
      setRoc_curve1(response.data.roc_curve1);
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
        <h1 style={{ color: "indigo" }}>RandomForest Prediction For Diabetes</h1>
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
          type="number" name="DiabetesPedigreeFunction"
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

          {rf_predictions.map((prediction, index) => (
            <p
              key={index}
              style={{ color: "red", marginTop: "15px", fontSize: "25px" }}
            >
              Prediction: {prediction}
            </p>
          ))}

          {accuracy !== null && (
            <p style={{ color: "indigo", fontSize: "20px" }}>
              Accuracy Score:{accuracy}
            </p>
          )}
          {classification_report && (
            <div>
              <h2 style={{ color: "indigo", fontSize: "26px" }}>
                classification_report
              </h2>
              <pre>
                {classification_report.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </pre>
            </div>
          )}
          {confusion_matrix && (
            <div>
              <h1 style={{ color: "indigo", fontSize: "25px" }}>
                Consfusion_Matrix
              </h1>
              <pre>
                {confusion_matrix.map((row) => row.join("\t")).join("\n")}
              </pre>
              {heatmap && (
                <div>
                  <img
                    src={`data:image/png;base64,${heatmap}`}
                    alt="confusionmatrix"
                  />
                </div>
              )}
            </div>
          )}
          {roc_curve1 && (
            <div>
              <img
                src={`data:image/png;base64,${roc_curve1}`}
                alt="Roc curve"
              />
            </div>
          )}
        </div>
      )}
      {graph && <img src={graph} alt="RandomForest" />}
    </div>
  );
}

export default RandomForest;