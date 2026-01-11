import { Navbar } from '@/components/common/Navbar'

export function FAQ() {
    return (
        <div className="min-h-screen relative">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold gradient-text mb-6">Frequently Asked Questions</h1>
                <p className="text-lg text-muted-foreground">
                    Find answers to common questions.
                </p>
            </div>
        </div>
    )
}
