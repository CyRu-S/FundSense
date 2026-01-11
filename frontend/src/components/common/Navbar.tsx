import { Link } from 'react-router-dom'
import { TrendingUp, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store'
import { Button } from '@/components/common/button'
import GlassSurface from '@/components/react-bits/GlassSurface'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated, user, logout } = useAuthStore()

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'Explore Funds', href: '/funds' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'FAQ', href: '#faq' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <GlassSurface
                    width="100%"
                    height={80}
                    borderRadius={24}
                    borderWidth={0}
                    opacity={0.4}
                    brightness={100}
                    blur={20}
                    className="flex items-center justify-between px-6"
                    mixBlendMode="normal"
                >
                    <div className="flex items-center justify-between w-full h-full">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="FundSense" className="h-10 w-auto object-contain" />
                            <span className="font-bold text-lg hidden md:block">FundSense</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <span className="text-sm text-foreground/80 font-medium">
                                        {user?.name}
                                    </span>
                                    <Button variant="outline" size="sm" onClick={logout} className="border-white/20 hover:bg-white/10">
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm" className="hover:bg-white/10">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button size="sm" className="bg-white text-background hover:bg-white/90 shadow-lg">
                                            Sign up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-foreground"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </GlassSurface>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mt-2 glass-card p-4 md:hidden">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="border-t border-border pt-4 flex flex-col gap-2">
                                <Link to="/login">
                                    <Button variant="ghost" className="w-full">Log in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="w-full bg-white text-background">Sign up</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
