import fs from "fs"
import path from "path"

export const SUPABASE_CONFIGURED = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export function readJSON(filename: string) {
    try {
        const filePath = path.join(process.cwd(), "data", filename)
        return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    } catch {
        return null
    }
}
