'use server';

import { revalidatePath } from 'next/cache';

type ASDType = 'classic' | 'aspergers' | 'pdd-nos' | 'cdd' | 'rett' | 'none';

type ChildData = {
    id?: string;
    name: string;
    birthday: Date;
    sex: 'male' | 'female' | 'other';
    asdType: ASDType;
};

export async function createChild(formData: FormData) {
    // TODO: Implement actual data storage logic
    const name = formData.get('name') as string;
    const birthday = new Date(formData.get('birthday') as string);
    const sex = formData.get('sex') as 'male' | 'female' | 'other';
    const file = formData.get('file') as File;
    const asdType = formData.get('asdType') as ASDType;

    console.log('Creating child:', { name, birthday, sex, file, asdType });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath('/children');
    return { success: true, message: 'Child created successfully' };
}

export async function updateChild(formData: FormData) {
    // TODO: Implement actual data update logic
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const birthday = new Date(formData.get('birthday') as string);
    const sex = formData.get('sex') as 'male' | 'female' | 'other';
    const asdType = formData.get('asdType') as ASDType;

    console.log('Updating child:', { id, name, birthday, sex, asdType });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath('/children');
    return { success: true, message: 'Child updated successfully' };
}
