import { Navbar } from '@/components/common/Navbar'

export function Features() {
    return (
        <div className="min-h-screen relative">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold gradient-text mb-6">Features</h1>
                <p className="text-lg text-muted-foreground">
                    Discover the power of AI-driven investing.
                </p>
            </div>
        </div>
    )
}
