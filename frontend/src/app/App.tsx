import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import FloatingLines from '@/components/react-bits/FloatingLines'
import ClickSpark from '@/components/react-bits/ClickSpark'
import { AIChatWidget } from '@/components/ai/AIChatWidget'
import { Toaster } from '@/components/common/Toaster'

// Lazy load pages for better performance
const LandingPage = lazy(() => import('../pages/public/Home').then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('../pages/auth/Login').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('../pages/auth/Signup').then(m => ({ default: m.RegisterPage })))
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmail').then(m => ({ default: m.VerifyEmailPage })))
const OnboardingPage = lazy(() => import('@/pages/user/Onboarding').then(m => ({ default: m.OnboardingPage })))
const DashboardPage = lazy(() => import('../pages/user/Dashboard').then(m => ({ default: m.DashboardPage })))
const PaymentsPage = lazy(() => import('../pages/user/Payments').then(m => ({ default: m.PaymentsPage })))
const InsightsPage = lazy(() => import('../pages/user/Insights').then(m => ({ default: m.InsightsPage })))
const InvestmentsPage = lazy(() => import('../pages/user/Investments').then(m => ({ default: m.InvestmentsPage })))
const InboxPage = lazy(() => import('../pages/user/Inbox').then(m => ({ default: m.InboxPage })))
const FundExplorerPage = lazy(() => import('../pages/user/FundExplorer').then(m => ({ default: m.FundExplorerPage })))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen w-full">
        <div className="fixed inset-0 z-0">
          <FloatingLines
            enabledWaves={["top", "bottom", "middle"]}
            lineDistance={20}
            bendRadius={20}
            bendStrength={3}
          />
          <ClickSpark
            sparkColor='#3b82f6'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          />
        </div>
        <div className="relative z-10 w-full">
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/onboarding/verify-email" element={<VerifyEmailPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/onboarding/profile" element={<OnboardingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/payments" element={<PaymentsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="/inbox" element={<InboxPage />} />
                  <Route path="/funds" element={<FundExplorerPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
        <Toaster />
        <AIChatWidget />
      </div>
    </QueryClientProvider>
  )
}

export default App
