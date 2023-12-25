import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

import prisma from '@/lib/db'

type Props = {}

const GetNotes = async (props: Props) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: notes } = await supabase.from('notes').select();

    const notesCopy = await prisma.notes.findMany();

    return (
        <>
            <pre>{JSON.stringify(notes, null, 2)}</pre>
            <pre>{JSON.stringify(notesCopy, null, 2)}</pre>
        </>
    )
}

export default GetNotes