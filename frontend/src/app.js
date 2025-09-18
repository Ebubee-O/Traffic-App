import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated, logout } from './utils/auth';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
import ReportForm from './components/ReportForm';
import UpdatesList from './components/UpdatesList';

function App() {
  const [authenticated, setAuthenticated] = React.useState(isAuthenticated());

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!authenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authenticated ? <Signup /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={authenticated ? (
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">UNIZIK Traffic Updates</h1>
              <Map />
              <ReportForm />
              <UpdatesList />
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
