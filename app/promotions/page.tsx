"use client"

import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronRight, GraduationCap, Users, Calendar, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

import promotions from "@/data/promotions.json"

export default function PromotionsPage() {
    const [activePromo, setActivePromo] = useState(promotions[0].year)
    const [search, setSearch] = useState("")

    const filteredPromo = promotions.find(p => p.year === activePromo)
    const filteredStudents = filteredPromo?.students.filter(s =>
        s.toLowerCase().includes(search.toLowerCase())
    ) || []

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-primary">
                <Image
                    src="/images/hero.png"
                    alt="Promotions Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-primary/40" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
                        <Link href="/" className="hover:text-white">Accueil</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white/90">Promotions</span>
                    </div>
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 italic">Nos Promotions</h1>
                    <p className="text-white/80 text-lg max-w-2xl leading-relaxed font-light">
                        Découvrez les talents du Master ISI à travers ses différentes cohortes d'étudiants d'excellence.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-1 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start lg:items-center justify-between">
                        {/* Promo Selector */}
                        <div className="flex flex-wrap gap-2 p-1.5 bg-secondary/50 rounded-2xl border border-border">
                            {promotions.map((p) => (
                                <button
                                    key={p.year}
                                    onClick={() => setActivePromo(p.year)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                                        activePromo === p.year
                                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                            : "text-muted-foreground hover:bg-white hover:text-primary"
                                    )}
                                >
                                    <Calendar className="w-4 h-4" />
                                    {p.year}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Rechercher un étudiant..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Promotion Info Card */}
                    <div className="bg-card border border-border rounded-3xl p-8 mb-12 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <GraduationCap className="w-48 h-48 text-primary" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Promotion en cours</span>
                                <h2 className="text-3xl font-serif font-bold text-foreground mb-2">{filteredPromo?.name}</h2>
                                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Users className="w-4 h-4" />
                                        {filteredPromo?.students.length} Étudiants
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-border" />
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Calendar className="w-4 h-4" />
                                        {filteredPromo?.year}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Students Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((name, i) => (
                                <div
                                    key={name}
                                    className="group bg-card hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 shadow-sm hover:shadow-md"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold text-xs font-serif group-hover:bg-primary group-hover:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors tracking-tight">
                                        {name}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-muted-foreground italic">Aucun étudiant ne correspond à votre recherche.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
