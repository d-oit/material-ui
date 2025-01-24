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
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/link-details" element={<LinkDetails />} />
            <Route path="/categories" element={<CategoriesManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/empty-states" element={<EmptyStates />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
