"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChildren } from "@/actions/child.action";
import { listChats, sendChat } from "@/actions/chat.action";
import { joinSupportGroup } from "@/actions/support.group.action";

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

interface Chat {
    _id: string;
    child_id: string;
    question: string;
    response: string;
    created_at: string;
}

export default function Page() {
    const { userId, childId } = useParams(); // Extract childId from the URL
    const router = useRouter();
    const [child, setChild] = useState<Child | null>(null);
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<Chat[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [supportCode, setSupportCode] = useState("");
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all children
                const children = await getChildren();
                // Find the child with the matching childId
                const selectedChild = children.find((c: Child) => c._id === childId);
                setChild(selectedChild || null);

                // Fetch chats
                if (selectedChild) {
                    const result = await listChats(childId as string);
                    if (result.success) {
                        setChats(result.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [childId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        setSending(true);
        try {
            const result = await sendChat(childId as string, newMessage);
            if (result.success) {
                // Refresh chat list
                const chatsResult = await listChats(childId as string);
                if (chatsResult.success) {
                    setChats(chatsResult.data);
                }
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    };

    const handleJoinSupportGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supportCode.trim() || joining) return;

        setJoining(true);
        setError("");
        setSuccess("");

        try {
            const result = await joinSupportGroup(supportCode.trim());
            if (result.success) {
                setSuccess(result.message);
                setSupportCode("");
                // Refresh child data to get updated support group status
                const children = await getChildren();
                const selectedChild = children.find((c: Child) => c._id === childId);
                setChild(selectedChild || null);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to join support group");
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!child) {
        return <p>Child not found.</p>;
    }

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{child.name}'s Dashboard</h1>
            
            {/* Child Information */}
            <div className="space-y-2 text-gray-700 mb-8">
                <p>
                    <span className="font-medium">Birthday:</span> {formatDate(child.birthday)}
                </p>
                <p>
                    <span className="font-medium">Sex:</span>{' '}
                    {child.sex.charAt(0).toUpperCase() + child.sex.slice(1)}
                </p>
                <p>
                    <span className="font-medium">ASD Type:</span> {child.asd_type.toUpperCase()}
                </p>
                <p>
                    <span className="font-medium">Support Code:</span> {child.support_code}
                </p>
                <p>
                    <span className="font-medium">Parent UID:</span> {child.parent_uid}
                </p>
                <p>
                    <span className="font-medium">Support Group ID:</span> {child.support_group_id}
                </p>
                <p>
                    <span className="font-medium">Created At:</span>{' '}
                    {new Date(child.created_at).toLocaleString()}
                </p>
                <p>
                    <span className="font-medium">Updated At:</span>{' '}
                    {new Date(child.updated_at).toLocaleString()}
                </p>
            </div>

            {/* Join Support Group Section */}
            {!child.support_group_id && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Join Support Group</h2>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                            {success}
                        </div>
                    )}
                    
                    <form onSubmit={handleJoinSupportGroup} className="space-y-4">
                        <div>
                            <label htmlFor="supportCode" className="block text-sm font-medium text-gray-700 mb-1">
                                Support Code
                            </label>
                            <input
                                id="supportCode"
                                type="text"
                                value={supportCode}
                                onChange={(e) => setSupportCode(e.target.value)}
                                placeholder="Enter support code"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={joining}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            disabled={joining}
                        >
                            {joining ? "Joining..." : "Join Support Group"}
                        </button>
                    </form>
                </div>
            )}

            {/* Chat Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Chat with AI Assistant</h2>
                
                {/* Chat Messages */}
                <div className="bg-white rounded-lg shadow p-4 mb-4 h-[400px] overflow-y-auto">
                    {chats.map((chat) => (
                        <div key={chat._id} className="mb-4">
                            <div className="flex flex-col gap-2">
                                <div className="bg-blue-100 p-3 rounded-lg max-w-[80%] self-end">
                                    <p className="text-sm text-gray-800">{chat.question}</p>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                                    <p className="text-sm text-gray-800">{chat.response}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={sending}
                    >
                        {sending ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>

            <button 
              onClick={() => {
                router.push(`/dashboard/${userId}/${childId}/knowledge-base`);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              View Documents
            </button>
            <button 
              onClick={() => {
                router.push(`/dashboard/${userId}/${childId}/support-group`);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                Support Group
            </button>
            <button>Add Journal Entry</button>
        </div>
    );
}
