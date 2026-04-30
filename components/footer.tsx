import Link from "next/link"
import { MapPin, Phone, Mail, Printer, ExternalLink } from "lucide-react"
import Image from "next/image"

import config from "@/data/site-config.json"
import contact from "@/data/contact.json"

export function Footer() {

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Neural network SVG background pattern */}
      <div className="relative overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Nodes */}
          {[
            [80, 60], [200, 40], [340, 80], [480, 50], [620, 70], [740, 45],
            [120, 150], [280, 130], [420, 160], [560, 140], [700, 155],
            [60, 250], [180, 230], [320, 260], [460, 240], [600, 255], [760, 235],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill="white" />
          ))}
          {/* Connections */}
          {[
            [80, 60, 200, 40], [200, 40, 340, 80], [340, 80, 480, 50],
            [480, 50, 620, 70], [620, 70, 740, 45],
            [120, 150, 280, 130], [280, 130, 420, 160], [420, 160, 560, 140],
            [560, 140, 700, 155],
            [60, 250, 180, 230], [180, 230, 320, 260], [320, 260, 460, 240],
            [460, 240, 600, 255], [600, 255, 760, 235],
            [80, 60, 120, 150], [200, 40, 280, 130], [340, 80, 420, 160],
            [480, 50, 560, 140], [620, 70, 700, 155],
            [120, 150, 60, 250], [280, 130, 180, 230], [420, 160, 320, 260],
            [560, 140, 460, 240], [700, 155, 600, 255],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" />
          ))}
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo-white.png"
                  alt="Master ISI Logo"
                  width={200}
                  height={100}
                  className="w-[200px] h-auto grayscale brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Formation d&apos;excellence en Intelligence Artificielle et Systèmes Intelligents.
                Diplôme national accrédité.
              </p>
              <div className="mt-5 space-y-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-white/50" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-white/50" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>



            {/* Master ISI */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 font-serif">Master ISI</h3>
              <ul className="space-y-2">
                {config.footer.masterLinks.map((link: any) => {
                  const isExternal = link.href.startsWith('http')
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 font-serif">Réseaux Sociaux</h3>
              <ul className="space-y-2">
                {Object.entries(config.socials).map(([name, url]: [string, any]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1 capitalize"
                    >
                      {name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-white/50">
          <span>© {new Date().getFullYear()} {config.siteName} – {config.facultyName}, {config.universityName}. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  )
}
