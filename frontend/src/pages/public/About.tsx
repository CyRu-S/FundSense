import { Navbar } from '@/components/common/Navbar'

export function About() {
    return (
        <div className="min-h-screen relative">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold gradient-text mb-6">About FundSense</h1>
                <p className="text-lg text-muted-foreground">
                    We are dedicated to democratizing AI-powered investing for everyone.
                </p>
            </div>
        </div>
    )
}
