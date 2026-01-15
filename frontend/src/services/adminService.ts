// Mock Data Types
export interface KPIStats {
    totalUsers: number;
    newUsersToday: number;
    activeInvestors: number;
    totalFunds: number;
    offersPostedToday: number;
    modelStatus: 'OK' | 'Degraded' | 'Retraining';
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'INVESTOR' | 'ANALYST';
    status: 'ACTIVE' | 'DISABLED';
    joinedDate: string;
    lastActive: string;
    verified: boolean;
}

export interface Fund {
    id: string;
    name: string;
    provider: string;
    category: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    aum: string;
    status: 'Draft' | 'Approved';
    lastUpdated: string;
}

export interface ActivityItem {
    id: string;
    type: 'user_signup' | 'fund_update' | 'offer_flagged' | 'system_alert';
    message: string;
    timestamp: string;
    severity?: 'info' | 'warning' | 'critical';
}

export interface ReviewItem {
    id: string;
    offerId: string;
    donorName: string;
    description: string;
    imageUrl: string;
    spoilageScore: number;
    confidence: number;
    flagReason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    timestamp: string;
}

export interface AIModel {
    id: string;
    name: string;
    version: string;
    status: 'Serving' | 'Training' | 'Degraded' | 'Error';
    lastTrained: string;
    accuracy: number;
    latency: string;
    driftDetected: boolean;
}

export interface AuditLog {
    id: string;
    action: string;
    user: string;
    details: string;
    ipAddress: string;
    timestamp: string;
}

export interface MatchLog {
    id: string;
    investorName: string;
    fundName: string;
    matchScore: number;
    status: 'Proposed' | 'Accepted' | 'Declined';
    date: string;
}

// Extended Mock Data for better scrolling demos
const MOCK_USERS: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2025-01-10', lastActive: '2 mins ago', verified: true },
    { id: '2', name: 'Bob Smith', email: 'bob@fundsense.com', role: 'ANALYST', status: 'ACTIVE', joinedDate: '2024-12-05', lastActive: '1 day ago', verified: true },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'INVESTOR', status: 'DISABLED', joinedDate: '2025-01-12', lastActive: 'Never', verified: false },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-11-20', lastActive: '5 hours ago', verified: true },
    { id: '5', name: 'Evan Wright', email: 'evan@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2025-01-02', lastActive: '10 mins ago', verified: true },
    { id: '6', name: 'Fiona Green', email: 'fiona@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-10-15', lastActive: '3 hours ago', verified: true },
    { id: '7', name: 'George Miller', email: 'george@example.com', role: 'ANALYST', status: 'ACTIVE', joinedDate: '2024-09-20', lastActive: '30 mins ago', verified: true },
    { id: '8', name: 'Hannah Lee', email: 'hannah@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-08-10', lastActive: '1 hour ago', verified: true },
    { id: '9', name: 'Ivan Petrov', email: 'ivan@example.com', role: 'INVESTOR', status: 'DISABLED', joinedDate: '2024-07-05', lastActive: '2 weeks ago', verified: false },
    { id: '10', name: 'Julia Chen', email: 'julia@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-06-25', lastActive: '45 mins ago', verified: true },
    { id: '11', name: 'Kevin Park', email: 'kevin@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-05-12', lastActive: '2 hours ago', verified: true },
    { id: '12', name: 'Lisa Wang', email: 'lisa@example.com', role: 'ANALYST', status: 'ACTIVE', joinedDate: '2024-04-18', lastActive: '15 mins ago', verified: true },
    { id: '13', name: 'Mike Ross', email: 'mike@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-03-22', lastActive: '1 day ago', verified: true },
    { id: '14', name: 'Nancy Drew', email: 'nancy@example.com', role: 'INVESTOR', status: 'ACTIVE', joinedDate: '2024-02-28', lastActive: '4 hours ago', verified: true },
    { id: '15', name: 'Oscar Wilde', email: 'oscar@example.com', role: 'INVESTOR', status: 'DISABLED', joinedDate: '2024-01-15', lastActive: 'Never', verified: false },
];

