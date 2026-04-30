import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "alumni-companies.json")

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, "utf-8")
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}
