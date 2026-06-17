import { sql } from '@vercel/postgres'
import { z } from 'zod'

const Schema = z.object({
    name:      z.string().min(1),
    phone:     z.string().min(1),
    guests:    z.coerce.number().int().min(1).max(20),
    attending: z.enum(['yes', 'no', 'maybe']),
})

export async function POST(request: Request) {
    try {
        const parsed = Schema.safeParse(await request.json())
        if (!parsed.success)
            return Response.json({ error: 'Invalid fields' }, { status: 400 })

        const { name, phone, guests, attending } = parsed.data
        await sql`
            INSERT INTO rsvps (name, phone, guests, attending)
            VALUES (${name}, ${phone}, ${guests}, ${attending})
        `

        return Response.json({ success: true }, { status: 201 })
    } catch (err) {
        console.error('[/api/rsvp]', err)
        return Response.json({ error: 'Server error' }, { status: 500 })
    }
}
