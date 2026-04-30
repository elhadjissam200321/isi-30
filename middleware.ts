import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

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
