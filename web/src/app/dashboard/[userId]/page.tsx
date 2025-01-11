import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
    const token = (await cookies()).get('firebase_token')?.value;
    if (!token) {
        redirect('/');
    }

    return (
        <div>
            <p>Dashboard</p>
        </div>
    );
}
