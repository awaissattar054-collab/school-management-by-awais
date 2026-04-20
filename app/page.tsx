"use client"

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Search, 
  Bell, 
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  GraduationCap,
  Clock,
  Filter,
  CreditCard,
  ChevronDown,
  BrainCircuit,
  Zap,
  MoreHorizontal,
  LogOut,
  Shield,
  Palette,
  BellRing,
  Globe,
  Plus,
  User,
  BookOpen,
  PieChart as PieIcon,
  Activity,
  CalendarDays,
  Mail,
  AlertCircle,
  Info,
  Layers,
  Fingerprint,
  Cpu,
  X,
  RefreshCcw,
  Download,
  Share2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Hardcoded Demo Data ---
const demoData = {
  stats: [
    { id: 'students', title: "Total Students", value: "1,250", change: "+12%", trend: [40, 50, 45, 60, 55, 70, 65], chartTitle: "Student Enrollment Acceleration" },
    { id: 'revenue', title: "Monthly Revenue", value: "$45,000", change: "+8%", trend: [30, 35, 40, 38, 45, 48, 50], chartTitle: "Revenue Velocity Sync" },
    { id: 'attendance', title: "Avg. Attendance", value: "96.4%", change: "+2%", trend: [94, 95, 94, 96, 95, 96, 97], chartTitle: "Attendance Reliability Index" },
    { id: 'deficit', title: "Deficit Index", value: "$2,850", change: "-15%", trend: [100, 80, 60, 70, 50, 40, 30], chartTitle: "Outstanding Liability Registry" },
  ],
  attendanceTrends: {
    students: [
      { day: 'Mon', value: 1200 }, { day: 'Tue', value: 1210 }, { day: 'Wed', value: 1230 }, { day: 'Thu', value: 1245 }, { day: 'Fri', value: 1250 }
    ],
    revenue: [
      { day: 'Mon', value: 40000 }, { day: 'Tue', value: 41000 }, { day: 'Wed', value: 43000 }, { day: 'Thu', value: 44500 }, { day: 'Fri', value: 45000 }
    ],
    attendance: [
      { day: 'Mon', value: 94 }, { day: 'Tue', value: 96 }, { day: 'Wed', value: 95 }, { day: 'Thu', value: 97 }, { day: 'Fri', value: 96 }
    ],
    deficit: [
      { day: 'Mon', value: 4000 }, { day: 'Tue', value: 3800 }, { day: 'Wed', value: 3200 }, { day: 'Thu', value: 3000 }, { day: 'Fri', value: 2850 }
    ]
  },
  upcomingEvents: [
    { id: 1, title: "Executive Board Meet", date: "Oct 24", time: "10:30 AM", type: "Strategic" },
    { id: 2, title: "Science Symposium", date: "Oct 28", time: "09:00 AM", type: "Academic" },
    { id: 3, title: "Fiscal Year Audit", date: "Nov 02", time: "01:00 PM", type: "Registry" },
  ],
  notifications: [
    { id: 1, title: "System Synchronized", desc: "All school nodes are now active and verified.", type: "success" },
    { id: 2, title: "Alert: Block B Heat", desc: "Temperature anomaly detected in servers.", type: "warning" },
    { id: 3, title: "Registry Update", desc: "12 new student profiles pending verification.", type: "info" }
  ],
  students: [
    { id: "ID-900", name: "Ali Khan", grade: "10-A", parent: "Usman Khan", status: "Active" },
    { id: "ID-901", name: "Sara Ahmed", grade: "09-B", parent: "Ahmed Raza", status: "Active" },
    { id: "ID-902", name: "Zainab Malik", grade: "11-A", parent: "Malik Shah", status: "Inactive" },
    { id: "ID-903", name: "Hamza Sheikh", grade: "12-C", parent: "Sheikh Ilyas", status: "Active" },
  ]
};

// --- Base Components ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200/60 p-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)]", className)}>
    {children}
  </div>
)

