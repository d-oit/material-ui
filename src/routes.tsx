import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));
const Links = lazy(() => import('./pages/Links'));
const Search = lazy(() => import('./pages/Search'));
const Offline = lazy(() => import('./pages/Offline'));
const Auth = lazy(() => import('./pages/Auth'));
const Theme = lazy(() => import('./pages/Theme'));

const AppRoutes = () => (
  <Suspense fallback={<CircularProgress />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/links" element={<Links />} />
      <Route path="/search" element={<Search />} />
      <Route path="/offline" element={<Offline />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/theme" element={<Theme />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
