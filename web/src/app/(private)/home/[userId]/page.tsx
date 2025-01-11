import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
    const token = (await cookies()).get('firebase_token')?.value;
    if (!token) {
        redirect('/');
    }

    return (
        <div className="h-svh flex w-full max-w-screen-2xl flex-col">
            <div>
                <span>How can I help you?</span>
                <span>Select a category or type your question</span>
            </div>
            <span>CHILD</span>
        </div>
    );
}
