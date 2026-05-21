import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { SUPABASE_CONFIGURED, readJSON } from "@/lib/db"

export async function GET() {
    if (!SUPABASE_CONFIGURED) {
        return NextResponse.json(readJSON("programme.json") || {})
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('programme')
            .select('*')
            .single()
        
        if (error) throw error
        
        const transformedData = {
            hero: data.hero,
            quickInfo: data.quick_info,
            objectives: data.objectives,
            careerOutcomes: data.career_outcomes,
            semesterModules: data.semester_modules,
            s4Section: data.s4_section,
            cta: data.cta
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching programme:', error)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        const { data: existing } = await supabase
            .from('programme')
            .select('id')
            .single()
        
        let result
        if (existing) {
            result = await supabase
                .from('programme')
                .update({
                    hero: data.hero,
                    quick_info: data.quickInfo,
                    objectives: data.objectives,
                    career_outcomes: data.careerOutcomes,
                    semester_modules: data.semesterModules,
                    s4_section: data.s4Section,
                    cta: data.cta
                })
                .eq('id', existing.id)
        } else {
            result = await supabase
                .from('programme')
                .insert({
                    hero: data.hero,
                    quick_info: data.quickInfo,
                    objectives: data.objectives,
                    career_outcomes: data.careerOutcomes,
                    semester_modules: data.semesterModules,
                    s4_section: data.s4Section,
                    cta: data.cta
                })
        }
        
        if (result.error) throw result.error
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving programme:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
