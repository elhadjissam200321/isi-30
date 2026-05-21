import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { SUPABASE_CONFIGURED, readJSON } from "@/lib/db"

export async function GET() {
    if (!SUPABASE_CONFIGURED) {
        return NextResponse.json(readJSON("contact.json") || {})
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('contact')
            .select('*')
            .single()
        
        if (error) throw error
        
        const transformedData = {
            hero: data.hero,
            info: data.info,
            form: data.form
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching contact:', error)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        const { data: existing } = await supabase
            .from('contact')
            .select('id')
            .single()
        
        let result
        if (existing) {
            result = await supabase
                .from('contact')
                .update({
                    hero: data.hero,
                    info: data.info,
                    form: data.form
                })
                .eq('id', existing.id)
        } else {
            result = await supabase
                .from('contact')
                .insert({
                    hero: data.hero,
                    info: data.info,
                    form: data.form
                })
        }
        
        if (result.error) throw result.error
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving contact:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
