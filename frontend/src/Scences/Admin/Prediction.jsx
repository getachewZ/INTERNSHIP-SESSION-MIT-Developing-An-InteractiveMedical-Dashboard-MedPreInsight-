import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import RandomForest from "./ml/Random/RandomForest";
import Prediction from "./ml/Prediction/Predictions";
import SVM from "./ml/Super/SVM";
import Profile from "./ml/Prediction/Profile";
function App() {
  return (
      <div>
            <h1>well-come to the pridiction page</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/admin/predictions/diabeticprediction/prediction" style={{ marginLeft: "15px", fontSize: "20px" }}>
              Prediction
            </Link>
            <Link to="/admin/predictions/diabeticprediction/Random" style={{ marginLeft: "25px", fontSize: "20px" }}>
              RandomForest
            </Link>
            <Link to="/admin/predictions/diabeticprediction/Super" style={{ marginLeft: "25px", fontSize: "20px" }}>
              Super Vector Machine
            </Link>
          </div>
          {/* <Prediction/> */}
      </div>
  );
}

export default App;