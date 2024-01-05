import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json()
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw new Error(error.message);
        }

        const response = await prisma.customers.findFirst({
            where: {
                email
            }
        })

        if (!response) {
            throw new Error('Customer not found')
        }

        return NextResponse.json({ error: undefined, response })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, response: undefined })
    }
}