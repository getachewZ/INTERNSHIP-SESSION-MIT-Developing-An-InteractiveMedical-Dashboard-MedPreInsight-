import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Financialreport() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/totalpatients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare data for age groups
  const ageGroups = {};
  patients.forEach(patient => {
    const ageGroup = Math.floor(patient.Age / 10) * 10; // Grouping by decade
    ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1;
  });

  // Prepare data for medical condition groups
  const medicalConditionGroups = {};
  patients.forEach(patient => {
    const condition = patient['Medical Condition'];
    medicalConditionGroups[condition] = (medicalConditionGroups[condition] || 0) + 1;
  });

  // Prepare data for test result groups
  const testResultGroups = {};
  patients.forEach(patient => {
    const result = patient['Test Results'];
    testResultGroups[result] = (testResultGroups[result] || 0) + 1;
  });

  return (
    <div>
      <h1>List of Patients</h1>
      
      <h2>Age Groups</h2>
      <BarChart
        width={600}
        height={400}
        data={Object.entries(ageGroups).map(([group, count]) => ({ ageGroup: `${group}-${group + 9}`, count }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      {/* Chart for Medical Condition Groups */}
      <h2>Medical Condition Groups</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={Object.entries(medicalConditionGroups).map(([condition, count]) => ({ name: condition, value: count }))}
          cx={200}
          cy={200}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {value}
              </text>
            );
          }}
          fill="#8884d8"
        >
          {
            Object.entries(medicalConditionGroups).map(([condition], index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))
          }
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Chart for Test Result Groups */}
      <h2>Test Result Groups</h2>
      <BarChart
        width={600}
        height={400}
        data={Object.entries(testResultGroups).map(([result, count]) => ({ result, count }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="result" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Financialreport;
