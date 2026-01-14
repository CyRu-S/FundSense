// Gemini AI Service for FundSense
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const SYSTEM_PROMPT = `You are FundSense AI, an expert mutual fund investment advisor. You help users with:
- Fund recommendations based on their risk profile and goals
- Explaining mutual fund concepts (NAV, SIP, ELSS, etc.)
- Portfolio analysis and suggestions
- Tax-saving investment advice
- Market insights and trends

Always provide helpful, accurate, and actionable advice. Use emojis to make responses engaging.
Format responses with bullet points and headers when appropriate.
Keep responses concise but informative (under 300 words).
If asked about specific funds, recommend real Indian mutual funds like HDFC, ICICI, SBI, Axis, Mirae Asset, etc.
Always mention that this is AI-generated advice and users should consult a financial advisor for major decisions.`

interface GeminiMessage {
    role: 'user' | 'model'
    parts: { text: string }[]
}

export async function sendMessageToGemini(
    userMessage: string,
    conversationHistory: GeminiMessage[] = []
): Promise<string> {
    console.log('API Key present:', !!GEMINI_API_KEY)
    console.log('API Key starts with:', GEMINI_API_KEY?.substring(0, 10))
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
        console.log('No valid API key found, using fallback')
        return getFallbackResponse(userMessage)
    }

    try {
        const messages: GeminiMessage[] = [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: 'model',
                parts: [{ text: "I understand. I'm FundSense AI, ready to help with mutual fund investments, recommendations, and financial advice. How can I assist you today?" }]
            },
            ...conversationHistory,
            {
                role: 'user',
                parts: [{ text: userMessage }]
            }
        ]

        console.log('Calling Gemini API...')
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: messages,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        }
                    ]
                }),
            }
        )

        console.log('Response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Gemini API error:', response.status, errorText)
            return `⚠️ API Error (${response.status}): ${errorText.substring(0, 100)}... Please check your API key.`
        }

        const data = await response.json()
        console.log('Response data:', data)

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text
        }

        if (data.error) {
            return `⚠️ API Error: ${data.error.message}`
        }

        return "I received an unexpected response. Please try again."
    } catch (error) {
        console.error('Error calling Gemini:', error)
        return `⚠️ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your internet connection.`
    }
}

// Fallback responses when API is not available
function getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm FundSense AI 🤖\n\nI can help you with:\n• Fund recommendations\n• Portfolio analysis\n• SIP and NAV explanations\n• Tax-saving investments\n\nHow can I assist you today?"
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('which fund')) {
        return "📈 **Top Fund Recommendations:**\n\n1. **HDFC Mid-Cap Opportunities** - 18.7% 5Y returns\n2. **Mirae Asset Tax Saver (ELSS)** - 17.2% returns + tax saving\n3. **Axis Bluechip Fund** - Stable large-cap option\n4. **SBI Small Cap Fund** - High risk, high reward\n\n💡 Choose based on your risk appetite!\n\n*Note: This is AI-generated advice. Consult a financial advisor for major investment decisions.*"
    }

    if (lowerMessage.includes('sip')) {
        return "📊 **SIP (Systematic Investment Plan)**\n\n✅ Benefits:\n• Rupee cost averaging\n• Disciplined investing\n• Start with just ₹500/month\n• Power of compounding\n\n💰 Example: ₹10,000/month for 10 years at 12% = ~₹23.2 lakhs!\n\n*Would you like me to calculate returns for a specific amount?*"
    }

    if (lowerMessage.includes('tax') || lowerMessage.includes('elss')) {
        return "💰 **Tax Saving with ELSS:**\n\n• Save up to ₹46,800/year (₹1.5L @ 30% slab)\n• Shortest lock-in: 3 years\n• Top ELSS funds: Mirae Asset, Axis Long Term, Canara Robeco\n\n📋 Section 80C deduction available!\n\n*Would you like personalized ELSS recommendations?*"
    }

    if (lowerMessage.includes('risk') || lowerMessage.includes('portfolio')) {
        return "🎯 **Portfolio Risk Assessment:**\n\nRecommended allocation:\n• Large Cap: 40% (stability)\n• Mid Cap: 30% (growth)\n• Small Cap: 15% (high returns)\n• Debt: 15% (safety)\n\n💡 Adjust based on age and goals!\n\n*Would you like a personalized portfolio analysis?*"
    }

    return "I'm FundSense AI! I can help with:\n\n• 📈 Fund recommendations\n• 💰 SIP calculations\n• 📊 Portfolio analysis\n• 🏦 Tax-saving tips\n\nTry asking: 'Recommend funds for me' or 'Explain SIP'\n\n*How can I assist you today?*"
}

export function convertToGeminiHistory(messages: { type: 'user' | 'ai', content: string }[]): GeminiMessage[] {
    return messages.slice(1).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }))
}
