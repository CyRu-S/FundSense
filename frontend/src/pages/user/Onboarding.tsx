import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/button';
import { MagicCard } from '@/components/react-bits/MagicCard';
import { Navbar } from '@/components/common/Navbar';
import { ChevronRight, ChevronLeft, CheckCircle2, Brain } from 'lucide-react';
import { Input } from '@/components/common/input';

// Steps
const STEPS = [
    { id: 1, title: 'Profile' },
    { id: 2, title: 'Risk Survey' },
    { id: 3, title: 'Analysis' }
];

export function OnboardingPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Finish
            setIsLoading(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen relative bg-transparent overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-12 relative z-10">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step.id <= currentStep ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-gray-800 text-gray-500'}`}>
                                {step.id < currentStep ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                            </div>
                            <span className={`text-sm mt-2 font-medium ${step.id <= currentStep ? 'text-white' : 'text-gray-600'}`}>{step.title}</span>
                        </div>
                    ))}
                    {/* Progress Bar Line */}
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-800 -z-10">
                        <div 
                            className="h-full bg-primary transition-all duration-500 ease-in-out" 
                            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} 
                        />
                    </div>
                </div>

                <MagicCard 
                    className="w-full min-h-[400px] p-8 glass-card border-white/10 rounded-xl shadow-2xl relative z-10"
                    glowColor="59, 130, 246"
                    particleCount={15}
                >
                    {currentStep === 1 && <ProfileStep onNext={handleNext} />}
                    {currentStep === 2 && <SurveyStep onNext={handleNext} onBack={handleBack} />}
                    {currentStep === 3 && <AIStep />}
                </MagicCard>
            </div>
        </div>
    );
}

function ProfileStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
                <p className="text-muted-foreground">Help us know you better to personalize your experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Date of Birth</label>
                    <Input type="date" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Gender</label>
                    <select className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent">
                        <option value="" disabled selected>Select</option>
                        <option value="male" className="bg-gray-900">Male</option>
                        <option value="female" className="bg-gray-900">Female</option>
                        <option value="other" className="bg-gray-900">Other</option>
                    </select>
                </div>
                 <div className="space-y-2">
                    <label className="text-white text-sm font-medium">City</label>
                    <Input placeholder="New York" className="bg-white/5 border-white/10 text-white" />
                </div>
                 <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Postal Code</label>
                    <Input placeholder="10001" className="bg-white/5 border-white/10 text-white" />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white gap-2">
                    Next Step <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

function SurveyStep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Investment Profile</h2>
                <p className="text-muted-foreground">Understanding your goals helps our AI tailor recommendations.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-white text-lg font-medium">What is your primary investment goal?</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Wealth Creation', 'Steady Income', 'Tax Saving'].map(goal => (
                            <div key={goal} className="border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all text-center text-sm font-medium text-gray-300 hover:text-white">
                                {goal}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-white text-lg font-medium">Investment Horizon (Years)</label>
                    <div className="px-2 pt-4 pb-2">
                         <input 
                            type="range" 
                            min="1" 
                            max="30" 
                            defaultValue="5" 
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                         />
                         <div className="flex justify-between text-xs text-muted-foreground mt-2">
                             <span>1 Year</span>
                             <span>15 Years</span>
                             <span>30 Years</span>
                         </div>
                    </div>
                </div>

                 <div className="space-y-3">
                    <label className="text-white text-lg font-medium">Risk Tolerance</label>
                     <div className="grid grid-cols-3 gap-4">
                        {['Low', 'Moderate', 'High'].map(risk => (
                            <div key={risk} className="border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/5 hover:border-primary/50 transition-all text-center text-sm font-medium text-gray-300 hover:text-white">
                                {risk}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack} className="border-white/10 text-white hover:bg-white/5 gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white gap-2">
                    Analyze Profile <Brain className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

function AIStep() {
    // Auto-redirect handled by parent
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center animate-pulse">
                    <Brain className="w-16 h-16 text-primary animate-bounce" />
                </div>
                <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
            </div>
            
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">AI Analysis in Progress</h2>
                <p className="text-muted-foreground max-w-sm">
                    Our AI is analyzing your profile to generate personalized portfolio recommendations...
                </p>
            </div>

            <div className="space-y-2 w-full max-w-xs text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Analyzing Risk Profile</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Clustering Investor Segment</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-transparent animate-spin" />
                    <span>Generating Fund Recommendations</span>
                </div>
            </div>
        </div>
    );
}
