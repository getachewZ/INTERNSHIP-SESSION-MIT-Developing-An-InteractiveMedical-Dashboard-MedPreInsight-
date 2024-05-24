import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box } from "@mui/material";
function App() {
  return (
      <Box>
            <h1>well-come to the pridiction page</h1>
          <Box
  
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/admin/predictions/diabeticprediction" style={{ marginLeft: "15px", fontSize: "20px" }}>
            Diabetic Prediction
            </Link>
            <Link to="/admin/predictions/trendprediction" style={{ marginLeft: "25px", fontSize: "20px" }}>
              Patient Trend Prediction
            </Link>
          </Box>
      </Box>
  );
}

export default App;