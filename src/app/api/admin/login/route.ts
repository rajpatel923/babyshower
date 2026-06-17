import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
    const form = await request.formData()
    const password = form.get('password')

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies()
        cookieStore.set('admin_token', process.env.ADMIN_PASSWORD!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        })
        redirect('/admin')
    }

    redirect('/admin?error=1')
}
