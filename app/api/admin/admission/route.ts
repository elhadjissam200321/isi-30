import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('admission')
            .select('*')
            .single()
        
        if (error) throw error
        
        const transformedData = {
            hero: data.hero,
            requirements: data.requirements,
            timeline: data.timeline,
            documents: data.documents,
            cta: data.cta
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching admission:', error)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        const { data: existing } = await supabase
            .from('admission')
            .select('id')
            .single()
        
        let result
        if (existing) {
            result = await supabase
                .from('admission')
                .update({
                    hero: data.hero,
                    requirements: data.requirements,
                    timeline: data.timeline,
                    documents: data.documents,
                    cta: data.cta
                })
                .eq('id', existing.id)
        } else {
            result = await supabase
                .from('admission')
                .insert({
                    hero: data.hero,
                    requirements: data.requirements,
                    timeline: data.timeline,
                    documents: data.documents,
                    cta: data.cta
                })
        }
        
        if (result.error) throw result.error
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving admission:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
