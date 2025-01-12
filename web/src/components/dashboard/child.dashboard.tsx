"use client";

interface Child {
    _id: string;
    name: string;
    birthday: string;
    sex: 'male' | 'female' | 'other';
    asd_type: string;
    support_code: string;
    parent_uid: string;
    support_group_id: string;
    created_at: string;
    updated_at: string;
}

import ChildModal from "@/forms/child";
import { Button } from "@/components/ui/button";
import { deleteChild } from "@/actions/child.action";
import Link from "next/link";



export const ChildrenList = ({ data, userId }: { data: Child[], userId: string }) => {
    const formatDate = (dateString: string) => {
        try {
            const [year, month, day] = dateString.split('-');
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(Number(year), Number(month) - 1, Number(day)));
        } catch {
            return dateString;
        }
    };

    const formatChildForUpdate = (child: Child) => {
        const [year, month, day] = child.birthday.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        
        return {
            id: child._id,
            name: child.name,
            birthday: date,
            sex: child.sex,
            asdType: child.asd_type,
        };
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((child) => (
                <div 
                    key={child._id}
                    className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">{child.name}</h3>
                        <ChildModal 
                            initialData={formatChildForUpdate(child)} 
                            isUpdate 
                        />
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>
                            <span className="font-medium">Birthday:</span>{' '}
                            {formatDate(child.birthday)}
                        </p>
                        <p>
                            <span className="font-medium">Sex:</span>{' '}
                            {child.sex.charAt(0).toUpperCase() + child.sex.slice(1)}
                        </p>
                        <p>
                            <span className="font-medium">ASD Type:</span>{' '}
                            {child.asd_type.toUpperCase()}
                        </p>
                        <p>
                            <span className="font-medium">Support Code:</span>{' '}
                            {child.support_code}
                        </p>
                    </div>
                    <Button variant="destructive" onClick={() => deleteChild(child._id)}>Delete</Button>
                    <Link href={`/dashboard/${userId}/${child._id}`}>VIEW</Link>
                </div>
            ))}
        </div>
    );
};