"use client"

import { useState, useEffect } from "react"
import { GraduationCap, Plus, Trash2, Save, Users, Calendar, Search } from "lucide-react"

interface Promotion {
    year: string;
    name: string;
    students: string[];
}

export default function PromotionsManager() {
    const [promotions, setPromotions] = useState<Promotion[]>([])
    const [loading, setLoading] = useState(true)
    const [activePromoIndex, setActivePromoIndex] = useState(0)

    useEffect(() => {
        fetch("/api/admin/promotions")
            .then(res => res.json())
            .then(data => {
                setPromotions(data)
                setLoading(false)
            })
    }, [])

    const handleSave = async () => {
        const res = await fetch("/api/admin/promotions", {
            method: "POST",
            body: JSON.stringify(promotions)
        })
        if (res.ok) alert("Promotions enregistrées !")
    }

    const addPromotion = () => {
        const year = prompt("Année (ex: 2026-2027)")
        if (year) {
            setPromotions([{ year, name: `Promotion ${year.split('-')[1] || year}`, students: [] }, ...promotions])
            setActivePromoIndex(0)
        }
    }

    const removePromotion = (index: number) => {
        if (confirm("Voulez-vous vraiment supprimer cette promotion ?")) {
            const newPromos = [...promotions]
            newPromos.splice(index, 1)
            setPromotions(newPromos)
            setActivePromoIndex(0)
        }
    }

    const addStudent = (promoIndex: number) => {
        const name = prompt("Nom de l'étudiant")
        if (name) {
            const newPromos = [...promotions]
            newPromos[promoIndex].students.push(name.toUpperCase())
            setPromotions(newPromos)
        }
    }

    const removeStudent = (promoIndex: number, studentIndex: number) => {
        const newPromos = [...promotions]
        newPromos[promoIndex].students.splice(studentIndex, 1)
        setPromotions(newPromos)
    }

    if (loading) return <div className="p-8 text-slate-400">Chargement...</div>

    const currentPromo = promotions[activePromoIndex]

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-indigo-400" />
                        Gestion des Promotions
                    </h1>
                    <p className="text-slate-400 text-sm">Gérez les listes d'étudiants par année universitaire.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={addPromotion} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition text-sm">
                        <Plus className="w-4 h-4" /> Nouvelle Promo
                    </button>
                    <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition font-bold shadow-lg shadow-indigo-500/20">
                        <Save className="w-4 h-4" /> Enregistrer tout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                {/* Sidebar: Promo List */}
                <div className="space-y-2">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">Années Universitaires</h2>
                    {promotions.map((p, i) => (
                        <div key={p.year} className="group flex items-center gap-2">
                            <button
                                onClick={() => setActivePromoIndex(i)}
                                className={`flex-1 text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activePromoIndex === i
                                        ? "bg-indigo-600 text-white shadow-lg"
                                        : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {p.year}
                                </div>
                            </button>
                            <button
                                onClick={() => removePromotion(i)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main: Student List */}
                {currentPromo ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1 uppercase">{currentPromo.name}</h2>
                                <p className="text-slate-400 text-sm flex items-center gap-2">
                                    <Users className="w-4 h-4 text-indigo-400" />
                                    {currentPromo.students.length} Étudiants inscrits
                                </p>
                            </div>
                            <button
                                onClick={() => addStudent(activePromoIndex)}
                                className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-bold border border-indigo-600/20"
                            >
                                <Plus className="w-4 h-4" /> Ajouter un étudiant
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {currentPromo.students.map((student, i) => (
                                <div key={i} className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between hover:border-indigo-500/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-slate-600">{(i + 1).toString().padStart(2, '0')}</span>
                                        <span className="text-sm font-medium text-slate-200">{student}</span>
                                    </div>
                                    <button
                                        onClick={() => removeStudent(activePromoIndex, i)}
                                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1.5 transition-opacity"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {currentPromo.students.length === 0 && (
                            <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                <Users className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                                <p className="text-slate-500 italic">Aucun étudiant dans cette promotion.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-20 text-center">
                        <p className="text-slate-500">Sélectionnez une promotion pour gérer les étudiants.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
