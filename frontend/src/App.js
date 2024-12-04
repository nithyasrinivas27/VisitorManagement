import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisitorForm from './components/VisitorForm';
import Dashboard from './components/Dashboard';
import ApproveVisitor from './components/ApproveVisitor';
import SignIn from './auth/signin/Signin';
import SignUp from './auth/signup/Signup';
import ProtectedRoute from './auth/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protect the routes based on authentication and role */}
        <Route
          path="/"
          element={<ProtectedRoute component={Dashboard} allowedRoles={['Security', 'HR', 'Manager']} />}
        />
        <Route
          path="/add-visitor"
          element={<ProtectedRoute component={VisitorForm} allowedRoles={['Security']} />}
        />
        <Route
          path="/approve/:id"
          element={<ApproveVisitor />}
        />
      </Routes>
    </Router>
  );
};

export default App;
