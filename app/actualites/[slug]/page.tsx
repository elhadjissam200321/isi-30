import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronRight, Calendar, User, Eye, Clock } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { incrementViews } from "@/lib/views"
import { articles } from "@/data/articles"

// Data is now imported from @/data/articles

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export default async function ArticleDetail({ params }: Props) {
  const { slug } = await params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Article non trouvé</h1>
            <Link href="/actualites" className="text-primary hover:underline">Retour aux actualités</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Increment views and get the new count
  const updatedViews = await incrementViews(slug)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Article Breadcrumb Header */}
        <section className="bg-secondary py-8 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/actualites" className="hover:text-primary transition-colors">Actualités</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{article.title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5 border-l border-white/20 pl-4">
                  <Eye className="w-4 h-4" />
                  {updatedViews || article.views} vues
                </span>
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">
              {article.title}
            </h1>
          </div>
        </section>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12 items-start">
            {/* Article body */}
            <article className="min-w-0">
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-blockquote:border-primary prose-blockquote:bg-secondary/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                  prose-ul:my-6 prose-li:text-muted-foreground prose-li:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Rédigé par</div>
                    <div className="text-sm font-bold text-foreground font-serif">{article.author}</div>
                  </div>
                </div>
                <ShareButtons
                  title={article.title}
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 sticky top-24">
              <div className="bg-secondary/50 rounded-xl p-6 border border-border backdrop-blur-sm">
                <h3 className="text-sm font-bold text-foreground mb-4 font-serif uppercase tracking-widest border-b border-border pb-2">Articles récents</h3>
                <div className="space-y-4">
                  {Object.entries(articles)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, art]) => (
                      <Link
                        key={key}
                        href={`/actualites/${key}`}
                        className="group block"
                      >
                        <div className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{art.category}</div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug font-serif">{art.title}</h4>
                      </Link>
                    ))}
                </div>
              </div>

              <div className="bg-primary rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-bold font-serif mb-2">Rejoignez-nous</h3>
                <p className="text-white/70 text-xs mb-4">Prêt à devenir un expert en systèmes intelligents ?</p>
                <a
                  href="https://www.fsac.ac.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-white text-primary font-bold py-2 rounded-lg text-sm hover:bg-white/90 transition-colors uppercase tracking-wider font-serif text-center"
                >
                  Candidater
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
