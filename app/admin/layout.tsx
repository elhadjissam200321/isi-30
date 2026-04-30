"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Brain, LayoutDashboard, FileText, Users, Handshake, LogOut, ExternalLink, Menu, X, Link as LinkIcon, GraduationCap, Settings, BookOpen, AlertCircle, Building2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

const navItems = [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { label: "Pages", href: "/admin/pages", icon: LayoutDashboard },
    { label: "Actualités", href: "/admin/articles", icon: FileText },
    { label: "Promotions", href: "/admin/promotions", icon: GraduationCap },
    { label: "Enseignants", href: "/admin/enseignants", icon: Users },
    { label: "Partenaires", href: "/admin/partenaires", icon: Handshake },
    { label: "Entreprises Alumni", href: "/admin/alumni-companies", icon: Building2 },
    { label: "Programme", href: "/admin/programme", icon: BookOpen },
    { label: "Paramètres", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    // Don't show layout on login page
    if (pathname === "/admin/login") return <>{children}</>

    return (
        <div className="min-h-screen flex bg-slate-950 text-slate-100">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:static lg:flex`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Master ISI</p>
                            <p className="text-slate-500 text-xs">Panneau Admin</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="p-4 border-t border-slate-800 space-y-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Voir le site
                    </a>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center px-4 gap-4 sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <p className="text-sm text-slate-400">
                            {navItems.find((n) => pathname.startsWith(n.href) || n.href === pathname)?.label ?? "Admin"}
                        </p>
                    </div>
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                        A
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
