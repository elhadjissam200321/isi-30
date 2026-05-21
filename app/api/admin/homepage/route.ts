import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('homepage')
            .select('*')
            .single()
        
        if (error) throw error
        
        // Transform database row to match expected JSON structure
        const transformedData = {
            hero: data.hero,
            stats: data.stats,
            pillars: data.pillars,
            why_isi: data.why_isi,
            coordinator: data.coordinator,
            alumni_section: data.alumni_section,
            partners_section: data.partners_section,
            pillars_section: data.pillars_section,
            news_section: data.news_section,
            cta_band: data.cta_band
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching homepage:', error)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        // Check if homepage record exists
        const { data: existing } = await supabase
            .from('homepage')
            .select('id')
            .single()
        
        let result
        if (existing) {
            // Update existing record
            result = await supabase
                .from('homepage')
                .update({
                    hero: data.hero,
                    stats: data.stats,
                    pillars: data.pillars,
                    why_isi: data.why_isi,
                    coordinator: data.coordinator,
                    alumni_section: data.alumni_section,
                    partners_section: data.partners_section,
                    pillars_section: data.pillars_section,
                    news_section: data.news_section,
                    cta_band: data.cta_band
                })
                .eq('id', existing.id)
        } else {
            // Insert new record
            result = await supabase
                .from('homepage')
                .insert({
                    hero: data.hero,
                    stats: data.stats,
                    pillars: data.pillars,
                    why_isi: data.why_isi,
                    coordinator: data.coordinator,
                    alumni_section: data.alumni_section,
                    partners_section: data.partners_section,
                    pillars_section: data.pillars_section,
                    news_section: data.news_section,
                    cta_band: data.cta_band
                })
        }
        
        if (result.error) throw result.error
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving homepage:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
