import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InOutPatientsTable = ({ data }) => {
  return (
    <Box width='100%'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>New Patients</TableCell>
              <TableCell>Total Patients</TableCell>
              <TableCell>Appointed Patients</TableCell>
              <TableCell>Admitted Patients</TableCell>
              <TableCell>Referred Patients</TableCell>
              <TableCell>Discharged Patients</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.newPatients}</TableCell>
                <TableCell>{row.totalPatients}</TableCell>
                <TableCell>{row.appointedPatients}</TableCell>
                <TableCell>{row.admittedPatients}</TableCell>
                <TableCell>{row.referedPatients}</TableCell>
                <TableCell>{row.dischargedPatients}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InOutPatientsTable;
