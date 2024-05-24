import React from "react";
import Random from "../Random/Random1";
import Super from "../Super/Super";
function Prediction() {
  return (
    <div>
      {/* Welcome message container */}
      <div style={{ textAlign: "center", margin: "60px 0" }}>
        <h1 style={{ color: "blue" }}><b>Well-Come To Prediction Dashboard</b></h1>
        <h3><i>this is the prediction page for Diabetes</i></h3>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        {" "}
        <Random />
        <Super />
      </div>
    </div>
  );
}

export default Prediction;