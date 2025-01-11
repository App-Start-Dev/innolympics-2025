'use client';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/auth.provider';
import { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const { user, logout, loginWithGoogle } = useAuth();

    useEffect(() => {
        setUserAccount(user);
    }, [user]);
    return (
        <nav className="border-b">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold">
                        Alix
                    </Link>
                </div>
                <div className="flex items-center">
                    {user !== null ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={
                                                userAccount?.photoURL ??
                                                undefined
                                            }
                                            alt="User"
                                        />
                                        <AvatarFallback>
                                            {userAccount?.displayName}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={`/dashboard/${userAccount?.uid}`}
                                        className="flex items-center"
                                    >
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="default"
                            onClick={() => loginWithGoogle()}
                        >
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}
