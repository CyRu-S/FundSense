
import React, { useEffect, useState } from 'react';
import { AdminService, type User } from '../../services/adminService';
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    UserPlus,
    CheckCircle,
    XCircle,
    Shield
} from 'lucide-react';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

export const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('ALL');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await AdminService.getUsers();
                setUsers(data || []);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role: User['role']) => {
        switch (role) {
            case 'ADMIN': return <span className="px-2 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Admin</span>;
            case 'ANALYST': return <span className="px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Analyst</span>;
            default: return <span className="px-2 py-1 text-xs font-semibold bg-slate-500/20 text-slate-300 rounded-full border border-slate-500/30">Investor</span>;
        }
    };

    const getStatusBadge = (status: User['status']) => {
        return status === 'ACTIVE'
            ? <span className="flex items-center gap-1 text-xs font-medium text-emerald-400"><CheckCircle className="w-3 h-3" /> Active</span>
            : <span className="flex items-center gap-1 text-xs font-medium text-slate-500"><XCircle className="w-3 h-3" /> Disabled</span>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                    <p className="text-slate-400 text-sm">View and manage user accounts and permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                        <UserPlus className="w-4 h-4" />
                        Invite User
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <MagicCard 
                className="p-4 rounded-xl glass-card flex flex-col sm:flex-row gap-4 items-center justify-between"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-slate-500"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
                        <Filter className="w-4 h-4" />
                        <span>Filter:</span>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="bg-transparent font-medium text-white outline-none cursor-pointer [&>option]:bg-slate-900"
                        >
                            <option value="ALL">All Roles</option>
                            <option value="INVESTOR">Investors</option>
                            <option value="ANALYST">Analysts</option>
                            <option value="ADMIN">Admins</option>
                        </select>
                    </div>
                </div>
            </MagicCard>

            {/* Table */}
            <MagicCard 
                className="rounded-xl glass-card overflow-hidden"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-white/5 border-b border-white/10 text-slate-200 sticky top-0">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Verified</th>
                                <th className="px-6 py-4 font-semibold">Joined</th>
                                <th className="px-6 py-4 font-semibold">Last Active</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-300 border border-white/10">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{user.name}</p>
                                                    <p className="text-slate-500 text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(user.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.verified ? (
                                                <Shield className="w-4 h-4 text-emerald-500" xlinkTitle="Verified Identity" />
                                            ) : (
                                                <span className="text-slate-600">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                            {user.joinedDate}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                            {user.lastActive}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        No users found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-slate-400">
                    <p>Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries</p>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 bg-white/5 border border-white/10 rounded-md disabled:opacity-30 hover:bg-white/10 text-white transition-colors">Previous</button>
                        <button disabled className="px-3 py-1 bg-white/5 border border-white/10 rounded-md disabled:opacity-30 hover:bg-white/10 text-white transition-colors">Next</button>
                    </div>
                </div>
            </MagicCard>
        </div>
    );
};
