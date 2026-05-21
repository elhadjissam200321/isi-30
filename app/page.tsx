import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { getViews } from "@/lib/views"
import { articles } from "@/data/articles"
import AnimatedPartners from "@/components/animated-partners"
import AlumniCarousel from "@/components/alumni-carousel"
import { Reveal } from "@/components/reveal"
import {
  Brain,
  Database,
  TrendingUp,
  Network,
  Quote,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Target,
  Cpu,
  Shield,
  BarChart,
  Code,
  ChevronRight,
  Eye,
  Calendar,
  Star,
  Building2
} from "lucide-react"

// Neural network SVG background
function NeuralBg({ className = "" }: { className?: string }) {
  const nodes = [
    [10, 20], [30, 10], [55, 25], [75, 15], [90, 30],
    [15, 50], [38, 45], [62, 55], [82, 48], [95, 60],
    [5, 75], [25, 85], [50, 70], [70, 80], [88, 72],
    [20, 95], [45, 90], [65, 98], [85, 88],
  ]
  const edges: [number, number, number, number][] = [
    [10, 20, 30, 10], [30, 10, 55, 25], [55, 25, 75, 15], [75, 15, 90, 30],
    [15, 50, 38, 45], [38, 45, 62, 55], [62, 55, 82, 48], [82, 48, 95, 60],
    [5, 75, 25, 85], [25, 85, 50, 70], [50, 70, 70, 80], [70, 80, 88, 72],
    [10, 20, 15, 50], [30, 10, 38, 45], [55, 25, 62, 55], [75, 15, 82, 48],
    [15, 50, 5, 75], [38, 45, 25, 85], [62, 55, 50, 70], [82, 48, 70, 80],
    [20, 95, 5, 75], [45, 90, 25, 85], [65, 98, 50, 70], [85, 88, 70, 80],
  ]
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="0.3" strokeOpacity="0.25" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.8" fill="white" fillOpacity="0.5" />
      ))}
    </svg>
  )
}

// Fetch dynamic data
async function getHomepageData() {
  const [homepage, alumni, partners, config, alumniCompanies] = await Promise.all([
    import("@/data/homepage.json").then(m => m.default),
    import("@/data/alumni.json").then(m => m.default),
    import("@/data/partners.json").then(m => m.default),
    import("@/data/site-config.json").then(m => m.default),
    import("@/data/alumni-companies.json").then(m => m.default)
  ])
  return { homepage, alumni, partners, config, alumniCompanies }
}

