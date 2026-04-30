import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Briefcase, MapPin, GraduationCap, Quote, Linkedin } from "lucide-react"

function PageHero({ title, subtitle, breadcrumb }: { title: string; subtitle: string; breadcrumb: string }) {
  return (
    <section className="relative py-14 overflow-hidden bg-primary">
      <Image
        src="/images/hero.png"
        alt="Alumni Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-primary/40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
          <Link href="/" className="hover:text-white">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/90">{breadcrumb}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance">{title}</h1>
        <p className="text-white/75 mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}

function AlumniAvatar({ name, color = "bg-primary" }: { name: string; color?: string }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("")
  return (
    <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white font-bold text-base font-serif shrink-0`}>
      {initials}
    </div>
  )
}

const alumni = [
  {
    name: "Amine Benchekroun",
    promo: "2020",
    promoName: "Al-Khwarizmi",
    position: "Data Scientist Senior",
    company: "OCP SA – Casablanca",
    location: "Casablanca, Maroc",
    quote: "Le Master ISI m'a donné les bases théoriques solides et les outils pratiques pour intégrer directement une équipe R&D.",
    color: "bg-primary",
    sector: "Industrie",
  },
  {
    name: "Fatima Zahra El Moussaoui",
    promo: "2021",
    promoName: "Ada Lovelace",
    position: "ML Engineer",
    company: "Capgemini – Paris",
    location: "Paris, France",
    quote: "La formation m'a permis de décrocher un contrat à Paris dès la fin du master. Le niveau était vraiment au rendez-vous.",
    color: "bg-accent",
    sector: "Conseil IT",
  },
  {
    name: "Khalid Berrada",
    promo: "2019",
    promoName: "Ibn Sina",
    position: "AI Research Scientist",
    company: "University of Montreal – MILA",
    location: "Montréal, Canada",
    quote: "ISI a été le tremplin vers mon doctorat en apprentissage profond. Je ne regrette pas mon choix.",
    color: "bg-primary",
    sector: "Recherche",
  },
  {
    name: "Imane Tahiri",
    promo: "2022",
    promoName: "Alan Turing",
    position: "Data Engineer",
    company: "Attijariwafa Bank",
    location: "Casablanca, Maroc",
    quote: "La partie Big Data & Cloud du programme est exactement ce que le secteur bancaire recherche aujourd'hui.",
    color: "bg-accent",
    sector: "Finance",
  },
  {
    name: "Yassine Cherkaoui",
    promo: "2020",
    promoName: "Al-Khwarizmi",
    position: "Fondateur & CEO",
    company: "AInnova – Startup IA",
    location: "Casablanca, Maroc",
    quote: "Mon entreprise est née d'un projet de fin d'études. L'écosystème de l'FSAC m'a aidé à me lancer.",
    color: "bg-primary",
    sector: "Startup",
  },
  {
    name: "Sara Ouazzani",
    promo: "2023",
    promoName: "Marie Curie",
    position: "NLP Engineer",
    company: "OrangeMoney",
    location: "Casablanca, Maroc",
    quote: "Le module de NLP m'a directement préparée à mon poste actuel. Une formation très appliquée.",
    color: "bg-accent",
    sector: "Télécoms",
  },
]

const sectors = [
  { label: "Technologie & IA", pct: 38 },
  { label: "Finance & Banque", pct: 22 },
  { label: "Recherche & Academia", pct: 18 },
  { label: "Conseil IT", pct: 12 },
  { label: "Santé & E-Gov", pct: 10 },
]

export default function AlumniPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageHero
        title="Réseau Alumni"
        subtitle="Plus de 100 diplômés du Master ISI exercent aujourd'hui dans les secteurs technologiques les plus porteurs au Maroc et à l'international."
        breadcrumb="Alumni"
      />

      {/* Stats */}
      <section className="py-10 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
          {[
            { value: "100+", label: "Diplômés actifs" },
            { value: "85%", label: "Emploi < 3 mois" },
            { value: "12", label: "Pays représentés" },
            { value: "5+", label: "Startups créées" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-serif font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Portraits</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Ils ont choisi Master ISI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((a) => (
              <article key={a.name} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <AlumniAvatar name={a.name} color={a.color} />
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{a.name}</h3>
                    <p className="text-xs text-primary font-semibold">{a.position}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Briefcase className="w-3 h-3" />
                      <span>{a.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{a.location}</span>
                    </div>
                  </div>
                </div>
                <div className="relative bg-secondary rounded-lg p-4">
                  <Quote className="absolute top-2 left-2 w-4 h-4 text-primary/20" aria-hidden="true" />
                  <p className="text-xs text-foreground leading-relaxed pl-4 italic">{a.quote}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Promotion {a.promo}</span>
                    <span className="text-xs font-serif font-bold text-primary italic">
                      {a.promoName}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-primary">{a.sector}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors chart */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Insertion</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Secteurs d&apos;insertion professionnelle</h2>
          </div>
          <div className="max-w-xl mx-auto space-y-4">
            {sectors.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{s.label}</span>
                  <span className="text-primary font-bold">{s.pct}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${s.pct}%` }}
                    role="progressbar"
                    aria-valuenow={s.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${s.label}: ${s.pct}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join LinkedIn Community */}
      <section className="py-14 bg-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <GraduationCap className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Rejoignez la communauté ISI</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Vous êtes alumni du Master ISI ? Mettez à jour votre profil et restez connecté à la communauté pour partager votre expertise et découvrir de nouvelles opportunités.
          </p>
          <a 
            href="https://linkedin.com/school/masterisi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all uppercase tracking-wider font-serif text-sm"
          >
            <svg className="w-5 h-5 fill-primary" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            Rejoindre le réseau
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
