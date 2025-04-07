import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Loader } from 'lucide-react';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserDetails = lazy(() => import('./pages/UserDetails'));
const ExampleForm = lazy(() => import('./pages/ExampleForm'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
      <Loader className="h-6 w-6 animate-spin text-indigo-600" />
      <span className="text-gray-700 font-medium">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/user/:id" element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            } />
            <Route path="/form" element={
              <ProtectedRoute>
                <ExampleForm />
              </ProtectedRoute>
            } />
            <Route path="/404" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;