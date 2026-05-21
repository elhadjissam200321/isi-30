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
        return NextResponse.json(readJSON("teachers.json") || [])
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        // Transform database rows to match expected JSON structure
        const transformedData = data.map((teacher: any) => ({
            id: teacher.id,
            name: teacher.name,
            title: teacher.title,
            role: teacher.role,
            speciality: teacher.speciality,
            color: teacher.color,
            photo: teacher.photo
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching teachers:', error)
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
            .from('teachers')
            .insert({
                name: body.name,
                title: body.title,
                role: body.role,
                speciality: body.speciality,
                color: body.color,
                photo: body.photo
            })
            .select()
            .single()
        
        if (error) throw error
        
        const transformedData = {
            id: data.id,
            name: data.name,
            title: data.title,
            role: data.role,
            speciality: data.speciality,
            color: data.color,
            photo: data.photo
        }
        
        return NextResponse.json(transformedData, { status: 201 })
    } catch (error) {
        console.error('Error creating teacher:', error)
        return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const supabase = await createClient()
        const body = await req.json()
        
        const { data, error } = await supabase
            .from('teachers')
            .update({
                name: body.name,
                title: body.title,
                role: body.role,
                speciality: body.speciality,
                color: body.color,
                photo: body.photo
            })
            .eq('id', body.id)
            .select()
            .single()
        
        if (error) throw error
        
        const transformedData = {
            id: data.id,
            name: data.name,
            title: data.title,
            role: data.role,
            speciality: data.speciality,
            color: data.color,
            photo: data.photo
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error updating teacher:', error)
        return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 })
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
            .from('teachers')
            .delete()
            .eq('id', id)
        
        if (error) throw error
        
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Error deleting teacher:', error)
        return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 })
    }
}
