
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Pastorals from './pages/Pastorals';
import Diocese from './pages/Diocese';
import News from './pages/News';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { EventsProvider } from './context/EventsContext';
import { AuthProvider } from './context/AuthContext';

console.log("App.jsx module evaluated");

function App() {
  console.log("App component rendering");
  return (
    <Router>
      <AuthProvider>
        <EventsProvider>
          <div style={{ paddingBottom: '70px', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/pastorales" element={<Pastorals />} />
              <Route path="/diocesis" element={<Diocese />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <BottomNav />
          </div>
        </EventsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