const Button = ({ children, variant = 'primary', className, ...props }: any) => {
  const variants = {
    primary: "bg-[#0F172A] text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
    indigo: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-lg shadow-indigo-100"
  }
  return (
    <button className={cn("inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[11px] font-black transition-all active:scale-95 gap-2 uppercase tracking-wide", variants[variant as keyof typeof variants], className)} {...props}>
      {children}
    </button>
  )
}

const SidebarItem = ({ icon: Icon, name, active, onClick }: { icon: any, name: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-3 px-4 py-2.5 text-[11px] font-bold transition-all rounded-lg mb-1 tracking-wider uppercase",
      active 
        ? "bg-white text-slate-900 shadow-sm" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon size={14} className={cn(active ? "text-indigo-600" : "text-slate-500")} strokeWidth={2.5} />
    {name}
  </button>
)

const NotificationDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" />
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[70] p-8">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Neural Inbox</h3>
              <button onClick={onClose} className="text-slate-300 hover:text-rose-500 transition-colors"><X size={20}/></button>
           </div>
           <div className="space-y-6">
              {demoData.notifications.map(notif => (
                <div key={notif.id} className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                   <div className="flex items-center gap-3 mb-2">
                      <div className={cn("h-2 w-2 rounded-full",
                         notif.type === 'success' ? "bg-emerald-500" : "bg-orange-500"
                      )} />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{notif.title}</span>
                   </div>
                   <p className="text-xs font-medium text-slate-400 leading-relaxed italic">"{notif.desc}"</p>
                </div>
              ))}
           </div>
           <button className="absolute bottom-8 left-8 right-8 py-4 border-t border-slate-100 text-[10px] font-black text-slate-300 hover:text-indigo-600 uppercase tracking-widest text-center">Clear Local Logs</button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// --- Dashboard View ---

const DashboardOverview = () => {
  const [selectedStat, setSelectedStat] = useState(demoData.stats[2]);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {demoData.stats.map((stat) => (
          <button 
            key={stat.id}
            onClick={() => setSelectedStat(stat)}
            className={cn(
               "flex items-center justify-between p-6 rounded-xl border transition-all text-left group",
               selectedStat.id === stat.id 
                  ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200" 
                  : "bg-white border-slate-200/60 hover:border-indigo-400"
            )}
          >
            <div>
              <p className={cn("text-[9px] font-black uppercase tracking-widest", selectedStat.id === stat.id ? "text-indigo-400" : "text-slate-400")}>
                {stat.title}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <h3 className={cn("text-xl font-black tracking-tight", selectedStat.id === stat.id ? "text-white" : "text-slate-900")}>
                  {stat.value}
                </h3>
                <span className={cn("text-[9px] font-black", stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500 text-opacity-50")}>
                  {stat.change}
                </span>
              </div>
            </div>
            <Activity className={cn("opacity-20 group-hover:opacity-100 transition-opacity", selectedStat.id === stat.id ? "text-white" : "text-slate-400")} size={20} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{selectedStat.chartTitle}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Real-time Synchronization active</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Download size={14}/></button>
                  <button className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><RefreshCcw size={14}/></button>
               </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer>
                <AreaChart data={(demoData.attendanceTrends as any)[selectedStat.id]}>
                  <defs>
                    <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="day" axisLine={{stroke: '#F1F5F9'}} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 900}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
                  <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} fill="url(#gradientColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="bg-[#0F172A] text-white border-none relative overflow-hidden group">
               <Shield className="absolute -right-10 -top-10 h-40 w-40 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Security Protocol</h3>
               <p className="text-sm font-medium leading-relaxed italic">
                 "Neural synchronization for NODE-X09 establishes <span className="text-indigo-400 font-black">99.8% stability</span>. Institutional logs are encrypted at RSA-4096 standards."
               </p>
               <button className="mt-8 text-[9px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Verify System Load →</button>
            </Card>
            <Card>
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">Upcoming Board</h3>
                  <Calendar size={14} className="text-slate-300" />
               </div>
               <div className="space-y-5">
                  {demoData.upcomingEvents.map(event => (
                    <div key={event.id} className="flex gap-4 group cursor-pointer">
                       <div className="flex-none p-2 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {event.date}
                       </div>
                       <div>
                          <h4 className="text-[11px] font-bold text-slate-800 leading-none mb-1">{event.title}</h4>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{event.type} Session</span>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}

// --- List View Component ---

const ListView = ({ title, data }: any) => (
  <Card className="p-0 overflow-hidden border-none shadow-sm animate-in fade-in duration-500">
     <div className="px-8 py-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">{title} Sync Table</h3>
        <div className="flex gap-2">
           <Button variant="secondary" className="px-3 py-1.5"><Filter size={12}/> Filter</Button>
           <Button variant="secondary" className="px-3 py-1.5"><Download size={12}/> Export</Button>
        </div>
     </div>
     <table className="w-full text-left">
        <thead className="bg-[#fbfcff] border-b border-slate-100">
           <tr>
              {Object.keys(data[0]).map(key => (
                 <th key={key} className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{key}</th>
              ))}
              <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
           </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
           {data.map((row: any, i: number) => (
             <tr key={i} className="hover:bg-slate-50/50 transition-all duration-300">
                {Object.values(row).map((val: any, j: number) => (
                   <td key={j} className="px-8 py-5">
                      {val === 'Active' ? (
                         <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black tracking-widest uppercase">
                            <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
                            {val}
                         </span>
                      ) : (
                         <span className={cn("text-[11px] font-bold tracking-tight", val === row.name ? "text-slate-900" : "text-slate-500")}>
                            {val}
                         </span>
                      )}
                   </td>
                ))}
                <td className="px-8 py-5 text-right">
                   <button className="text-slate-200 hover:text-slate-400"><MoreVertical size={16}/></button>
                </td>
             </tr>
           ))}
        </tbody>
     </table>
  </Card>
)

// --- Main Layout ---

const DashboardLayout = ({ children, activeTab, setActiveTab }: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [role, setRole] = useState('Super Admin');

  return (
    <div className="flex min-h-screen bg-[#fcfdfe] font-sans selection:bg-indigo-600 selection:text-white antialiased">
       <NotificationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

       {/* Simulation Badge Overlay */}
       <div className="fixed top-5 right-8 z-[100] hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-[#0F172A] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-2xl">
          <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
          Synchronized Demo
       </div>

       {/* Sidebar */}
       <aside className="fixed left-0 top-0 hidden h-full w-72 bg-[#0F172A] p-8 lg:block z-50">
          <div className="flex items-center gap-4 mb-16 px-2">
             <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
               <GraduationCap size={24} className="text-white" strokeWidth={2.5} />
             </div>
             <div>
               <span className="block text-xl font-bold tracking-tighter text-white uppercase italic leading-none">EduSync</span>
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-1.5 block">X-Intelligence OS</span>
             </div>
          </div>

          <nav className="space-y-10 overflow-y-auto no-scrollbar h-[calc(100vh-180px)]">
             <div>
                <p className="px-5 mb-5 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Main Hub</p>
                <div className="space-y-1.5">
                   <SidebarItem icon={LayoutDashboard} name="Intelligence Overview" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                   <SidebarItem icon={TrendingUp} name="Heuristic Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
                   <SidebarItem icon={MessageSquare} name="Neural Communication" active={activeTab === 'Communication'} onClick={() => setActiveTab('Communication')} />
                </div>
             </div>

             <div>
                <p className="px-5 mb-5 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Administrative</p>
                <div className="space-y-1.5">
                   <SidebarItem icon={Users} name="Student Profiles" active={activeTab === 'Students'} onClick={() => setActiveTab('Students')} />
                   <SidebarItem icon={Calendar} name="Schedule Registry" active={activeTab === 'Schedule'} onClick={() => setActiveTab('Schedule')} />
                </div>
             </div>

             <div className="pt-6 border-t border-white/5 space-y-1.5">
                <SidebarItem icon={Shield} name="Security Protocols" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
                <SidebarItem icon={Cpu} name="System Master" active={activeTab === 'Admin'} onClick={() => setActiveTab('Admin')} />
             </div>
          </nav>
       </aside>

       {/* Main Content Area */}
       <main className="flex-1 lg:ml-72 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/50 bg-white/70 px-12 py-5 backdrop-blur-xl">
             <div className="relative w-full max-w-[28rem]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="text" 
                  placeholder="Query global repository..." 
                  className="w-full bg-slate-50 border border-transparent rounded-lg py-3 pl-12 pr-4 text-[11px] font-medium focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 outline-none transition-all"
                />
             </div>

             <div className="flex items-center gap-10 ml-4">
                <div className="flex items-center gap-6">
                   <button onClick={() => setIsDrawerOpen(true)} className="relative text-slate-400 hover:text-indigo-600 transition-colors">
                      <BellRing size={20} />
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-white bg-indigo-600" />
                   </button>
                   <div className="h-5 w-[1px] bg-slate-100" />
                   <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="text-right hidden sm:block">
                         <p className="text-[11px] font-black text-slate-900 tracking-tight leading-none uppercase italic">{role}</p>
                         <p className="text-[9px] font-black text-slate-400 mt-1.5 uppercase tracking-widest">Awais Sattar</p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=admin`} alt="user" />
                      </div>
                   </div>
                </div>
             </div>
          </header>

          <div className="p-16 max-w-[1400px] w-full mx-auto">
             <div className="mb-14 flex items-end justify-between">
                <div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{activeTab}</h2>
                   <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 w-1 bg-indigo-500 rounded-full" />
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Neural Node: X-ALPHA-SYNC-2026</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <Button variant="secondary"><Share2 size={14}/> Share Node</Button>
                   <Button variant="indigo"><Plus size={14}/> New Synchronized Record</Button>
                </div>
             </div>

             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                   {children}
                </motion.div>
             </AnimatePresence>
          </div>
       </main>
    </div>
  )
}

// --- App Root Logic ---

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-[#fcfdfe] flex flex-col items-center justify-center p-8 selection:bg-indigo-600 selection:text-white">
     <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center"
     >
        <div className="h-32 w-32 bg-[#0F172A] rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-100 mx-auto mb-14 relative group cursor-pointer transition-all duration-700 hover:rotate-6">
           <GraduationCap size={56} className="text-white" strokeWidth={2.5} />
           <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-indigo-800 rounded-[3rem] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-1000 -z-10" />
        </div>
        <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 italic select-none">
          EduSync
        </h1>
        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-lg mx-auto leading-tight italic mb-20 opacity-90">
          Autonomous Intelligence OS for Institutional Synchronization
        </p>
        
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
           <button 
             onClick={onLogin} 
             className="px-16 py-8 bg-[#0F172A] text-white rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-indigo-500/20 hover:scale-[1.02] transition-all duration-500 group"
           >
             Initialize Interface
             <ChevronRight size={22} className="inline ml-6 group-hover:translate-x-3 transition-transform duration-500" />
           </button>
        </motion.div>

        <div className="mt-32 space-y-6">
           <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-300">Phase.X System Architecture // v2.5.0</p>
           <div className="flex items-center justify-center gap-14 grayscale opacity-40">
              {['PwC Certified', 'K-12 Global', 'RSA-4096 Ready'].map(t => (
                <span key={t} className="text-[10px] font-black uppercase tracking-widest">{t}</span>
              ))}
           </div>
        </div>
     </motion.div>
  </div>
)

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => setIsLoaded(true), [])
  if (!isLoaded) return null

  if (!isLoggedIn) {
     return <LandingPage onLogin={() => setIsLoggedIn(true)} />
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <DashboardOverview />
      case 'Students': return <ListView title="Student Profiles" data={demoData.students} />
      default: return (
        <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in duration-700">
           <div className="h-20 w-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-200 mb-8"><Zap size={36}/></div>
           <h3 className="text-2xl font-black text-navy uppercase italic tracking-tight">Active Node Synchronization</h3>
           <p className="text-sm text-slate-400 mt-3 max-w-sm italic">The <span className="font-black text-indigo-600">{activeTab}</span> matrix is currently undergoing heuristic optimization in the v2.5.0 branch.</p>
           <Button variant="secondary" onClick={() => setActiveTab('Dashboard')} className="mt-12">Return to Master Cluster</Button>
        </div>
      )
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
       {renderContent()}
    </DashboardLayout>
  )
}
