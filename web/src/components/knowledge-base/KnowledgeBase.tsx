'use client';

import { useState, useEffect } from 'react';
import { listFiles, deleteFile, uploadFiles } from '@/actions/knowledge.base.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileInfo {
    filename: string;
    size: number;
    last_modified: string;
    url: string;
}

export default function KnowledgeBase({ childId }: { childId: string }) {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const showMessage = (message: string, isError = false) => {
        if (isError) {
            setError(message);
            setSuccess(null);
        } else {
            setSuccess(message);
            setError(null);
        }
        setTimeout(() => {
            setError(null);
            setSuccess(null);
        }, 3000);
    };

    const fetchFiles = async () => {
        const result = await listFiles(childId);
        if (result.success) {
            setFiles(result.data);
        } else {
            showMessage(result.message, true);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [childId]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setIsLoading(true);
        const formData = new FormData();
        Array.from(e.target.files).forEach(file => {
            formData.append('files', file);
        });

        try {
            const result = await uploadFiles(childId, formData);
            if (result.success) {
                showMessage('Files uploaded successfully');
                fetchFiles();
            } else {
                showMessage(result.message, true);
            }
        } catch (error) {
            showMessage('Failed to upload files', true);
        } finally {
            setIsLoading(false);
            e.target.value = '';
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        setIsLoading(true);
        try {
            const result = await deleteFile(childId, filename);
            if (result.success) {
                showMessage('File deleted successfully');
                fetchFiles();
            } else {
                showMessage(result.message, true);
            }
        } catch (error) {
            showMessage('Failed to delete file', true);
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    {success}
                </div>
            )}
            
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Knowledge Base</h2>
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        disabled={isLoading}
                        className="max-w-[300px]"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {files.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                        No files uploaded yet
                    </p>
                ) : (
                    <div className="grid gap-2">
                        {files.map((file) => (
                            <div
                                key={file.filename}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex-1">
                                    <p className="font-medium">{file.filename}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatFileSize(file.size)} • {new Date(file.last_modified).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(file.url)}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(file.filename)}
                                        disabled={isLoading}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
