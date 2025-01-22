import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import LinkDetails from './components/LinkDetails';
import CategoriesManagement from './components/CategoriesManagement';
import SettingsPage from './components/SettingsPage';
import SignIn from './components/SignIn';
import EmptyStates from './components/EmptyStates';
import NotFound from './components/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/link-details"
            element={<ProtectedRoute component={LinkDetails} />}
          />
          <Route
            path="/categories"
            element={<ProtectedRoute component={CategoriesManagement} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute component={SettingsPage} />}
          />
          <Route
            path="/empty-states"
            element={<ProtectedRoute component={EmptyStates} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