export default async function HomePage() {
  const views = await getViews()
  const { homepage, alumni, partners, config, alumniCompanies } = await getHomepageData()

  const newsWithViews = Object.values(articles).slice(0, 4).map(item => ({
    ...item,
    desc: item.excerpt,
    tag: item.category,
    views: views[item.slug] || item.views
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[120vh] flex items-center overflow-hidden bg-primary">
        {/* Desktop Hero Image */}
        <Image
          src="/images/hero.png"
          alt="Master ISI Hero"
          fill
          className="object-cover hidden sm:block"
          priority
          sizes="100vw"
        />
        {/* Mobile Hero Image */}
        <Image
          src="/images/hero-mobile.png"
          alt="Master ISI Hero Mobile"
          fill
          className="object-cover sm:hidden"
          priority
          sizes="100vw"
        />
        {/* Semi-blur overlay */}
        <div className="absolute inset-0 bg-primary/40" />

        <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 pb-20">
          <div className="max-w-3xl">
            <div suppressHydrationWarning className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Cpu className="w-3.5 h-3.5" />
              {homepage.hero.badge}
            </div>
            <h1 suppressHydrationWarning className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6">
              {homepage.hero.title}
            </h1>
            <p suppressHydrationWarning className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">
              {homepage.hero.subtitle || (
                <>
                  {config.facultyName}, {config.universityName}
                </>
              )}
            </p>
            <div suppressHydrationWarning className="flex flex-wrap gap-4">
              <a
                href="https://isi.badrabba.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg flex items-center gap-2 group"
              >
                {homepage.hero.cta_primary}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/flyer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary-foreground/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                {homepage.hero.cta_secondary}
              </a>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-background" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {homepage.stats.map((stat: any, i: number) => {
            const Icon = ({ GraduationCap, BookOpen, Users, Award } as Record<string, any>)[stat.icon] || Award
            return (
              <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-3xl font-serif font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">{homepage.pillars_section.badge}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 text-balance">
                {homepage.pillars.length} {homepage.pillars_section.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
                {homepage.pillars_section.description}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homepage.pillars.map((pillar: any, i: number) => {
              const Icon = ({ Brain, TrendingUp, Database, Network, Shield, BarChart, Code } as Record<string, any>)[pillar.icon] || Brain
              return (
                <Reveal key={i} delay={i * 100} direction="up">
                  <div className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all hover:shadow-lg h-full text-center flex flex-col items-center">
                    <div className={`w-12 h-12 ${pillar.color || 'bg-primary'} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHY MASTER ISI ── */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div>
                <span className="text-accent text-sm font-semibold uppercase tracking-widest">{homepage.why_isi.badge}</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
                  {homepage.why_isi.title}
                </h2>
                <div className="space-y-4">
                  {homepage.why_isi.points.map((item: any, i: number) => {
                    const Icon = ({ Users, Target, Cpu } as Record<string, any>)[item.icon] || Target
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-1 bg-primary/10 p-2 rounded-full">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed italic">{item.text}</p>
                      </div>
                    )
                  })}
                </div>
                <Link
                  href="/programme"
                  className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-serif uppercase tracking-wider"
                >
                  {homepage.why_isi.cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-primary/20">
                <Image
                  src={homepage.why_isi.image}
                  alt={homepage.why_isi.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MOT DU COORDONNATEUR ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Quote className="w-32 h-32 text-primary" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <Reveal direction="right" delay={200}>
                <div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-widest">{homepage.coordinator.badge}</span>
                  <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-4">{homepage.coordinator.name}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg italic mb-6">
                    &quot;{homepage.coordinator.message}&quot;
                  </p>
                  <div className="flex items-center gap-4 border-t border-primary/10 pt-6">
                    <div className="text-sm">
                      <div className="font-bold text-foreground">{homepage.coordinator.name}</div>
                      <div className="text-primary font-medium">{homepage.coordinator.title}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">{homepage.news_section.badge}</span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2">{homepage.news_section.title}</h2>
            </div>
            <Link href="/actualites" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              {homepage.news_section.cta} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsWithViews.map((n) => (
              <Link
                key={n.title}
                href={`/actualites/${n.slug}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={n.image || "/images/hero-neural.jpg"}
                    alt={n.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-primary/90 text-white backdrop-blur-sm uppercase tracking-wider">
                      {n.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium uppercase tracking-tight">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {n.date}
                    </span>
                    <span className="flex items-center gap-1 border-l border-border pl-3">
                      <Eye className="w-3.5 h-3.5" />
                      {n.views} vues
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-lg leading-snug font-serif group-hover:text-primary transition-colors line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {n.desc}
                  </p>
                  <div className="pt-2 border-t border-border mt-auto">
                    <span className="text-xs text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
                      Lire l&apos;article <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>





      {/* ── ALUMNI COMPANIES CAROUSEL ── */}
      <AlumniCarousel companies={alumniCompanies} />

      {/* ── PARTNERS ── */}
      <section id="partners" className="py-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">{homepage.partners_section.badge}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2 text-balance">
                {homepage.partners_section.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
                {homepage.partners_section.description}
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} direction="up">
            <AnimatedPartners />
          </Reveal>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4 text-balance">
            {homepage.cta_band.title}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            {homepage.cta_band.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://isi.badrabba.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 font-serif uppercase tracking-wider text-sm"
            >
              {homepage.cta_band.cta_primary}
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="border border-white/40 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-serif uppercase tracking-wider text-sm"
            >
              {homepage.cta_band.cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
