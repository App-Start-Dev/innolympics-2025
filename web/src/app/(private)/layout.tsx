import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../../app/globals.css';
import { AuthProvider } from '@/providers/auth.provider';
import { Navbar } from '@/components/common/navbar.common';
import { Footer } from '@/components/common/footer.common';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Alix',
    description: 'Alix Hackathon Starter',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <div className="relative flex flex-col min-h-screen antialiased">
                <Navbar />
                <main className="flex-grow px-4 w-full">{children}</main>
                <Footer />
            </div>
        </AuthProvider>
    );
}
