import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));

const AppRoutes = () => (
  <Suspense fallback={<CircularProgress />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
