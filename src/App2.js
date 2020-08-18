import React from 'react';
import NavBar from './components/NavBar'
import NavBar from './components/Footer'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
        <div>
          <NavBar />
          <Container maxWidth="lg">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
          </Container>
        </div>
      );
}

export default App2;
