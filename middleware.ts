import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

const SUPABASE_CONFIGURED = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip Supabase session handling if not configured
    if (!SUPABASE_CONFIGURED) {
        return NextResponse.next()
    }

    // Refresh session
    let response = await updateSession(request)

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }

    return response
}

export const config = {
    matcher: ["/admin/:path*"],
}
