import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

async function isAuthenticated() {
    const cookieStore = await cookies()
    return cookieStore.get("admin_session")?.value === "authenticated"
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single()
        
        if (error || !data) return NextResponse.json({ error: "Non trouvé" }, { status: 404 })
        
        const transformedData = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            date: data.date,
            readTime: data.read_time,
            author: data.author,
            image: data.image,
            views: data.views,
            featured: data.featured
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching article:', error)
        return NextResponse.json({ error: "Non trouvé" }, { status: 404 })
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const { id } = await params
        const supabase = await createClient()
        const body = await req.json()
        
        const { data, error } = await supabase
            .from('articles')
            .update({
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                category: body.category,
                date: body.date,
                read_time: body.readTime,
                author: body.author,
                image: body.image,
                featured: body.featured
            })
            .eq('id', id)
            .select()
            .single()
        
        if (error) throw error
        
        const transformedData = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            date: data.date,
            readTime: data.read_time,
            author: data.author,
            image: data.image,
            views: data.views,
            featured: data.featured
        }
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error updating article:', error)
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    
    try {
        const { id } = await params
        const supabase = await createClient()
        
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id)
        
        if (error) throw error
        
        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error('Error deleting article:', error)
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
    }
}
