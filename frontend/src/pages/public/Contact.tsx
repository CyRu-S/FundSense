import { Navbar } from '@/components/common/Navbar'

export function Contact() {
    return (
        <div className="min-h-screen relative">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold gradient-text mb-6">Contact Us</h1>
                <p className="text-lg text-muted-foreground">
                    Get in touch with our team for support or inquiries.
                </p>
            </div>
        </div>
    )
}
