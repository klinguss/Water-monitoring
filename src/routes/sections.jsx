import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// Lazy-loaded components
const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const ChatPage = lazy(() => import('src/pages/chat'));
const LoginPage = lazy(() => import('src/pages/login'));
const SignupPage = lazy(() => import('src/pages/signup'));
const MapPage = lazy(() => import('src/pages/map'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

// Protected component
const Protected = () => {
  // Here, you can check if the user is authenticated, if not, navigate to login page
  // For demonstration purposes, let's assume isAuthenticated is a boolean flag
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Protected />,
      children: [
        { index: true, element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'map', element: <MapPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'Chat', element: <ChatPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'chat',
      element: <ChatPage />,
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
