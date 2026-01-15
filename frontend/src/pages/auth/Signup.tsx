import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form'
import { useNavigate, Link } from 'react-router-dom'
import { Check, Wallet } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/helpers'
import { MagicCard } from '@/components/react-bits/MagicCard'
import { toast } from '@/components/common/Toaster'

// Validation Schema
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Minimum 8 characters")
        .regex(/[A-Z]/, "At least 1 uppercase letter")
        .regex(/[0-9]/, "At least 1 numeric digit"),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select a country"),
    termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
    // Optional Fields
    phone: z.string().optional(),
    profession: z.string().optional(),
    ageRange: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export function RegisterPage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { 
            name: '', 
            username: '',
            email: '', 
            password: '', 
            confirmPassword: '', 
            country: '',
            termsAccepted: false,
            phone: '',
            profession: '',
            ageRange: ''
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    roles: ["investor"],
                    country: values.country,
                    termsAccepted: values.termsAccepted,
                    phone: values.phone,
                    profession: values.profession,
                    ageRange: values.ageRange
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            toast.success('Account created!', 'Please sign in with your credentials.')
            navigate('/login')
        } catch (error) {
            toast.error('Registration Failed', error instanceof Error ? error.message : 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const password = form.watch("password");

    const PasswordStrength = ({ password }: { password: string }) => {
        if (!password) return null;
        const checks = [
            { label: "8+ chars", valid: password.length >= 8 },
            { label: "Uppercase", valid: /[A-Z]/.test(password) },
            { label: "Number", valid: /[0-9]/.test(password) },
        ];
        return (
            <div className="flex gap-2 text-xs mt-1">
                {checks.map((check, i) => (
                    <span key={i} className={cn("flex items-center gap-1", check.valid ? "text-green-400" : "text-gray-500")}>
                         {check.valid ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-gray-500" />} {check.label}
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden px-4 py-12 bg-transparent">
             {/* Background Elements */}
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <MagicCard 
                className="w-full max-w-xl p-8 glass-card border-white/10 rounded-xl shadow-2xl relative z-10"
                glowColor="59, 130, 246"
                particleCount={20}
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl mb-3 shadow-lg shadow-blue-500/30">
                        <Wallet className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join FundSense and start your investment journey</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        
                        <div className="space-y-3">
                            {/* Mandatory Fields */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-10" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-10" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@example.com" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-10" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-10" />
                                            </FormControl>
                                            <PasswordStrength password={field.value} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 h-10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <select 
                                                {...field}
                                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder:text-white/20"
                                            >
                                                <option value="" disabled>Select Country</option>
                                                <option value="us" className="bg-gray-900">United States</option>
                                                <option value="in" className="bg-gray-900">India</option>
                                                <option value="uk" className="bg-gray-900">United Kingdom</option>
                                                <option value="ca" className="bg-gray-900">Canada</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Optional Fields - Always Visible */}
                            <div className="pt-3 border-t border-white/5">
                                <p className="text-xs text-muted-foreground mb-3">Additional Information</p>
                                
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="mb-3">
                                            <FormLabel className="flex items-center gap-2">
                                                Phone Number
                                                <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 234 567 890" {...field} className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="profession"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    Profession
                                                    <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <select 
                                                        {...field}
                                                        className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder:text-white/20"
                                                    >
                                                        <option value="" className="bg-gray-900">Select</option>
                                                        <option value="student" className="bg-gray-900">Student</option>
                                                        <option value="engineer" className="bg-gray-900">Engineer</option>
                                                        <option value="business" className="bg-gray-900">Business</option>
                                                        <option value="finance" className="bg-gray-900">Finance</option>
                                                        <option value="retired" className="bg-gray-900">Retired</option>
                                                        <option value="other" className="bg-gray-900">Other</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ageRange"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    Age Range
                                                    <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <select 
                                                        {...field}
                                                        className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder:text-white/20"
                                                    >
                                                        <option value="" className="bg-gray-900">Select</option>
                                                        <option value="18-25" className="bg-gray-900">18-25</option>
                                                        <option value="26-35" className="bg-gray-900">26-35</option>
                                                        <option value="36-45" className="bg-gray-900">36-45</option>
                                                        <option value="46+" className="bg-gray-900">46+</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="termsAccepted"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-offset-0 focus:ring-primary/50"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal text-muted-foreground">
                                                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full h-11 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 mt-4" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>
                </Form>
                
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors">Sign in</Link>
                </div>
            </MagicCard>
        </div>
    )
}
