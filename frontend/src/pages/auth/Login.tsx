import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from '@/components/common/Navbar'
import { TrendingUp, ArrowLeft } from 'lucide-react'
import { MagicCard } from '@/components/react-bits/MagicCard'

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginPage() {
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log("Logging in with", values)
        setTimeout(() => {
            login({
                id: '1',
                name: 'Demo Investor',
                email: values.email,
                role: 'investor'
            }, 'mock-jwt-token-123')
            navigate('/dashboard')
        }, 500)
    }

    const handleGoogleLogin = () => {
        console.log("Google Login Clicked");
    };

    return (
        <div className="min-h-screen relative bg-transparent">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20" />
            </div>

            <Navbar />

            <div className="flex items-center justify-center min-h-screen px-4 pt-20">
                <MagicCard 
                    className="w-full max-w-md p-8 glass-card rounded-xl shadow-2xl relative z-10"
                    glowColor="59, 130, 246"
                    particleCount={20}
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-primary p-3 rounded-full mb-3 shadow-lg shadow-primary/50">
                            <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            FundSense
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">Intelligent Investment Platform</p>
                    </div>

                    <h3 className="text-xl font-semibold text-white text-center mb-6">Welcome Back</h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="name@example.com"
                                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
                                Sign In
                            </Button>
                        </form>
                    </Form>

                    <div className="relative mb-8 mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent backdrop-blur-xl px-2 text-muted-foreground px-4 py-1 rounded-full border border-white/5">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full py-2.5 flex items-center justify-center gap-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all hover:scale-[1.02]"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26::4.81 4.94z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="flex flex-col gap-4 mt-6">
                        <div className="text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-400 hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                        <Link to="/" className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-1 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to home
                        </Link>
                    </div>
                </MagicCard>
            </div>
        </div>
    )
}
