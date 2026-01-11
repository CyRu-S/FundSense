import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 border-r border-border/40 md:pr-12">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="FundSense" className="h-8 w-auto object-contain" />
                            <span className="font-bold text-xl">FundSense</span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6">
                            Empowering investors with AI-driven insights for smarter wealth generation.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/funds" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Funds</Link></li>
                            <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="col-span-1">
                        <h4 className="font-semibold mb-4">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to our newsletter for the latest market insights.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-background/50" />
                            <Button size="icon" className="shrink-0">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2024 FundSense Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-foreground">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
