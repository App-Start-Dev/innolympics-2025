"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    getSupportGroupMembers,
    updateMemberName,
    updateMemberRole,
    removeMember,
    regenerateSupportCode
} from "@/actions/support.group.action";

interface SupportGroupMember {
    uid: string;
    name: string;
    role: string;
    joined_at: string;
}

interface SupportGroupData {
    child_name: string;
    support_code: string;
    members: SupportGroupMember[];
}

export default function Page() {
    const { childId } = useParams();
    const [groupData, setGroupData] = useState<SupportGroupData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchGroupData();
    }, [childId]);

    const fetchGroupData = async () => {
        try {
            const result = await getSupportGroupMembers(childId as string);
            if (result.success) {
                setGroupData(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to fetch support group data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateName = async (memberUid: string) => {
        try {
            const result = await updateMemberName(childId as string, memberUid, newName);
            if (result.success) {
                setSuccess("Member name updated successfully");
                setEditingMember(null);
                fetchGroupData();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to update member name");
        }
    };

    const handleUpdateRole = async (memberUid: string) => {
        try {
            const result = await updateMemberRole(childId as string, memberUid, newRole);
            if (result.success) {
                setSuccess("Member role updated successfully");
                setEditingMember(null);
                fetchGroupData();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to update member role");
        }
    };

    const handleRemoveMember = async (memberUid: string) => {
        if (!confirm("Are you sure you want to remove this member?")) return;
        
        try {
            const result = await removeMember(childId as string, memberUid);
            if (result.success) {
                setSuccess("Member removed successfully");
                fetchGroupData();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to remove member");
        }
    };

    const handleRegenerateCode = async () => {
        if (!confirm("Are you sure you want to regenerate the support code? All unused invites will be invalidated.")) return;
        
        try {
            const result = await regenerateSupportCode(childId as string);
            if (result.success) {
                setSuccess("Support code regenerated successfully");
                fetchGroupData();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to regenerate support code");
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (!groupData) {
        return <div className="p-4">No support group data found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6">{groupData.child_name}'s Support Group</h1>

                {/* Support Code Section */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Support Code</h2>
                            <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                                {groupData.support_code}
                            </p>
                        </div>
                        <button
                            onClick={handleRegenerateCode}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Regenerate Code
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Share this code with support workers to let them join the group
                    </p>
                </div>

                {/* Messages */}
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

                {/* Members List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Members</h2>
                    <div className="space-y-4">
                        {groupData.members.map((member) => (
                            <div
                                key={member.uid}
                                className="border rounded-lg p-4 flex items-center justify-between"
                            >
                                {editingMember === member.uid ? (
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="New name"
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            placeholder="New role"
                                            className="w-full p-2 border rounded"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateName(member.uid)}
                                                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Update Name
                                            </button>
                                            <button
                                                onClick={() => handleUpdateRole(member.uid)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Update Role
                                            </button>
                                            <button
                                                onClick={() => setEditingMember(null)}
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="font-semibold">{member.name}</h3>
                                            <p className="text-sm text-gray-600">{member.role}</p>
                                            <p className="text-xs text-gray-500">
                                                Joined: {new Date(member.joined_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingMember(member.uid);
                                                    setNewName(member.name);
                                                    setNewRole(member.role);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.uid)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}