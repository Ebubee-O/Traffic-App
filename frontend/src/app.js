import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './utils/auth';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
import ReportForm from './components/ReportForm';
import UpdatesList from './components/UpdatesList';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={user ? (
            <div className="app-container">
              <Map />
              <ReportForm />
              <UpdatesList />
              <button onClick={() => auth.signOut().then(() => setUser(null))}>Logout</button>
            </div>
          ) : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
