import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', credentials);
      alert('Login successful!');
      onLogin(response.data.token);
      navigate('/create-tip'); // Navigate to Create Tip after login
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" onChange={handleChange} fullWidth required />
        <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
