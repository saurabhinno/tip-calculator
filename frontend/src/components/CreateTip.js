import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const CreateTip = ({ token }) => {
  const [tipData, setTipData] = useState({
    place: '',
    totalAmount: '',
    tipPercentage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTipData({ ...tipData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/tip/calculate', tipData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to create tip!');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create Tip</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Place" name="place" onChange={handleChange} fullWidth required />
        <TextField label="Total Amount" name="totalAmount" type="number" onChange={handleChange} fullWidth required />
        <TextField label="Tip Percentage" name="tipPercentage" type="number" onChange={handleChange} fullWidth required />
        <Button type="submit" variant="contained" color="primary">Create Tip</Button>
      </form>
    </Container>
  );
};

export default CreateTip;