const MOCK_FUNDS: Fund[] = [
    { id: '101', name: 'Vanguard 500 Index', provider: 'Vanguard', category: 'Equity', riskLevel: 'High', aum: '$450M', status: 'Approved', lastUpdated: '2025-01-14' },
    { id: '102', name: 'Fidelity Total Bond', provider: 'Fidelity', category: 'Fixed Income', riskLevel: 'Low', aum: '$120M', status: 'Approved', lastUpdated: '2025-01-13' },
    { id: '103', name: 'Invesco QQQ Trust', provider: 'Invesco', category: 'Equity', riskLevel: 'High', aum: '$300M', status: 'Draft', lastUpdated: '2025-01-14' },
    { id: '104', name: 'PIMCO Income Fund', provider: 'PIMCO', category: 'Fixed Income', riskLevel: 'Medium', aum: '$85M', status: 'Approved', lastUpdated: '2025-01-10' },
    { id: '105', name: 'BlackRock Growth', provider: 'BlackRock', category: 'Equity', riskLevel: 'High', aum: '$520M', status: 'Approved', lastUpdated: '2025-01-12' },
    { id: '106', name: 'Schwab Value Index', provider: 'Schwab', category: 'Equity', riskLevel: 'Medium', aum: '$180M', status: 'Approved', lastUpdated: '2025-01-11' },
    { id: '107', name: 'T. Rowe Price Blue Chip', provider: 'T. Rowe Price', category: 'Equity', riskLevel: 'High', aum: '$290M', status: 'Draft', lastUpdated: '2025-01-09' },
    { id: '108', name: 'American Funds Growth', provider: 'American Funds', category: 'Equity', riskLevel: 'Medium', aum: '$410M', status: 'Approved', lastUpdated: '2025-01-08' },
    { id: '109', name: 'Vanguard Total Bond', provider: 'Vanguard', category: 'Fixed Income', riskLevel: 'Low', aum: '$650M', status: 'Approved', lastUpdated: '2025-01-07' },
    { id: '110', name: 'JPMorgan Equity Income', provider: 'JPMorgan', category: 'Equity', riskLevel: 'Medium', aum: '$155M', status: 'Approved', lastUpdated: '2025-01-06' },
    { id: '111', name: 'Fidelity Contrafund', provider: 'Fidelity', category: 'Equity', riskLevel: 'High', aum: '$380M', status: 'Draft', lastUpdated: '2025-01-05' },
    { id: '112', name: 'Dodge & Cox Stock', provider: 'Dodge & Cox', category: 'Equity', riskLevel: 'Medium', aum: '$230M', status: 'Approved', lastUpdated: '2025-01-04' },
];

const MOCK_STATS: KPIStats = {
    totalUsers: 14502,
    newUsersToday: 124,
    activeInvestors: 8900,
    totalFunds: 450,
    offersPostedToday: 67,
    modelStatus: 'OK'
};

const MOCK_ACTIVITY: ActivityItem[] = [
    { id: '1', type: 'system_alert', message: 'Model drift detected in Spoilage Classifier', timestamp: '10m ago', severity: 'critical' },
    { id: '2', type: 'user_signup', message: 'New investor account: John Doe', timestamp: '25m ago', severity: 'info' },
    { id: '3', type: 'offer_flagged', message: 'Offer #4058 flagged for manual review', timestamp: '1h ago', severity: 'warning' },
    { id: '4', type: 'fund_update', message: 'Vanguard 500 Index Fund updated NAV', timestamp: '2h ago', severity: 'info' },
    { id: '5', type: 'user_signup', message: 'New analyst account: Sarah Connor', timestamp: '3h ago', severity: 'info' },
    { id: '6', type: 'system_alert', message: 'Database backup completed successfully', timestamp: '4h ago', severity: 'info' },
    { id: '7', type: 'offer_flagged', message: 'High-risk investment flagged for review', timestamp: '5h ago', severity: 'warning' },
    { id: '8', type: 'fund_update', message: 'PIMCO Income Fund quarterly report added', timestamp: '6h ago', severity: 'info' },
];

