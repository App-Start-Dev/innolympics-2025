'use server';

import api from '@/configs/axios.config';
import { revalidatePath } from 'next/cache';

interface UploadedFile {
    original_name: string;
    stored_name: string;
    content_type: string;
}

interface UploadResponse {
    message: string;
    files: UploadedFile[];
}

interface FileInfo {
    filename: string;
    size: number;
    last_modified: string;
    url: string;
}

export async function uploadFiles(childId: string, formData: FormData) {
    try {
        const response = await api.post<UploadResponse>(
            `/knowledge-base/${childId}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        revalidatePath('/dashboard');
        return {
            success: true,
            data: response.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || error.message || 'Failed to upload files'
        };
    }
}

export async function listFiles(childId: string) {
    try {
        console.log(childId);
        const response = await api.get<{files: FileInfo[]}>(`/knowledge-base/${childId}/files`);
        return {
            success: true,
            data: response.data.files
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || error.message || 'Failed to list files'
        };
    }
}

export async function deleteFile(childId: string, filename: string) {
    try {
        const response = await api.delete(`/knowledge-base/${childId}/files/${filename}`);
        revalidatePath('/dashboard');
        return {
            success: true,
            data: response.data,
            message: 'File deleted successfully'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || error.message || 'Failed to delete file'
        };
    }
}

// Helper function to get file download URL (if needed)
export async function getFileDownloadUrl(childId: string, filename: string): string {
    return `/api/knowledge-base/${childId}/files/${filename}`;
}
