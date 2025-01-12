'use server';

import api from '@/configs/axios.config';

interface Chat {
    _id: string;
    child_id: string;
    question: string;
    response: string;
    created_at: string;
}

interface ChatsResponse {
    data: Chat[];
}

interface ChatResponse {
    data: Chat;
}

export async function listChats(childId: string) {
    try {
        const response = await api.get<ChatsResponse>(`/chat/${childId}`);
        return {
            success: true,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || 'Failed to list chats'
        };
    }
}

export async function sendChat(childId: string, question: string) {
    try {
        const response = await api.post<ChatResponse>(`/chat/${childId}`, {
            question
        });
        return {
            success: true,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || 'Failed to send chat'
        };
    }
}