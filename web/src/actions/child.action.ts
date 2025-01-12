'use server';

import api from '@/configs/axios.config';
import { revalidatePath } from 'next/cache';

export type ASDType = 'autism' | 'aspergers' | 'pdd_nos' | 'rett' | 'cdd' | 'other';

interface CreateChildResponse {
    _id: string;
    name: string;
    birthday: string;
    sex: 'male' | 'female' | 'other';
    asd_type: ASDType;
    parent_uid: string;
    support_group_id: string;
    support_code: string;
    created_at: string;
    updated_at: string;
    files?: Array<{
        original_name: string;
        stored_name: string;
    }>;
    message?: string;
}

type ChildData = {
    id?: string;
    name: string;
    birthday: Date;
    sex: 'male' | 'female' | 'other';
    asdType: 'classic' | 'aspergers' | 'pdd-nos' | 'cdd' | 'rett' | 'none';
};

export async function createChild(formData: FormData) {
    try {
        // Convert the birthday to the correct format (YYYY-MM-DD)
        const birthday = formData.get('birthday');
        if (birthday) {
            const date = new Date(birthday as string);
            formData.set('birthday', date.toISOString().split('T')[0]);
        }

        // Convert asdType to asd_type and ensure correct value
        const asdType = formData.get('asdType');
        if (asdType) {
            formData.set('asd_type', asdType as string);
            formData.delete('asdType');
        }

        // Log form data for debugging
        console.log('Form data before submission:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await api.post<CreateChildResponse>('/child', formData);

        revalidatePath('/dashboard');
        return { success: true, data: response.data, message: response.data.message || 'Child created successfully' };
    } catch (error: any) {
        console.error('Error creating child:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to create child'
        };
    }
}

export async function updateChild(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        if (!id) {
            throw new Error('Child ID is required');
        }

        // Create update data object
        const updateData: Record<string, any> = {};

        // Add name if present
        const name = formData.get('name');
        if (name) {
            updateData.name = name;
        }

        // Add and format birthday if present
        const birthday = formData.get('birthday');
        if (birthday) {
            const date = new Date(birthday as string);
            updateData.birthday = date.toISOString().split('T')[0];
        }

        // Add sex if present
        const sex = formData.get('sex');
        if (sex) {
            updateData.sex = sex;
        }

        // Convert asdType to asd_type if present
        const asdType = formData.get('asdType');
        if (asdType) {
            updateData.asd_type = asdType;
        }

        // Make the API call
        const response = await api.put<CreateChildResponse>(`/child/${id}`, updateData);

        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: 'Child updated successfully' 
        };
    } catch (error: any) {
        console.error('Error updating child:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to update child'
        };
    }
}

export async function getChildren() {
    try {
        const response = await api.get('/child');
        const children = response.data;
        return children;
    } catch (error) {
        console.error('Error fetching children:', error);
        throw new Error('Failed to fetch children');
    }
}

export async function deleteChild(id: string) {
    try {
        const response = await api.delete(`/child/${id}`);
        revalidatePath('/dashboard');
    } catch (error) {
        console.error('Error deleting child:', error);
        throw new Error('Failed to delete child');
    }
}
