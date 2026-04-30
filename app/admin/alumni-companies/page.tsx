"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Trash2, X, Save, Loader2, Image as ImageIcon, Building2 } from "lucide-react"
import Image from "next/image"
import { ImageUpload } from "@/components/admin/image-upload"

interface Company {
    name: string
    logo: string
}

export default function AlumniCompaniesAdminPage() {
    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState<{ name: string; logo: string } | null>(null)
    const [saving, setSaving] = useState(false)

    const fetch_ = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/admin/alumni-companies")
        setCompanies(await res.json())
        setLoading(false)
    }, [])

    useEffect(() => { fetch_() }, [fetch_])

    const save = async () => {
        if (!form?.name || !form?.logo) return
        setSaving(true)
        const newCompanies = [...companies, form]
        await fetch("/api/admin/alumni-companies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCompanies),
        })
        await fetch_()
        setForm(null)
        setSaving(false)
    }

    const del = async (index: number) => {
        if (!confirm("Supprimer cette entreprise ?")) return
        const newCompanies = companies.filter((_, i) => i !== index)
        await fetch("/api/admin/alumni-companies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCompanies),
        })
        await fetch_()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-indigo-400" />
                        Entreprises Alumni
                    </h1>
                    <p className="text-slate-400 mt-0.5 text-sm">Gérez les logos des entreprises qui emploient nos lauréats.</p>
                </div>
                <button onClick={() => setForm({ name: "", logo: "" })}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                    <Plus className="w-4 h-4" /> Ajouter une entreprise
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 text-indigo-400 animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {companies.map((c, i) => (
                        <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col items-center gap-3 group relative overflow-hidden">
                            <div className="w-full aspect-[3/2] bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden relative">
                                {c.logo ? (
                                    <Image src={c.logo} alt={c.name} width={120} height={60} className="object-contain max-h-12" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-600" />
                                )}
                            </div>
                            <p className="text-sm font-medium text-white text-center">{c.name}</p>
                            <button
                                onClick={() => del(i)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {form && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-slate-700">
                            <h2 className="font-bold text-white">Ajouter une entreprise</h2>
                            <button onClick={() => setForm(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5">Nom de l&apos;entreprise *</label>
                                <input value={form.name} onChange={e => setForm(f => ({ ...f!, name: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                                    placeholder="Ex: Microsoft" />
                            </div>
                            <div>
                                <ImageUpload
                                    label="Logo de l'entreprise"
                                    value={form.logo}
                                    onChange={url => setForm(f => ({ ...f!, logo: url }))}
                                />
                            </div>
                        </div>
                        <div className="p-5 border-t border-slate-700 flex items-center justify-end gap-3">
                            <button onClick={() => setForm(null)} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition">Annuler</button>
                            <button onClick={save} disabled={saving || !form.name || !form.logo}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
