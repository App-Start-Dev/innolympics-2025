import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeftRight } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default async function Page() {
    const token = (await cookies()).get('firebase_token')?.value;
    if (!token) {
        redirect('/');
    }

    return (
        <div className="h-svh flex w-full max-w-screen-2xl flex-col">
            <div>
                <p className="text-2xl font-semibold">How can I help you?</p>
                <p className="text-gray">
                    Select a category or type your question.
                </p>
            </div>
            <DropdownMenu>
                <div>
                    <DropdownMenuTrigger>
                        <div className="flex items-center border rounded border-gray p-1 bg-white">
                            Switch Child <ArrowLeftRight size="18" />
                        </div>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent>
                    <DropdownMenuItem>Child 1</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div>
                <div className="flex gap-3 ietms-center bg-white rounded-xl py-3 px-2">
                    <div className="flex items-center">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                        </Avatar>
                    </div>
                    <div>
                        <p className="text-xl mb-2 font-semibold">
                            Juan Dela Cruz
                        </p>
                        <span className="rounded-2xl bg-primary px-4 py-1">
                            Type of ASD
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Categories</h2>
            </div>
        </div>
    );
}
