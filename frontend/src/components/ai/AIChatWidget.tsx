import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, TrendingUp, PiggyBank, Shield, Loader2 } from 'lucide-react'
import { MagicCard } from '@/components/react-bits/MagicCard'
import { Button } from '@/components/common/button'
import { sendMessageToGemini, convertToGeminiHistory } from '@/services/geminiService'

interface Message {
    id: number
    type: 'user' | 'ai'
    content: string
    timestamp: Date
}

const quickActions = [
    { label: 'Recommend funds for me', icon: TrendingUp },
    { label: 'Analyze my portfolio risk', icon: Shield },
    { label: 'Explain SIP investing', icon: PiggyBank },
    { label: 'Tax saving with ELSS', icon: Sparkles },
]

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'ai',
            content: "Hello! I'm FundSense AI 🤖\n\nI can help you with fund recommendations, portfolio analysis, and answering your investment questions.\n\nHow can I assist you today?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = async (text?: string) => {
        const messageText = text || inputValue.trim()
        if (!messageText || isTyping) return

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            type: 'user',
            content: messageText,
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        try {
            // Get conversation history for context
            const history = convertToGeminiHistory(messages)

            // Get AI response from Gemini
            const response = await sendMessageToGemini(messageText, history)

            // Add AI response
            const aiMessage: Message = {
                id: Date.now() + 1,
                type: 'ai',
                content: response,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Error getting AI response:', error)
            const errorMessage: Message = {
                id: Date.now() + 1,
                type: 'ai',
                content: "I'm sorry, I encountered an error. Please try again.",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
                        ? 'bg-slate-800 rotate-0'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                    }`}
                style={{ animation: isOpen ? 'none' : 'pulse 2s infinite' }}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[400px] h-[560px] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Header - Fixed Height */}
                    <div className="h-[72px] bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">FundSense AI</h3>
                            <p className="text-blue-100 text-xs flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Powered by Gemini
                            </p>
                        </div>
                    </div>

                    {/* Messages - Scrollable Area with Fixed Height */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-scroll p-4 space-y-4 bg-slate-900"
                        style={{ height: 'calc(560px - 72px - 72px)', minHeight: 0 }}
                    >
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.type === 'ai'
                                        ? 'bg-blue-600/20'
                                        : 'bg-slate-700'
                                    }`}>
                                    {message.type === 'ai' ? (
                                        <Bot className="w-4 h-4 text-blue-400" />
                                    ) : (
                                        <User className="w-4 h-4 text-slate-400" />
                                    )}
                                </div>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.type === 'ai'
                                        ? 'bg-slate-800 text-white'
                                        : 'bg-blue-600 text-white'
                                    }`}>
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                    <span className="text-sm text-slate-400">Thinking...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions - Conditional */}
                    {messages.length <= 2 && !isTyping && (
                        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
                            <p className="text-xs text-slate-500 mb-2">Quick actions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickActions.map(action => (
                                    <button
                                        key={action.label}
                                        onClick={() => handleSend(action.label)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-white transition-colors border border-slate-700"
                                    >
                                        <action.icon className="w-3 h-3 text-blue-400" />
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input - Fixed Height */}
                    <div className="h-[72px] p-4 border-t border-slate-700 bg-slate-900">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about funds..."
                                disabled={isTyping}
                                className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                            />
                            <Button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
