import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export const POST = async (request: NextRequest) => {
    try {
        const { first_name, last_name, email, password, phone, origin } = await request.json()
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            }
        })

        if (error) {
            throw new Error(error.message);
        }

        const response = await prisma.customers.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number: phone,
            }
        })
        
        return NextResponse.json({ error: undefined, response })
    } catch (error) {
        return NextResponse.json({ error, response: undefined })
    }
}