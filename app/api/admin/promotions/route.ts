import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { SUPABASE_CONFIGURED, readJSON } from "@/lib/db"

async function isAuthenticated() {
    const cookieStore = await cookies()
    return cookieStore.get("admin_session")?.value === "authenticated"
}

export async function GET() {
    if (!SUPABASE_CONFIGURED) {
        return NextResponse.json(readJSON("promotions.json") || [])
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .order('year', { ascending: true })
        
        if (error) throw error
        
        const transformedData = data.map((promo: any) => ({
            year: promo.year,
            name: promo.name,
            students: promo.students
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching promotions:', error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        // Delete all existing promotions and insert new ones
        await supabase.from('promotions').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        
        for (const promo of data) {
            await supabase.from('promotions').insert({
                year: promo.year,
                name: promo.name,
                students: promo.students
            })
        }
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving promotions:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
