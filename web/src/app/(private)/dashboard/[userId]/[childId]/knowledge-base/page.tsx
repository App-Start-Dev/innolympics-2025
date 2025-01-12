import { listFiles, deleteFile, uploadFiles, getFileDownloadUrl } from "@/actions/knowledge.base.action";
import KnowledgeBase from '@/components/knowledge-base/KnowledgeBase';

export default async function Page({
    params
}: {
    params: { childId: string }
}) {
    const childId = (await params).childId;
    return (
        <div className="container py-8">
            <KnowledgeBase childId={childId} />
        </div>
    );
}
