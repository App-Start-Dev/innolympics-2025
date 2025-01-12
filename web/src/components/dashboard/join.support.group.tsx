"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinSupportGroup } from "@/actions/support.group.action";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JoinSupportGroupModal() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [supportCode, setSupportCode] = useState("");
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
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
                router.refresh();
                // Close modal after successful join
                setTimeout(() => {
                    setIsOpen(false);
                    setSuccess("");
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to join support group");
        } finally {
            setJoining(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Join Support Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join Support Group</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="supportCode">Support Code</Label>
                        <Input
                            id="supportCode"
                            value={supportCode}
                            onChange={(e) => setSupportCode(e.target.value)}
                            placeholder="Enter support code"
                            disabled={joining}
                        />
                    </div>
                    <Button type="submit" disabled={joining} className="w-full">
                        {joining ? "Joining..." : "Join Group"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
