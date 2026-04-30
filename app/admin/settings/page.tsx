"use client"

import { useState, useEffect } from "react"
import { Settings, Save, Link as LinkIcon, Palette, Plus, Trash2, Globe } from "lucide-react"

export default function SettingsManager() {
    const [config, setConfig] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/admin/config")
            .then(res => res.json())
            .then(data => {
                setConfig(data)
                setLoading(false)
            })
    }, [])

    const handleSave = async () => {
        const res = await fetch("/api/admin/config", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(config),
        })
        if (res.ok) alert("Paramètres enregistrés avec succès !")
        else alert("Erreur lors de l'enregistrement")
    }

    const addSocial = () => {
        const key = prompt("Nom du réseau (ex: twitter, facebook, instagram)")
        if (key && !config.socials[key.toLowerCase()]) {
            setConfig({
                ...config,
                socials: {
                    ...config.socials,
                    [key.toLowerCase()]: ""
                }
            })
        }
    }

    const removeSocial = (key: string) => {
        const newSocials = { ...config.socials }
        delete newSocials[key]
        setConfig({ ...config, socials: newSocials })
    }

    if (loading) return <div className="p-8 text-slate-400 text-center">Chargement...</div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Settings className="w-6 h-6 text-indigo-400" />
                        Paramètres Généraux
                    </h1>
                    <p className="text-slate-400 text-sm">Configurez les réseaux sociaux et personnalisez le style global du site.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition font-bold shadow-lg shadow-indigo-500/20"
                >
                    <Save className="w-4 h-4" /> Enregistrer les modifications
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Social Media */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-indigo-400" />
                            Réseaux Sociaux
                        </h2>
                        <button
                            onClick={addSocial}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-2"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {Object.entries(config.socials || {}).map(([name, url]: [string, any]) => (
                            <div key={name} className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                                    {name}
                                    <button onClick={() => removeSocial(name)} className="text-red-400 hover:text-red-300">Supprimer</button>
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setConfig({
                                            ...config,
                                            socials: { ...config.socials, [name]: e.target.value }
                                        })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                                        placeholder={`https://${name}.com/...`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom CSS */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-indigo-400" />
                        CSS Personnalisé
                    </h2>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                        Ajoutez du code CSS pour modifier l&apos;apparence du site sans toucher au code source. (ex: .hero-title &#123; color: red; &#125;)
                    </p>
                    <textarea
                        value={config.customCss || ""}
                        onChange={(e) => setConfig({ ...config, customCss: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-indigo-300 font-mono focus:outline-none focus:border-indigo-500 transition h-[300px]"
                        placeholder="/* Votre code CSS ici */"
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    )
}
