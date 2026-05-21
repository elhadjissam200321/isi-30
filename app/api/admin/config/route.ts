import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { SUPABASE_CONFIGURED, readJSON } from "@/lib/db"

export async function GET() {
    if (!SUPABASE_CONFIGURED) {
        return NextResponse.json(readJSON("site-config.json") || {})
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('site_config')
            .select('*')
            .single()
        
        if (error) throw error
        
        const transformedData = {
            siteName: data.site_name,
            universityName: data.university_name,
            facultyName: data.faculty_name,
            universityUrl: data.university_url,
            socials: data.socials,
            navigation: data.navigation,
            footer: data.footer,
            customCss: data.custom_css
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching config:', error)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        const { data: existing } = await supabase
            .from('site_config')
            .select('id')
            .single()
        
        let result
        if (existing) {
            result = await supabase
                .from('site_config')
                .update({
                    site_name: data.siteName,
                    university_name: data.universityName,
                    faculty_name: data.facultyName,
                    university_url: data.universityUrl,
                    socials: data.socials,
                    navigation: data.navigation,
                    footer: data.footer,
                    custom_css: data.customCss
                })
                .eq('id', existing.id)
        } else {
            result = await supabase
                .from('site_config')
                .insert({
                    site_name: data.siteName,
                    university_name: data.universityName,
                    faculty_name: data.facultyName,
                    university_url: data.universityUrl,
                    socials: data.socials,
                    navigation: data.navigation,
                    footer: data.footer,
                    custom_css: data.customCss
                })
        }
        
        if (result.error) throw result.error
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving config:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
