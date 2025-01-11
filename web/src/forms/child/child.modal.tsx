'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ChildForm } from './child.form';
import { createChild, updateChild } from '@/actions/child.action';

type ChildModalProps = {
    initialData?: {
        id?: string;
        name: string;
        birthday: Date;
        sex: 'male' | 'female' | 'other';
        asdType: 'classic' | 'aspergers' | 'pdd-nos' | 'cdd' | 'rett' | 'none';
    };
    isUpdate?: boolean;
};

export function ChildModal({ initialData, isUpdate = false }: ChildModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        if (isUpdate) {
            await updateChild(formData);
        } else {
            await createChild(formData);
        }
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {isUpdate ? 'Edit Child' : 'Add Child'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? 'Edit Child Information' : 'Add New Child'}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdate
                            ? "Update the child's information here. Click save when you're done."
                            : "Enter the child's information here. Click create when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <ChildForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    isUpdate={isUpdate}
                />
            </DialogContent>
        </Dialog>
    );
}