const MOCK_REVIEWS: ReviewItem[] = [
    { id: '1', offerId: 'REV-1023', donorName: 'Growth Capital Partners', description: 'High-yield bond offering, potential rating concern', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.65, confidence: 0.45, flagReason: 'Low Confidence', status: 'PENDING', timestamp: '10 mins ago' },
    { id: '2', offerId: 'REV-1045', donorName: 'Apex Investment Group', description: 'Emerging market fund, volatility warning', imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.82, confidence: 0.88, flagReason: 'User Report', status: 'PENDING', timestamp: '1 hour ago' },
    { id: '3', offerId: 'REV-1089', donorName: 'Stellar Asset Management', description: 'Crypto-adjacent fund, regulatory concern', imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.95, confidence: 0.92, flagReason: 'High Risk', status: 'REJECTED', timestamp: 'Yesterday' },
    { id: '4', offerId: 'REV-1102', donorName: 'Pacific Growth Fund', description: 'Asian markets exposure, currency risk', imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.55, confidence: 0.78, flagReason: 'Compliance Check', status: 'PENDING', timestamp: '2 hours ago' },
    { id: '5', offerId: 'REV-1115', donorName: 'Verde Sustainable Fund', description: 'ESG compliance verification needed', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.30, confidence: 0.95, flagReason: 'Documentation', status: 'APPROVED', timestamp: '3 hours ago' },
    { id: '6', offerId: 'REV-1128', donorName: 'Tech Innovation Capital', description: 'Pre-IPO tech stocks, liquidity concern', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300', spoilageScore: 0.72, confidence: 0.65, flagReason: 'Risk Assessment', status: 'PENDING', timestamp: '5 hours ago' },
];

const MOCK_MODELS: AIModel[] = [
    { id: 'm1', name: 'Fund Risk Classifier', version: 'v2.4.1', status: 'Serving', lastTrained: '2025-01-10', accuracy: 94.5, latency: '45ms', driftDetected: false },
    { id: 'm2', name: 'Investment Recommender', version: 'v1.2.0', status: 'Serving', lastTrained: '2025-01-05', accuracy: 88.2, latency: '120ms', driftDetected: true },
    { id: 'm3', name: 'Market Forecaster', version: 'v3.0.1', status: 'Training', lastTrained: '2024-12-20', accuracy: 91.0, latency: '-', driftDetected: false },
    { id: 'm4', name: 'Sentiment Analyzer', version: 'v1.5.3', status: 'Serving', lastTrained: '2025-01-08', accuracy: 86.7, latency: '85ms', driftDetected: false },
    { id: 'm5', name: 'Portfolio Optimizer', version: 'v2.1.0', status: 'Serving', lastTrained: '2025-01-03', accuracy: 92.3, latency: '200ms', driftDetected: false },
    { id: 'm6', name: 'Fraud Detector', version: 'v4.0.2', status: 'Degraded', lastTrained: '2024-12-15', accuracy: 97.1, latency: '35ms', driftDetected: true },
    { id: 'm7', name: 'User Churn Predictor', version: 'v1.0.5', status: 'Serving', lastTrained: '2025-01-01', accuracy: 83.9, latency: '150ms', driftDetected: false },
];

const MOCK_LOGS: AuditLog[] = [
    { id: 'l1', action: 'USER_PROMOTION', user: 'superadmin@fundsense.com', details: 'Promoted user bob@fundsense.com to Analyst', ipAddress: '192.168.1.4', timestamp: '2025-01-14 10:30:00' },
    { id: 'l2', action: 'FUND_APPROVAL', user: 'superadmin@fundsense.com', details: 'Approved fund "Vanguard 500 Index"', ipAddress: '192.168.1.4', timestamp: '2025-01-14 09:15:22' },
    { id: 'l3', action: 'MODEL_RETRAIN', user: 'system', details: 'Triggered automatic retraining for Fund Risk Classifier', ipAddress: '10.0.0.5', timestamp: '2025-01-13 23:00:00' },
    { id: 'l4', action: 'LOGIN_FAILED', user: 'unknown', details: 'Failed login attempt for admin@test.com', ipAddress: '45.32.11.8', timestamp: '2025-01-13 18:45:00' },
    { id: 'l5', action: 'SETTINGS_CHANGE', user: 'superadmin@fundsense.com', details: 'Updated rate limiting thresholds', ipAddress: '192.168.1.4', timestamp: '2025-01-13 14:20:00' },
    { id: 'l6', action: 'USER_CREATED', user: 'analyst@fundsense.com', details: 'Created new investor account for john@example.com', ipAddress: '192.168.1.12', timestamp: '2025-01-13 11:05:00' },
    { id: 'l7', action: 'FUND_REJECTION', user: 'superadmin@fundsense.com', details: 'Rejected fund "Crypto Growth Fund" due to compliance', ipAddress: '192.168.1.4', timestamp: '2025-01-12 16:30:00' },
    { id: 'l8', action: 'API_KEY_GENERATED', user: 'system', details: 'New API key generated for external integration', ipAddress: '10.0.0.1', timestamp: '2025-01-12 09:00:00' },
    { id: 'l9', action: 'BACKUP_COMPLETED', user: 'system', details: 'Daily database backup completed successfully', ipAddress: '10.0.0.3', timestamp: '2025-01-12 03:00:00' },
    { id: 'l10', action: 'USER_DISABLED', user: 'superadmin@fundsense.com', details: 'Disabled account charlie@example.com for TOS violation', ipAddress: '192.168.1.4', timestamp: '2025-01-11 15:45:00' },
    { id: 'l11', action: 'MODEL_DEPLOYED', user: 'system', details: 'Deployed Fraud Detector v4.0.2 to production', ipAddress: '10.0.0.5', timestamp: '2025-01-11 10:30:00' },
    { id: 'l12', action: 'PERMISSION_CHANGE', user: 'superadmin@fundsense.com', details: 'Updated analyst permissions for reports access', ipAddress: '192.168.1.4', timestamp: '2025-01-10 14:15:00' },
];

const MOCK_MATCHES: MatchLog[] = [
    { id: 'm1', investorName: 'Alice Johnson', fundName: 'Vanguard 500 Index', matchScore: 0.95, status: 'Accepted', date: '2025-01-14' },
    { id: 'm2', investorName: 'Bob Smith', fundName: 'PIMCO Income Fund', matchScore: 0.88, status: 'Proposed', date: '2025-01-14' },
    { id: 'm3', investorName: 'Eve Davis', fundName: 'Invesco QQQ Trust', matchScore: 0.72, status: 'Declined', date: '2025-01-13' },
    { id: 'm4', investorName: 'Diana Prince', fundName: 'BlackRock Growth', matchScore: 0.91, status: 'Accepted', date: '2025-01-13' },
    { id: 'm5', investorName: 'Evan Wright', fundName: 'Fidelity Contrafund', matchScore: 0.85, status: 'Proposed', date: '2025-01-12' },
    { id: 'm6', investorName: 'Fiona Green', fundName: 'Schwab Value Index', matchScore: 0.79, status: 'Accepted', date: '2025-01-12' },
    { id: 'm7', investorName: 'George Miller', fundName: 'T. Rowe Price Blue Chip', matchScore: 0.67, status: 'Declined', date: '2025-01-11' },
    { id: 'm8', investorName: 'Hannah Lee', fundName: 'Vanguard Total Bond', matchScore: 0.93, status: 'Accepted', date: '2025-01-11' },
    { id: 'm9', investorName: 'Ivan Petrov', fundName: 'JPMorgan Equity Income', matchScore: 0.76, status: 'Proposed', date: '2025-01-10' },
    { id: 'm10', investorName: 'Julia Chen', fundName: 'Dodge & Cox Stock', matchScore: 0.82, status: 'Accepted', date: '2025-01-10' },
];

export const AdminService = {
    getOverviewStats: async (): Promise<KPIStats> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_STATS), 800);
        });
    },

    getRecentActivity: async (): Promise<ActivityItem[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_ACTIVITY), 500);
        });
    },

    getUsers: async (): Promise<User[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_USERS), 600);
        });
    },

    getFunds: async (): Promise<Fund[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_FUNDS), 600);
        });
    },

    getReviews: async (): Promise<ReviewItem[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_REVIEWS), 500);
        });
    },

    getModels: async (): Promise<AIModel[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_MODELS), 400);
        });
    },

    getAuditLogs: async (): Promise<AuditLog[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_LOGS), 600);
        });
    },

    getMatches: async (): Promise<MatchLog[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_MATCHES), 500);
        });
    }
};
