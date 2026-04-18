"use client"

import React, { useState } from 'react'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Search, 
  Bell, 
  Smile, 
  AlertTriangle, 
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  MessageSquare,
  Settings,
  MoreVertical
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock Data
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 5500 },
  { name: 'Mar', value: 4800 },
  { name: 'Apr', value: 7000 },
  { name: 'May', value: 9000 },
  { name: 'Jun', value: 12500 },
]

const attendanceData = [
  { name: 'Mon', value: 94 },
  { name: 'Tue', value: 92 },
  { name: 'Wed', value: 96 },
  { name: 'Thu', value: 88 },
  { name: 'Fri', value: 95 },
]

const sentimentData = [
  { name: 'Happy', value: 65, color: '#6366f1' },
  { name: 'Neutral', value: 25, color: '#94a3b8' },
  { name: 'Sad', value: 10, color: '#f43f5e' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white p-6 lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">EduAdmin AI</span>
        </div>

        <nav className="space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Students', icon: Users },
            { name: 'Attendance', icon: Calendar },
            { name: 'Fees', icon: Wallet },
            { name: 'Messages', icon: MessageSquare },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === item.name 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-6 right-6">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
            <h4 className="font-semibold">Upgrade to Pro</h4>
            <p className="mt-1 text-xs opacity-80">Access advanced AI predictive student analytics.</p>
            <button className="mt-3 w-full rounded-lg bg-white/20 py-2 text-xs font-semibold backdrop-blur-sm transition-hover hover:bg-white/30">
              Go Premium
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Navbar */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search students, records, or fees..." 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 outline-none transition-focus focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-hover hover:bg-slate-50">
                <Bell size={20} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500"></span>
              </button>
              <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-indigo-100 shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
              <p className="mt-1 text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-hover hover:bg-slate-50">
                Export Data
              </button>
              <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95">
                Generate Report
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total Students', value: '1,284', grow: '+12%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Monthly Revenue', value: '$12,500', grow: '+8.4%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Attendance Rate', value: '94.2%', grow: '-2%', icon: Calendar, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Pending Fees', value: '$4,280', grow: '+5%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-2xl ${stat.bg} ${stat.color} p-3 transition-transform group-hover:scale-110`}>
                    <stat.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold ${stat.grow.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.grow}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Revenue Growth</h3>
                  <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm outline-none">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Student Sentiment Detail */}
            <div className="lg:col-span-1">
              <div className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold">AI Sentiment Tracker</h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={20} />
                  </button>
                </div>
                
                <div className="mb-8 flex flex-col items-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex gap-4">
                    {sentimentData.map(item => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-medium text-slate-500">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-hover hover:bg-slate-100/80">
                    <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
                      <Smile size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold">Overall Happiness</h4>
                      <p className="text-xs text-slate-500">Student moral is up 4% this week.</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-hover hover:bg-slate-100/80">
                    <div className="rounded-xl bg-rose-100 p-2 text-rose-600">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold">Critical Alerts</h4>
                      <p className="text-xs text-slate-500">3 students require counselor attention.</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
             {/* Counselor Alerts */}
             <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold">Counselor Intervention Panel</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Bob Smith', reason: 'Sentiment score dropped by 22 pts', type: 'High Risk', color: 'rose' },
                    { name: 'Evan Wright', reason: 'Attendance below 70%', type: 'Academic Risk', color: 'amber' },
                    { name: 'Charlie Brown', reason: 'Repeated late arrivals', type: 'Warning', color: 'blue' },
                  ].map((alert, i) => (
                    <div key={alert.name} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-hover hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className={`h-1.5 w-1.5 rounded-full bg-${alert.color}-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]`}></div>
                        <div>
                          <h4 className="text-sm font-bold">{alert.name}</h4>
                          <p className="text-xs text-slate-500">{alert.reason}</p>
                        </div>
                      </div>
                      <span className={`rounded-lg bg-${alert.color}-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-${alert.color}-600`}>
                        {alert.type}
                      </span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Recent Activities */}
             <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold">Recent Activities</h3>
                <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:h-[80%] before:w-0.5 before:bg-slate-100">
                  {[
                    { user: 'Admin', act: 'Generated Monthly Report', time: '12 min ago', icon: LayoutDashboard },
                    { user: 'System', act: 'Fee Notification Sent to Alice', time: '1h ago', icon: Wallet },
                    { user: 'Teacher', act: 'Marked Charlie Absent', time: '3h ago', icon: Calendar },
                  ].map((act, i) => (
                    <div key={i} className="relative flex items-center gap-4 pl-8">
                      <div className="absolute left-0 rounded-full border-4 border-white bg-indigo-600 p-1.5 text-white ring-1 ring-slate-100">
                        <act.icon size={12} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{act.act}</h4>
                        <p className="text-xs text-slate-500">{act.user} • {act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
