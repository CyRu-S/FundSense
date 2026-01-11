import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/button';
import { MagicCard } from '@/components/react-bits/MagicCard';
import { Mail, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';

export function VerifyEmailPage() {
    const navigate = useNavigate();

    const handleVerify = () => {
        // Simulate verification API call
        // POST /api/auth/verify-email
        console.log("Verifying email...");
        setTimeout(() => {
            navigate('/onboarding/profile');
        }, 1000);
    };

    return (
        <div className="min-h-screen relative bg-transparent overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <Navbar />

            <div className="flex items-center justify-center min-h-screen px-4 pt-20">
                <MagicCard 
                    className="w-full max-w-md p-8 glass-card border-white/10 rounded-xl shadow-2xl relative z-10 text-center"
                    glowColor="59, 130, 246"
                    particleCount={20}
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                            <Mail className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
                    <p className="text-muted-foreground mb-8">
                        We've sent a verification link to your email address. Please click the link to verify your account.
                    </p>

                    <div className="space-y-4">
                        <Button 
                            onClick={handleVerify}
                            className="w-full bg-white text-primary hover:bg-white/90 font-semibold h-11"
                        >
                            Simulate Verification Link Click
                        </Button>
                        
                        <Button 
                            variant="ghost" 
                            className="w-full text-muted-foreground hover:text-white"
                        >
                            Resend Email
                        </Button>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <p className="text-xs text-muted-foreground">
                            Can't find the email? Check your spam folder or contact support.
                        </p>
                    </div>
                </MagicCard>
            </div>
        </div>
    );
}
