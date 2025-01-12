'use server';

import api from '@/configs/axios.config';
import { revalidatePath } from 'next/cache';

interface SupportGroupMember {
    uid: string;
    name: string;
    role: string;
    joined_at: string;
}

interface SupportGroupResponse {
    child_name: string;
    support_code: string;
    members: SupportGroupMember[];
}

export async function joinSupportGroup(code: string) {
    try {
        const response = await api.post('/support-group/join', { code });
        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: `Successfully joined ${response.data.child_name}'s support group` 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to join support group'
        };
    }
}

export async function getSupportGroupMembers(childId: string) {
    try {
        const response = await api.get<SupportGroupResponse>(`/support-group/${childId}/members`);
        return { 
            success: true, 
            data: response.data 
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to get support group members'
        };
    }
}

export async function updateMemberName(childId: string, memberUid: string, newName: string) {
    try {
        const response = await api.put(`/support-group/${childId}/members/${memberUid}/name`, { name: newName });
        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: 'Member name updated successfully'
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to update member name'
        };
    }
}

export async function updateMemberRole(childId: string, memberUid: string, newRole: string) {
    try {
        const response = await api.put(`/support-group/${childId}/members/${memberUid}/role`, { role: newRole });
        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: 'Member role updated successfully'
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to update member role'
        };
    }
}

export async function removeMember(childId: string, memberUid: string) {
    try {
        const response = await api.delete(`/support-group/${childId}/members/${memberUid}`);
        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: 'Member removed successfully'
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to remove member'
        };
    }
}

export async function regenerateSupportCode(childId: string) {
    try {
        const response = await api.post(`/support-group/${childId}/code`);
        revalidatePath('/dashboard');
        return { 
            success: true, 
            data: response.data,
            message: 'Support code regenerated successfully'
        };
    } catch (error: any) {
        return { 
            success: false, 
            message: error.response?.data?.error || error.message || 'Failed to regenerate support code'
        };
    }
}