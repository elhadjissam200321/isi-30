import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Read JSON file
function readJSON(filename: string) {
  const filePath = path.join(process.cwd(), 'data', filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

async function migrate() {
  console.log('Starting migration to Supabase...')

  try {
    // 1. Migrate site_config
    console.log('Migrating site_config...')
    const siteConfig = readJSON('site-config.json')
    const { error: siteConfigError } = await supabase
      .from('site_config')
      .insert({
        site_name: siteConfig.siteName,
        university_name: siteConfig.universityName,
        faculty_name: siteConfig.facultyName,
        university_url: siteConfig.universityUrl,
        socials: siteConfig.socials,
        navigation: siteConfig.navigation,
        footer: siteConfig.footer
      })
    if (siteConfigError) console.error('Error migrating site_config:', siteConfigError)
    else console.log('✓ site_config migrated')

    // 2. Migrate homepage
    console.log('Migrating homepage...')
    const homepage = readJSON('homepage.json')
    const { error: homepageError } = await supabase
      .from('homepage')
      .insert({
        hero: homepage.hero,
        stats: homepage.stats,
        pillars: homepage.pillars,
        why_isi: homepage.why_isi,
        coordinator: homepage.coordinator,
        alumni_section: homepage.alumni_section,
        partners_section: homepage.partners_section,
        pillars_section: homepage.pillars_section,
        news_section: homepage.news_section,
        cta_band: homepage.cta_band
      })
    if (homepageError) console.error('Error migrating homepage:', homepageError)
    else console.log('✓ homepage migrated')

    // 3. Migrate articles
    console.log('Migrating articles...')
    const articles = readJSON('articles.json')
    for (const article of articles) {
      const { error: articleError } = await supabase
        .from('articles')
        .insert({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          date: article.date,
          read_time: article.readTime,
          author: article.author,
          image: article.image,
          views: article.views || 0,
          featured: article.featured || false
        })
      if (articleError) console.error(`Error migrating article ${article.title}:`, articleError)
    }
    console.log('✓ articles migrated')

    // 4. Migrate teachers
    console.log('Migrating teachers...')
    const teachers = readJSON('teachers.json')
    for (const teacher of teachers) {
      const { error: teacherError } = await supabase
        .from('teachers')
        .insert({
          name: teacher.name,
          title: teacher.title,
          role: teacher.role,
          speciality: teacher.speciality,
          color: teacher.color,
          photo: teacher.photo
        })
      if (teacherError) console.error(`Error migrating teacher ${teacher.name}:`, teacherError)
    }
    console.log('✓ teachers migrated')

    // 5. Migrate partners
    console.log('Migrating partners...')
    const partners = readJSON('partners.json')
    for (const partner of partners) {
      const { error: partnerError } = await supabase
        .from('partners')
        .insert({
          name: partner.name,
          logo: partner.logo
        })
      if (partnerError) console.error(`Error migrating partner ${partner.name}:`, partnerError)
    }
    console.log('✓ partners migrated')

    // 6. Migrate programme
    console.log('Migrating programme...')
    const programme = readJSON('programme.json')
    const { error: programmeError } = await supabase
      .from('programme')
      .insert({
        hero: programme.hero,
        quick_info: programme.quickInfo,
        objectives: programme.objectives,
        career_outcomes: programme.careerOutcomes,
        semester_modules: programme.semesterModules,
        s4_section: programme.s4Section,
        cta: programme.cta
      })
    if (programmeError) console.error('Error migrating programme:', programmeError)
    else console.log('✓ programme migrated')

    // 7. Migrate admission
    console.log('Migrating admission...')
    const admission = readJSON('admission.json')
    const { error: admissionError } = await supabase
      .from('admission')
      .insert({
        hero: admission.hero,
        requirements: admission.requirements,
        timeline: admission.timeline,
        documents: admission.documents,
        cta: admission.cta
      })
    if (admissionError) console.error('Error migrating admission:', admissionError)
    else console.log('✓ admission migrated')

    // 8. Migrate alumni
    console.log('Migrating alumni...')
    const alumni = readJSON('alumni.json')
    for (const alum of alumni) {
      const { error: alumError } = await supabase
        .from('alumni')
        .insert({
          name: alum.name,
          role: alum.role,
          company: alum.company,
          quote: alum.quote,
          image: alum.image,
          year: alum.year
        })
      if (alumError) console.error(`Error migrating alumni ${alum.name}:`, alumError)
    }
    console.log('✓ alumni migrated')

    // 9. Migrate alumni-companies
    console.log('Migrating alumni-companies...')
    const alumniCompanies = readJSON('alumni-companies.json')
    for (const company of alumniCompanies) {
      const { error: companyError } = await supabase
        .from('alumni_companies')
        .insert({
          name: company.name,
          logo: company.logo
        })
      if (companyError) console.error(`Error migrating alumni company ${company.name}:`, companyError)
    }
    console.log('✓ alumni-companies migrated')

    // 10. Migrate promotions
    console.log('Migrating promotions...')
    const promotions = readJSON('promotions.json')
    for (const promo of promotions) {
      const { error: promoError } = await supabase
        .from('promotions')
        .insert({
          year: promo.year,
          name: promo.name,
          students: promo.students
        })
      if (promoError) console.error(`Error migrating promotion ${promo.year}:`, promoError)
    }
    console.log('✓ promotions migrated')

    // 11. Migrate contact
    console.log('Migrating contact...')
    const contact = readJSON('contact.json')
    const { error: contactError } = await supabase
      .from('contact')
      .insert({
        hero: contact.hero,
        info: contact.info,
        form: contact.form
      })
    if (contactError) console.error('Error migrating contact:', contactError)
    else console.log('✓ contact migrated')

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()
