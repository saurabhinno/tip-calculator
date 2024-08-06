import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from '@mui/material';
import DatePicker from 'react-datepicker'; // Import React Datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for Datepicker
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTips = ({ token }) => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFetchTips = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    // Format the dates to dd-mm-yyyy
    const formattedStartDate = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()}-${endDate.getMonth() + 1}-${endDate.getFullYear()}`;

    try {
      const response = await axios.get(`http://localhost:3000/tip?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTips(response.data.tips);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch tips!');
    }
  };

  return (
    <Container>
      <Typography variant="h4">View Tips</Typography>
      <div>
        <Typography variant="h6">Start Date</Typography>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd-MM-yyyy" // Format date
          isClearable
          placeholderText="Select start date"
        />
      </div>
      <div>
        <Typography variant="h6">End Date</Typography>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd-MM-yyyy" // Format date
          isClearable
          placeholderText="Select end date"
        />
      </div>
      <Button onClick={handleFetchTips} variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Fetch Tips
      </Button>
      <Button onClick={() => navigate('/create-tip')} variant="outlined" color="secondary" style={{ marginLeft: '16px' }}>
        Create Tip
      </Button>

      <Table style={{ marginTop: '16px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Tip Percentage</TableCell>
            <TableCell>Tip Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tips.map((tip, index) => (
            <TableRow key={index}>
              <TableCell>{tip.place}</TableCell>
              <TableCell>{tip.totalAmount}</TableCell>
              <TableCell>{tip.tipPercentage}</TableCell>
              <TableCell>{tip.tipAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ViewTips;
