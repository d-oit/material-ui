import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import LinkDetails from './components/LinkDetails';
import CategoriesManagement from './components/CategoriesManagement';
import SettingsPage from './components/SettingsPage';
import SignIn from './pages/SignIn';
import AuthCallback from './pages/AuthCallback';
import EmptyStates from './components/EmptyStates';
import NotFound from './components/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="link-details" element={<LinkDetails />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="empty-states" element={<EmptyStates />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
