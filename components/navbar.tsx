"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronRight, Linkedin } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navLinks, setNavLinks] = useState<{ href: string, label: string }[]>([
    { href: "/", label: "Accueil" },
    { href: "/programme", label: "Programme" },
    { href: "/promotions", label: "Promotions" },
    { href: "/actualites", label: "Actualités" },
    { href: "/enseignants", label: "Enseignants" },
    { href: "/contact", label: "Contact" },
  ])
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    fetch("/api/admin/config")
      .then(res => res.json())
      .then(data => {
        if (data && data.navigation) {
          setNavLinks(data.navigation)
        }
      })
      .catch(err => console.error("Failed to load nav links", err))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const isTransparent = isHome && !scrolled && !open

  return (
    <>
      <header className={cn(
        "w-full z-50 transition-all duration-500 ease-in-out",
        isHome 
          ? (isTransparent ? "absolute top-0 left-0" : "fixed top-0 left-0 bg-card/80 backdrop-blur-md shadow-md border-b border-border")
          : "sticky top-0 bg-card shadow-sm border-b border-border"
      )}>
        {/* Top bar */}
        <div className={cn(
          "text-xs px-4 hidden md:block transition-all duration-500 ease-in-out",
          isTransparent 
            ? "bg-black/10 text-white/90 backdrop-blur-sm py-2 opacity-100" 
            : "bg-primary/5 text-primary/80 py-2 border-b border-primary/10"
        )}>
          <div className="mx-auto flex items-center justify-between">
            <span>Faculté des Sciences Aïn Chock – Université Hassan II de Casablanca</span>
            <div className="flex items-center gap-4">
              <a href="https://www.fsac.ac.ma" target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80">
                fsac.ac.ma
              </a>
              <span className="opacity-40">|</span>
              <a href="https://www.univh2c.ma/" target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80">
                univh2c.ma
              </a>
              <span className="opacity-40">|</span>
              <a href="https://www.linkedin.com/company/master-isi-fsac/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-80 transition-opacity">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className={cn(
          "transition-all duration-500 ease-in-out",
          isTransparent 
            ? "bg-transparent border-b border-white/10" 
            : "bg-transparent"
        )}>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-20" : "h-24"
            )}>
              {/* Logo area */}
              <div className="flex items-center h-full -ml-4 sm:-ml-6 lg:-ml-8">
                <Link href="/" className="flex items-center h-full">
                  {/* FSAC Logo Area */}
                  <div className={cn(
                    "hidden xl:flex items-center h-full px-12 border-r transition-all duration-500",
                    isTransparent ? "border-white/10" : "border-border/30"
                  )}>
                    <Image
                      src={isTransparent ? "/images/logo-fsac-white.png" : "https://fsac.univh2c.ma/front/images/FSAC%20LOGO.jpg"}
                      alt="FSAC Logo"
                      width={120}
                      height={60}
                      className={cn(
                        "w-auto object-contain transition-all duration-500",
                        scrolled ? "h-12" : "h-16"
                      )}
                      priority
                    />
                  </div>
                  {/* ISI Logo Area */}
                  <div className="px-8 flex items-center h-full">
                    <Image
                      src={isTransparent ? "/logo-white.png" : "/logo-blue.png"}
                      alt="Master ISI Logo"
                      width={180}
                      height={90}
                      className={cn(
                        "h-auto transition-all duration-500",
                        scrolled ? "w-[140px]" : "w-[170px]"
                      )}
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Desktop links */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-bold rounded-lg transition-all duration-300 font-serif uppercase tracking-wider",
                      pathname === link.href
                        ? (isTransparent ? "text-white bg-white/20" : "text-primary bg-secondary")
                        : (isTransparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-foreground hover:text-primary hover:bg-secondary")
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="https://isi.badrabba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-sm font-bold px-4 py-2 rounded-lg transition-all font-serif uppercase tracking-wider",
                    isTransparent 
                      ? "bg-white text-primary hover:bg-white/90" 
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  )}
                >
                  Espace Étudiant
                </a>
              </div>

              {/* Mobile toggle */}
              <button
                className={cn(
                  "lg:hidden p-2 rounded-md transition-colors z-50",
                  isTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
                )}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile slide-right menu overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide-right menu panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[85%] max-w-sm bg-card z-50 lg:hidden shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-blue.png"
              alt="Master ISI Logo"
              width={160}
              height={80}
              className="w-[160px] h-auto"
            />
          </div>
          <button
            className="p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu links */}
        <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-180px)]">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200 group",
                pathname === link.href
                  ? "text-primary bg-secondary font-semibold"
                  : "text-foreground hover:text-primary hover:bg-secondary/50"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span>{link.label}</span>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform duration-200",
                pathname === link.href ? "text-primary" : "text-muted-foreground group-hover:translate-x-1"
              )} />
            </Link>
          ))}
        </div>

        {/* Menu footer with CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border bg-secondary/30">
          <a
            href="https://isi.badrabba.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-base font-semibold px-4 py-3.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>Espace Étudiant</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-muted-foreground mt-3">
            FSAC · Université Hassan II
          </p>
        </div>
      </div>
    </>
  )
}
