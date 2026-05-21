import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

async function isAuthenticated() {
    const cookieStore = await cookies()
    return cookieStore.get("admin_session")?.value === "authenticated"
}

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('partners')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        const transformedData = data.map((partner: any) => ({
            id: partner.id,
            name: partner.name,
            logo: partner.logo
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching partners:', error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const body = await req.json()
        
        const { data, error } = await supabase
            .from('partners')
            .insert({
                name: body.name,
                logo: body.logo
            })
            .select()
            .single()
        
        if (error) throw error
        
        const transformedData = {
            id: data.id,
            name: data.name,
            logo: data.logo
        }
        
        return NextResponse.json(transformedData, { status: 201 })
    } catch (error) {
        console.error('Error creating partner:', error)
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const { id } = await req.json()
        
        const { error } = await supabase
            .from('partners')
            .delete()
            .eq('id', id)
        
        if (error) throw error
        
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Error deleting partner:', error)
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 })
    }
}
