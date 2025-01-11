import ChildModal from '@/forms/child';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
    const token = (await cookies()).get('firebase_token')?.value;
    if (!token) {
        redirect('/');
    }

    return (
        <div>
            <ChildModal />
            <ChildModal
                initialData={{
                    name: 'John',
                    birthday: new Date(),
                    sex: 'male',
                    asdType: 'none',
                }}
                isUpdate
            />
        </div>
    );
}
