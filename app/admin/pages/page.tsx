"use client"

import Link from "next/link"
import { LayoutDashboard, FileText, Users, Handshake, BookOpen, Home, Settings } from "lucide-react"

const pages = [
    { title: "Page d'accueil", description: "Gérer le hero, les piliers et les sections de l'accueil", href: "/admin/homepage", icon: Home },
    { title: "Programme", description: "Modifier les spécialisations et les modules", href: "/admin/programme", icon: BookOpen },
    { title: "Actualités", description: "Gérer les articles et les nouvelles", href: "/admin/articles", icon: FileText },
    { title: "Enseignants", description: "Liste du corps professoral", href: "/admin/enseignants", icon: Users },
    { title: "Partenaires", description: "Gérer les logos des partenaires", href: "/admin/partenaires", icon: Handshake },
    { title: "Contact & Footer", description: "Informations de contact et liens du footer", href: "/admin/contact", icon: Settings },
]

export default function PagesManager() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                    Gestion des Pages
                </h1>
                <p className="text-slate-400 text-sm">Accédez rapidement aux sections de contenu pour chaque page du site.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <Link
                        key={page.href}
                        href={page.href}
                        className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                    >
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                            <page.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2">{page.title}</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">{page.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
