import { cookies } from 'next/headers'
import { sql } from '@vercel/postgres'

type RSVP = {
    id: number
    name: string
    phone: string
    guests: number
    attending: string
    created_at: string
}

async function getRsvps(): Promise<RSVP[]> {
    const { rows } = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`
    return rows as RSVP[]
}

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    const isAuthed = token && token === process.env.ADMIN_PASSWORD

    const params = await searchParams
    const hasError = params.error === '1'

    if (!isAuthed) {
        return (
            <div style={{
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f0eb',
                fontFamily: 'system-ui, sans-serif',
            }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '320px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                }}>
                    <h1 style={{ margin: '0 0 0.25rem', color: '#365744', fontSize: '1.5rem' }}>
                        Admin
                    </h1>
                    <p style={{ margin: '0 0 1.5rem', color: '#888', fontSize: '0.8rem' }}>
                        RSVP List · Baby Shower
                    </p>

                    {hasError && (
                        <p style={{
                            color: '#c0392b', fontSize: '0.8rem',
                            marginBottom: '1rem', fontWeight: 600,
                        }}>
                            Incorrect password.
                        </p>
                    )}

                    <form action="/api/admin/login" method="POST"
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            autoFocus
                            style={{
                                padding: '0.6rem 0.85rem',
                                border: '1px solid #ddd',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                background: '#365744', color: '#fff',
                                border: 'none', borderRadius: '0.5rem',
                                padding: '0.65rem', fontWeight: 700,
                                fontSize: '0.85rem', cursor: 'pointer',
                            }}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const rsvps = await getRsvps()

    const totalGuests = rsvps
        .filter(r => r.attending === 'yes')
        .reduce((sum, r) => sum + r.guests, 0)

    const attending = rsvps.filter(r => r.attending === 'yes').length
    const notAttending = rsvps.filter(r => r.attending === 'no').length
    const maybe = rsvps.filter(r => r.attending === 'maybe').length

    return (
        <div style={{
            minHeight: '100dvh',
            background: '#f5f0eb',
            fontFamily: 'system-ui, sans-serif',
            padding: '1.5rem 1rem',
        }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ margin: '0 0 0.25rem', color: '#365744', fontSize: '1.6rem' }}>
                        RSVP List
                    </h1>
                    <p style={{ margin: 0, color: '#888', fontSize: '0.8rem' }}>
                        Priya Patel · Baby Shower · August 9
                    </p>
                </div>

                {/* Summary cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                }}>
                    {[
                        { label: 'Total RSVPs', value: rsvps.length },
                        { label: 'Attending', value: attending },
                        { label: 'Not Attending', value: notAttending },
                        { label: 'Total Guests', value: totalGuests },
                    ].map(card => (
                        <div key={card.label} style={{
                            background: '#fff',
                            borderRadius: '0.75rem',
                            padding: '0.85rem 0.75rem',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#365744' }}>
                                {card.value}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {card.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Maybe count inline */}
                {maybe > 0 && (
                    <p style={{ fontSize: '0.75rem', color: '#a8825c', marginBottom: '1rem' }}>
                        {maybe} response{maybe > 1 ? 's' : ''} marked as &quot;Maybe&quot;
                    </p>
                )}

                {/* Table */}
                {rsvps.length === 0 ? (
                    <div style={{
                        background: '#fff', borderRadius: '0.75rem',
                        padding: '2rem', textAlign: 'center', color: '#aaa',
                        fontSize: '0.85rem',
                    }}>
                        No RSVPs yet.
                    </div>
                ) : (
                    <div style={{
                        background: '#fff',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        overflowX: 'auto',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                            <thead>
                                <tr style={{ background: '#f0ece8' }}>
                                    {['Name', 'Phone', 'Guests', 'Attending', 'Date'].map(h => (
                                        <th key={h} style={{
                                            padding: '0.7rem 1rem', textAlign: 'left',
                                            color: '#8c6d4b', fontWeight: 700,
                                            fontSize: '0.68rem', letterSpacing: '0.07em',
                                            textTransform: 'uppercase',
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rsvps.map((r, i) => (
                                    <tr key={r.id} style={{
                                        borderTop: '1px solid #f0ece8',
                                        background: i % 2 === 0 ? '#fff' : '#fdfaf8',
                                    }}>
                                        <td style={{ padding: '0.7rem 1rem', fontWeight: 600, color: '#333' }}>
                                            {r.name}
                                        </td>
                                        <td style={{ padding: '0.7rem 1rem', color: '#555' }}>
                                            {r.phone}
                                        </td>
                                        <td style={{ padding: '0.7rem 1rem', color: '#555', textAlign: 'center' }}>
                                            {r.guests}
                                        </td>
                                        <td style={{ padding: '0.7rem 1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase',
                                                background:
                                                    r.attending === 'yes' ? '#e6f4ed' :
                                                        r.attending === 'no' ? '#fde8e8' : '#fef4e6',
                                                color:
                                                    r.attending === 'yes' ? '#2d7a50' :
                                                        r.attending === 'no' ? '#c0392b' : '#b07d2a',
                                            }}>
                                                {r.attending}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.7rem 1rem', color: '#999', fontSize: '0.75rem' }}>
                                            {new Date(r.created_at).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Logout */}
                <form action="/api/admin/logout" method="POST" style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                    <button type="submit" style={{
                        background: 'transparent', border: 'none',
                        color: '#aaa', fontSize: '0.75rem', cursor: 'pointer',
                        textDecoration: 'underline',
                    }}>
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}
