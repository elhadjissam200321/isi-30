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
        return NextResponse.json(readJSON("articles.json") || [])
    }
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        // Transform database rows to match expected JSON structure
        const transformedData = data.map((article: any) => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            date: article.date,
            readTime: article.read_time,
            author: article.author,
            image: article.image,
            views: article.views,
            featured: article.featured
        }))
        
        return NextResponse.json(transformedData)
    } catch (error) {
        console.error('Error fetching articles:', error)
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
        
        // Generate slug from title if not provided
        const slug = body.slug || body.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        
        const { data, error } = await supabase
            .from('articles')
            .insert({
                slug,
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                category: body.category,
                date: body.date,
                read_time: body.readTime,
                author: body.author,
                image: body.image,
                views: 0,
                featured: body.featured || false
            })
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
        
        return NextResponse.json(transformedData, { status: 201 })
    } catch (error) {
        console.error('Error creating article:', error)
        return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
    }
}
