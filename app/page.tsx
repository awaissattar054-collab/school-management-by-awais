"use client"

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  Bell, 
  Search, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
  Plus,
  Map as MapIcon,
  UserCheck,
  Briefcase
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Hardcoded Demo Data ---
const demoData = {
  students: [
    { id: "S1023", name: "Emma Johnson", grade: "Grade 2", status: "Present", age: 7, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
    { id: "S0987", name: "Liam Carter", grade: "Grade 1", status: "Absent", age: 6, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" },
    { id: "S1145", name: "Sophia Lee", grade: "Grade 3", status: "On Leave", age: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" },
    { id: "S1023", name: "Noah Williams", grade: "Grade 1", status: "Present", age: 7, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah" },
    { id: "S1145", name: "Mia Brown", grade: "Grade 2", status: "Present", age: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" },
    { id: "S0987", name: "Lucas Anderson", grade: "Grade 2", status: "Present", age: 7, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" },
  ],
  classroomMap: [
    { name: "Class 1A", type: "Active" }, { name: "Class 1B", type: "Empty" },
    { name: "Class 2A", type: "Active" }, { name: "Class 2B", type: "Empty" },
  ],
  infrastructure: [
    { name: "Class 1A", type: "Active" }, { name: "Class 2B", type: "Active" },
    { name: "Teacher's Lounge", type: "Utility" }, { name: "Main Office", type: "Admin" },
  ]
};

// --- Neumorphic Components ---

const NeuCard = ({ children, className, variant = 'flat' }: { children: React.ReactNode, className?: string, variant?: 'flat' | 'inset' | 'convex' }) => (
  <div className={cn(
    "rounded-[30px] p-6",
    variant === 'flat' && "neu-flat",
    variant === 'inset' && "neu-inset",
    variant === 'convex' && "neu-convex",
    className
  )}>
    {children}
  </div>
)

const NeuButton = ({ children, variant = 'default', className, ...props }: any) => {
  return (
    <button className={cn(
      "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all active:scale-95 gap-2",
      variant === 'default' && "neu-button text-[#5a7194]",
      variant === 'emerald' && "neu-button-emerald",
      className
    )} {...props}>
      {children}
    </button>
  )
}

const SidebarItem = ({ icon: Icon, name, active, onClick }: { icon: any, name: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-4 px-6 py-4 rounded-2xl transition-all mb-2",
      active 
        ? "neu-inset text-emerald-600 bg-white/10" 
        : "text-[#5a7194] hover:bg-white/5"
    )}
  >
    <div className={cn("p-2 rounded-xl", active ? "neu-flat bg-white" : "neu-inset")}>
       <Icon size={18} strokeWidth={2.5} />
    </div>
    <span className="font-bold text-sm">{name}</span>
  </button>
)

// --- Page Layouts ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Student Records')
  const [dbStudents, setDbStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('/api/students')
        const data = await res.json()
        if (data.length > 0) setDbStudents(data)
      } catch (e) { console.error(e) }
      finally { setIsLoading(false) }
    }
    fetchAll()
  }, [])

  const displayStudents = dbStudents.length > 0 ? dbStudents : demoData.students

  return (
    <div className="flex min-h-screen p-6 gap-8 select-none">
       {/* Sidebar */}
       <aside className="w-80 flex flex-col">
          <NeuCard className="flex-1 flex flex-col rounded-[40px]">
             <div className="flex items-center gap-3 mb-12 px-2">
                <div className="h-12 w-12 neu-convex rounded-2xl flex items-center justify-center">
                   <GraduationCap size={28} className="text-emerald-600" />
                </div>
                <h1 className="text-xl font-black text-[#31456a] leading-tight">School Management<br/><span className="text-emerald-600">System</span></h1>
             </div>

             <nav className="flex-1">
                <SidebarItem icon={Users} name="Student Records" active={activeTab === 'Student Records'} onClick={() => setActiveTab('Student Records')} />
                <SidebarItem icon={Briefcase} name="Staff Directory" active={activeTab === 'Staff Directory'} onClick={() => setActiveTab('Staff Directory')} />
                <SidebarItem icon={Wallet} name="Finance" active={activeTab === 'Finance'} onClick={() => setActiveTab('Finance')} />
             </nav>

             <div className="mt-auto pt-8 space-y-6">
                <NeuCard variant="inset" className="flex items-center gap-4 py-4 px-4 rounded-3xl">
                   <div className="h-12 w-12 rounded-full neu-flat overflow-hidden border-2 border-white/50">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="admin" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-[#31456a]">Admin</p>
                      <p className="text-[10px] text-[#5a7194] font-medium uppercase tracking-widest">Administrator</p>
                   </div>
                </NeuCard>
                <NeuButton className="w-full py-4 text-rose-500 rounded-3xl">
                   <LogOut size={18} /> Logout
                </NeuButton>
             </div>
          </NeuCard>
       </aside>

       {/* Main View */}
       <main className="flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar pr-2">
          {/* Header */}
          <header className="flex items-center justify-between">
             <div className="neu-inset rounded-2xl px-6 py-3 flex items-center gap-4 w-96">
                <Search size={18} className="text-[#a3b1c6]" />
                <input type="text" placeholder="Search records..." className="bg-transparent outline-none text-sm font-medium w-full text-[#31456a] placeholder:text-[#a3b1c6]" />
             </div>
             <div className="flex items-center gap-6">
                <NeuButton className="neu-button h-12 w-12 rounded-2xl"><Bell size={20}/></NeuButton>
                <NeuButton className="neu-button h-12 px-6 rounded-2xl flex items-center gap-3">
                   <LayoutDashboard size={18}/> Dashboard
                </NeuButton>
                <NeuButton className="neu-button h-12 px-6 rounded-2xl flex items-center gap-3">
                   <CalendarDays size={18}/> Timetable
                </NeuButton>
             </div>
          </header>

          <NeuCard className="flex-1 rounded-[40px] overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#31456a] italic">Student Profiles</h2>
                <div className="flex gap-2">
                   <div className="h-2 w-2 rounded-full neu-flat bg-slate-400" />
                   <div className="h-2 w-2 rounded-full neu-flat bg-slate-300" />
                   <div className="h-2 w-2 rounded-full neu-flat bg-slate-200" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayStudents.map((student, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={student.id}
                  >
                    <NeuCard variant="flat" className="rounded-[30px] group hover:neu-convex transition-all cursor-pointer">
                       <div className="flex items-start gap-4 mb-6">
                          <div className="h-16 w-16 rounded-2xl neu-inset overflow-hidden p-1">
                             <img src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} className="rounded-xl" alt="avatar" />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-base font-bold text-[#31456a] uppercase truncate">{student.name}</h4>
                             <p className="text-xs text-[#5a7194] font-medium">{student.grade}</p>
                             <div className={cn(
                                "mt-2 inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                student.status === 'Present' || student.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                             )}>
                                {student.status}
                             </div>
                          </div>
                       </div>
                       <div className="space-y-1 mb-8">
                          <p className="text-[10px] font-bold text-[#a3b1c6] uppercase tracking-wider">Age: <span className="text-[#31456a] ml-1">{student.age || 'N/A'}</span></p>
                          <p className="text-[10px] font-bold text-[#a3b1c6] uppercase tracking-wider">ID: <span className="text-[#31456a] ml-1">{student.id}</span></p>
                       </div>
                       <NeuButton variant="emerald" className="w-full py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest italic group-hover:scale-[1.02]">
                          View Profile
                       </NeuButton>
                    </NeuCard>
                  </motion.div>
                ))}
             </div>

             {/* Map Section */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <NeuCard variant="inset" className="rounded-[40px]">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-black text-[#31456a] italic flex items-center gap-2"><MapIcon size={20}/> Classroom Map</h3>
                      <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">View All ></button>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      {demoData.classroomMap.map((room, i) => (
                        <div key={i} className="neu-flat p-4 rounded-2xl text-center border-b-4 border-slate-200">
                           <p className="text-xs font-black text-[#31456a]">{room.name}</p>
                        </div>
                      ))}
                   </div>
                </NeuCard>

                <NeuCard variant="inset" className="rounded-[40px]">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-black text-[#31456a] italic flex items-center gap-2"><MapIcon size={20}/> Infrastructure</h3>
                      <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">View All ></button>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      {demoData.infrastructure.map((room, i) => (
                        <div key={i} className="neu-flat p-4 rounded-2xl text-center border-b-4 border-slate-200">
                           <p className="text-xs font-black text-[#31456a]">{room.name}</p>
                        </div>
                      ))}
                   </div>
                </NeuCard>
             </div>
          </NeuCard>
       </main>
    </div>
  )
}
