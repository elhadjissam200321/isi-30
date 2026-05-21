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
            .from('alumni_companies')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        const transformedData = data.map((company: any) => ({
            id: company.id,
            name: company.name,
            logo: company.logo
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching alumni companies:', error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const body = await request.json()
        
        const { data, error } = await supabase
            .from('alumni_companies')
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
        console.error('Error creating alumni company:', error)
        return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const { id } = await request.json()
        
        const { error } = await supabase
            .from('alumni_companies')
            .delete()
            .eq('id', id)
        
        if (error) throw error
        
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Error deleting alumni company:', error)
        return NextResponse.json({ error: "Failed to delete company" }, { status: 500 })
    }
}
