import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    proPic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proPic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('proPic', formData.proPic);

    try {
      const response = await axios.post('http://localhost:3000/users', form);
      alert(response.data.message);
      navigate('/login'); // Navigate to the login page after signup
    } catch (error) {
      console.error(error);
      alert('Signup failed!');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" onChange={handleChange} fullWidth required />
        <TextField label="Email" name="email" onChange={handleChange} fullWidth required />
        <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;
