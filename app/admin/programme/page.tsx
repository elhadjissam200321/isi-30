"use client"

import { useState, useEffect } from "react"
import {
    LayoutDashboard, Save, BookOpen, Target, GraduationCap,
    Cpu, Users, Plus, Trash2, ChevronDown, ChevronUp, Layers
} from "lucide-react"

interface Module {
    name: string;
    prof: string;
    icon: string;
}

interface Semester {
    name: string;
    description: string;
    modules: Module[];
    options?: {
        key: string;
        name: string;
        color: string;
        modules: Module[];
    }[];
    commonModules?: Module[];
}

interface ProgrammeData {
    hero: {
        title: string;
        subtitle: string;
        breadcrumb: string;
    };
    quickInfo: { icon: string; label: string; value: string }[];
    objectives: string[];
    careerOutcomes: { role: string; sectors: string }[];
    semesterModules: Record<string, Semester>;
    s4Section: {
        badge: string;
        title: string;
        description: string;
        items: string[];
    };
    cta: {
        title: string;
        description: string;
        primaryText: string;
        secondaryText: string;
    };
}

export default function ProgrammeManager() {
    const [data, setData] = useState<ProgrammeData | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<string>("hero")

    useEffect(() => {
        fetch("/api/admin/programme").then(res => res.json()).then(d => {
            setData(d)
            setLoading(false)
        })
    }, [])

    const handleSave = async () => {
        if (!data) return
        await fetch("/api/admin/programme", {
            method: "POST",
            body: JSON.stringify(data)
        })
        alert("Modifications enregistrées !")
    }

    if (loading || !data) return <div className="p-8 text-slate-400 text-center">Chargement...</div>

    const renderModuleEditor = (module: Module, index: number, onChange: (updated: Module) => void, onRemove: () => void) => (
        <div key={index} className="flex gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-700 items-center">
            <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                    value={module.name}
                    onChange={e => onChange({ ...module, name: e.target.value })}
                    className="bg-transparent text-sm text-white outline-none border-b border-slate-800 focus:border-indigo-500 pb-1"
                    placeholder="Nom du module"
                />
                <input
                    value={module.prof}
                    onChange={e => onChange({ ...module, prof: e.target.value })}
                    className="bg-transparent text-xs text-slate-400 outline-none border-b border-slate-800 focus:border-indigo-500 pb-1"
                    placeholder="Professeur"
                />
            </div>
            <button onClick={onRemove} className="text-slate-600 hover:text-red-400 transition ml-2">
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    )

    return (
        <div className="p-8 max-w-6xl mx-auto pb-24 text-slate-200">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-900/80 backdrop-blur-md z-30 py-4 border-b border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        Contenu du Programme
                    </h1>
                    <p className="text-slate-400 text-sm">Gérez les objectifs, modules et débouchés.</p>
                </div>
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition font-semibold shadow-lg shadow-indigo-600/20">
                    <Save className="w-4 h-4" /> Enregistrer tout
                </button>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Nav */}
                <div className="w-48 shrink-0 flex flex-col gap-1 sticky top-32 h-fit">
                    {[
                        { id: "hero", label: "Entête & Info", icon: Cpu },
                        { id: "objectives", label: "Objectifs", icon: Target },
                        { id: "career", label: "Débouchés", icon: GraduationCap },
                        { id: "modules", label: "Modules (S1-S4)", icon: BookOpen },
                        { id: "s4", label: "Semestre 4", icon: Layers },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-12 min-w-0">
                    {activeTab === "hero" && (
                        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3 mb-6">Entête & Infos Rapides</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase">Titre de la page</label>
                                    <input value={data.hero.title} onChange={e => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase">Sous-titre (Subtitle)</label>
                                    <textarea value={data.hero.subtitle} onChange={e => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none h-24 resize-none transition" />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === "objectives" && (
                        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Target className="w-5 h-5 text-indigo-400" /> Objectifs de la formation
                                </h2>
                                <button
                                    onClick={() => setData({ ...data, objectives: [...data.objectives, "Nouvel objectif..."] })}
                                    className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Ajouter
                                </button>
                            </div>
                            <div className="space-y-3">
                                {data.objectives.map((obj, i) => (
                                    <div key={i} className="flex gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-1">{i + 1}</div>
                                        <textarea
                                            value={obj}
                                            onChange={e => {
                                                const next = [...data.objectives]
                                                next[i] = e.target.value
                                                setData({ ...data, objectives: next })
                                            }}
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 outline-none text-sm resize-none h-18"
                                        />
                                        <button
                                            onClick={() => setData({ ...data, objectives: data.objectives.filter((_, idx) => idx !== i) })}
                                            className="p-2 text-slate-500 hover:text-red-400 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "career" && (
                        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-indigo-400" /> Débouchés professionnels
                                </h2>
                                <button
                                    onClick={() => setData({ ...data, careerOutcomes: [...data.careerOutcomes, { role: "Métier...", sectors: "Secteurs..." }] })}
                                    className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Ajouter
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.careerOutcomes.map((c, i) => (
                                    <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 relative group">
                                        <button
                                            onClick={() => setData({ ...data, careerOutcomes: data.careerOutcomes.filter((_, idx) => idx !== i) })}
                                            className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-[10px] text-slate-500 uppercase block mb-1">Rôle / Métier</label>
                                                <input value={c.role} onChange={e => {
                                                    const next = [...data.careerOutcomes]
                                                    next[i].role = e.target.value
                                                    setData({ ...data, careerOutcomes: next })
                                                }} className="w-full bg-transparent border-b border-slate-700 pb-1 text-white font-bold outline-none text-sm" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-slate-500 uppercase block mb-1">Secteurs</label>
                                                <input value={c.sectors} onChange={e => {
                                                    const next = [...data.careerOutcomes]
                                                    next[i].sectors = e.target.value
                                                    setData({ ...data, careerOutcomes: next })
                                                }} className="w-full bg-transparent text-slate-400 outline-none text-xs" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "modules" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {Object.keys(data.semesterModules).map(semKey => {
                                const sem = data.semesterModules[semKey]
                                return (
                                    <section key={semKey} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm">
                                        <h2 className="text-xl font-serif font-bold text-indigo-400 mb-6 flex items-center gap-3">
                                            <span className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-base">{semKey.toUpperCase()}</span>
                                            {sem.name}
                                        </h2>

                                        {!sem.options ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 gap-3">
                                                    {sem.modules.map((mod, i) => (
                                                        renderModuleEditor(
                                                            mod,
                                                            i,
                                                            (updated) => {
                                                                const next = { ...data.semesterModules }
                                                                next[semKey].modules[i] = updated
                                                                setData({ ...data, semesterModules: next })
                                                            },
                                                            () => {
                                                                const next = { ...data.semesterModules }
                                                                next[semKey].modules = next[semKey].modules.filter((_, idx) => idx !== i)
                                                                setData({ ...data, semesterModules: next })
                                                            }
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            /* S3 Options Editor */
                                            <div className="space-y-10">
                                                {sem.options.map((opt, optIdx) => (
                                                    <div key={opt.key} className="bg-slate-900/30 p-6 rounded-2xl border border-indigo-500/20">
                                                        <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${opt.color.replace('bg-', 'text-')}`}>
                                                            Option: {opt.name}
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {opt.modules.map((mod, i) => (
                                                                renderModuleEditor(
                                                                    mod,
                                                                    i,
                                                                    (updated) => {
                                                                        const next = { ...data.semesterModules }
                                                                        next[semKey].options![optIdx].modules[i] = updated
                                                                        setData({ ...data, semesterModules: next })
                                                                    },
                                                                    () => {
                                                                        const next = { ...data.semesterModules }
                                                                        next[semKey].options![optIdx].modules = next[semKey].options![optIdx].modules.filter((_, idx) => idx !== i)
                                                                        setData({ ...data, semesterModules: next })
                                                                    }
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/20">
                                                    <h4 className="text-sm font-bold text-indigo-400 mb-4 flex justify-between items-center">
                                                        Modules Communs
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {sem.commonModules?.map((mod, i) => (
                                                            renderModuleEditor(
                                                                mod,
                                                                i,
                                                                (updated) => {
                                                                    const next = { ...data.semesterModules }
                                                                    next[semKey].commonModules![i] = updated
                                                                    setData({ ...data, semesterModules: next })
                                                                },
                                                                () => {
                                                                    const next = { ...data.semesterModules }
                                                                    next[semKey].commonModules = next[semKey].commonModules!.filter((_, idx) => idx !== i)
                                                                    setData({ ...data, semesterModules: next })
                                                                }
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                )
                            })}
                        </div>
                    )}

                    {activeTab === "s4" && (
                        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3 mb-6">Contenu du Semestre 4 (PFE)</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase">Badge</label>
                                    <input value={data.s4Section.badge} onChange={e => setData({ ...data, s4Section: { ...data.s4Section, badge: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase">Titre S4</label>
                                    <input value={data.s4Section.title} onChange={e => setData({ ...data, s4Section: { ...data.s4Section, title: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase">Description S4</label>
                                    <textarea value={data.s4Section.description} onChange={e => setData({ ...data, s4Section: { ...data.s4Section, description: e.target.value } })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none h-32 resize-none" />
                                </div>
                                <div className="space-y-3 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs text-slate-400 block font-semibold uppercase">Liste des éléments (Points clés)</label>
                                    </div>
                                    {data.s4Section.items.map((item, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input value={item} onChange={e => {
                                                const nextItems = [...data.s4Section.items]
                                                nextItems[i] = e.target.value
                                                setData({ ...data, s4Section: { ...data.s4Section, items: nextItems } })
                                            }} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
