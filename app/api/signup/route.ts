import { createClient } from '@/utils/supabase/server'
import { headers, cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const { email, password, origin, phone } = await request.json()

        return NextResponse.json({ respones: 'ok' })
    } catch (error) {
        return NextResponse.json({ error, response: undefined })
    }
}