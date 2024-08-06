import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';
import CreateTip from './components/CreateTip';
import ViewTips from './components/ViewTip';
import axios from  'axios'

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = async () => {
      try {
        await axios.post('http://localhost:3000/users/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setToken(null); 
      } catch (error) {
        console.error('Logout failed!', error);
        alert('Logout failed!');
      }
  };

  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Tip Tracker</Typography>
            {token ? (
              <>
                <Button color="inherit" component={Link} to="/create-tip">Create Tip</Button>
                <Button color="inherit" component={Link} to="/view-tips">View Tips</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/create-tip" element={<CreateTip token={token} />} />
          <Route path="/view-tips" element={<ViewTips token={token} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
