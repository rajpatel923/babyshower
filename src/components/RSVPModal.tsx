'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Props = { onClose: () => void }
type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

const STORAGE_KEY = 'rsvp_submitted'

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring' as const, damping: 22, stiffness: 280, delay: 0.05 },
    },
    exit: { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.18 } },
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1c4b8',
    borderRadius: '0.5rem',
    fontFamily: 'var(--font-lato)',
    fontSize: '0.875rem',
    color: '#3d3d3d',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-lato)',
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.09em',
    color: '#8c6d4b',
    textTransform: 'uppercase',
    marginBottom: '0.35rem',
}

export default function RSVPModal({ onClose }: Props) {
    const [status, setStatus] = useState<Status>('idle')
    const [form, setForm] = useState({ name: '', phone: '', guests: '1', attending: 'yes' })
    const [submittedAttending, setSubmittedAttending] = useState('yes')
    const backdropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = prev }
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')
        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, guests: Number(form.guests) }),
            })
            if (res.status === 409) {
                localStorage.setItem(STORAGE_KEY, '1')
                setStatus('duplicate')
                return
            }
            if (!res.ok) throw new Error()
            localStorage.setItem(STORAGE_KEY, '1')
            setSubmittedAttending(form.attending)
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    return (
        <motion.div
            ref={backdropRef}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
            style={{
                position: 'fixed', inset: 0, zIndex: 50,
                background: 'rgba(54, 87, 68, 0.6)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#fdfdfc',
                    borderRadius: '1.25rem',
                    padding: '1.75rem 1.5rem 1.5rem',
                    width: '100%',
                    maxWidth: '360px',
                    maxHeight: 'calc(90dvh - 2rem)',
                    overflowY: 'auto',
                    boxShadow: '0 20px 60px rgba(54,87,68,0.3)',
                    position: 'relative',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: '#a37c58', fontSize: '1.4rem', lineHeight: 1,
                        padding: '0.2rem 0.4rem', borderRadius: '0.25rem',
                    }}
                >
                    ×
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-dancing)',
                        color: '#365744',
                        fontSize: 'clamp(2rem, 8vw, 2.5rem)',
                        margin: 0,
                        lineHeight: 1.1,
                    }}>
                        RSVP
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-lato)',
                        color: '#a8825c',
                        fontSize: '0.72rem',
                        margin: '0.3rem 0 0',
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                    }}>
                        Honoring Priya Patel · Aug 9
                    </p>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: '#e8ddd4', marginBottom: '1.25rem' }} />

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '0.75rem 0 0.5rem' }}>
                        <p style={{
                            fontFamily: 'var(--font-dancing)',
                            color: submittedAttending === 'no' ? '#a8825c' : '#365744',
                            fontSize: 'clamp(1.6rem, 7vw, 2rem)',
                            margin: '0 0 0.5rem',
                        }}>
                            {submittedAttending === 'no' ? 'We\'ll miss you!' : 'Thank you!'}
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-lato)',
                            color: '#5c5c5c',
                            fontSize: '0.8rem',
                            margin: '0 0 1.5rem',
                            lineHeight: 1.5,
                        }}>
                            {submittedAttending === 'no'
                                ? 'Sorry you can\'t make it. We appreciate you letting us know!'
                                : submittedAttending === 'maybe'
                                    ? 'Thanks for letting us know. We hope to see you there!'
                                    : 'We can\'t wait to celebrate with you.'}
                        </p>
                        <button
                            onClick={onClose}
                            style={{
                                background: '#365744', color: '#fff', border: 'none',
                                borderRadius: '9999px', padding: '0.5rem 1.75rem',
                                fontFamily: 'var(--font-lato)', fontWeight: 700,
                                fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.07em',
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : status === 'duplicate' ? (
                    <div style={{ textAlign: 'center', padding: '0.75rem 0 0.5rem' }}>
                        <p style={{
                            fontFamily: 'var(--font-dancing)',
                            color: '#a8825c',
                            fontSize: 'clamp(1.4rem, 6vw, 1.8rem)',
                            margin: '0 0 0.5rem',
                        }}>
                            Already RSVP&apos;d!
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-lato)',
                            color: '#5c5c5c',
                            fontSize: '0.8rem',
                            margin: '0 0 1.5rem',
                            lineHeight: 1.5,
                        }}>
                            We already have your response on file.
                        </p>
                        <button
                            onClick={onClose}
                            style={{
                                background: '#a8825c', color: '#fff', border: 'none',
                                borderRadius: '9999px', padding: '0.5rem 1.75rem',
                                fontFamily: 'var(--font-lato)', fontWeight: 700,
                                fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.07em',
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Name */}
                        <div>
                            <label style={labelStyle}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your full name"
                                style={inputStyle}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label style={labelStyle}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="(555) 000-0000"
                                style={inputStyle}
                            />
                        </div>

                        {/* Guests */}
                        <div>
                            <label style={labelStyle}>Number of Guests</label>
                            <select
                                name="guests"
                                value={form.guests}
                                onChange={handleChange}
                                style={{
                                    ...inputStyle,
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23a37c58' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    paddingRight: '2rem',
                                }}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        {/* Attending */}
                        <div>
                            <label style={labelStyle}>Will you attend?</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {(['yes', 'no', 'maybe'] as const).map(opt => (
                                    <label
                                        key={opt}
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '0.45rem 0',
                                            borderRadius: '9999px',
                                            border: '1.5px solid',
                                            borderColor: form.attending === opt ? '#365744' : '#d1c4b8',
                                            background: form.attending === opt ? '#365744' : 'transparent',
                                            color: form.attending === opt ? '#fff' : '#8c6d4b',
                                            fontFamily: 'var(--font-lato)',
                                            fontWeight: 700,
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.07em',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease',
                                            userSelect: 'none',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="attending"
                                            value={opt}
                                            checked={form.attending === opt}
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                        />
                                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {status === 'error' && (
                            <p style={{
                                color: '#c0392b',
                                fontFamily: 'var(--font-lato)',
                                fontSize: '0.75rem',
                                margin: 0,
                            }}>
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            style={{
                                background: status === 'submitting' ? '#7a9b87' : '#365744',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '9999px',
                                padding: '0.6rem 1.5rem',
                                fontFamily: 'var(--font-lato)',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                letterSpacing: '0.07em',
                                marginTop: '0.1rem',
                                transition: 'background 0.2s ease',
                                width: '100%',
                            }}
                        >
                            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    )
}
