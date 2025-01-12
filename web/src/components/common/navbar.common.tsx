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
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/providers/auth.provider';
import { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { FaBars } from 'react-icons/fa6';

export function Navbar() {
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const { user, logout, loginWithGoogle } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUserAccount(user);
    }, [user]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <nav className="">
            <div className="flex justify-end">
                <button
                    className=" text-black transition-all duration-200 ease-in-out p-4"
                    onClick={toggleSidebar}
                >
                    <FaBars size={20} />
                </button>

                <div
                    ref={sidebarRef}
                    className={`fixed top-0 right-0 h-screen w-64 rounded-l-3xl bg-white z-30 transform shadow-xl ${
                        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-200`}
                >
                    <button
                        className="absolute top-4 right-6 text-black opacity-50 hover:opacity-100 text-3xl transition-all duration-200 ease-in-out"
                        onClick={toggleSidebar}
                    >
                        &times;
                    </button>
                    <div className="p-6">
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href={`/dashboard/${userAccount?.uid}`}
                                    className="block text-lg font-medium text-gray-700 hover:text-blue-500"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                {userAccount ? (
                                    <button
                                        onClick={logout}
                                        className="w-full text-left text-lg font-medium text-red-500 hover:text-red-600"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <Button
                                        variant="default"
                                        onClick={loginWithGoogle}
                                        className="w-full"
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
