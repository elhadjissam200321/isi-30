import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('alumni')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        const transformedData = data.map((alum: any) => ({
            id: alum.id,
            name: alum.name,
            role: alum.role,
            company: alum.company,
            quote: alum.quote,
            image: alum.image,
            year: alum.year
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching alumni:', error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const data = await request.json()
        
        // Delete all existing alumni and insert new ones
        await supabase.from('alumni').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        
        for (const alum of data) {
            await supabase.from('alumni').insert({
                name: alum.name,
                role: alum.role,
                company: alum.company,
                quote: alum.quote,
                image: alum.image,
                year: alum.year
            })
        }
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error saving alumni:', error)
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
