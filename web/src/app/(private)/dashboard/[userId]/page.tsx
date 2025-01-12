import ChildModal from '@/forms/child';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getChildren } from '@/actions/child.action';
import { ChildrenList } from '@/components/dashboard/child.dashboard';
import JoinSupportGroupModal from '@/components/dashboard/join.support.group';

export default async function Page({ params }: { params: { userId: string } }) {
    const userId = (await params).userId;
    const token = (await cookies()).get('firebase_token')?.value;
    if (!token) {
        redirect('/');
    }

    const children = await getChildren();
    console.log(children);

    return (
        <div>
            <ChildrenList data={children} userId={userId} />
            <ChildModal />
            <JoinSupportGroupModal />
        </div>
    );
}
