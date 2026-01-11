import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { lazy, Suspense } from 'react'
import App from './App' // Wait, App is the provider?

// This might need adjustment. Usually routes.tsx returns an array of routes or a Router object.
// The user has App.jsx AND routes.jsx.
// I'll assume routes.tsx exports the route configuration.

const LandingPage = lazy(() => import('../pages/public/Home').then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('../pages/auth/Login').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('../pages/auth/Signup').then(m => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('../pages/user/Dashboard').then(m => ({ default: m.DashboardPage })))

// Placeholder imports
const About = lazy(() => import('../pages/public/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('../pages/public/Contact').then(m => ({ default: m.Contact })))

export const routes = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            // Add other protected routes here
        ]
    }
]
