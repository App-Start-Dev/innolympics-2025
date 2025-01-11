'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { LoginForm, RegisterForm, ForgotPasswordForm } from '@/forms/auth';

export default function AuthPage() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome
                    </CardTitle>
                    <CardDescription className="text-center">
                        Sign up or log in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {showForgotPassword ? (
                        <ForgotPasswordForm
                            onBack={() => setShowForgotPassword(false)}
                        />
                    ) : (
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">
                                    Register
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <LoginForm
                                    onForgotPassword={() =>
                                        setShowForgotPassword(true)
                                    }
                                />
                            </TabsContent>
                            <TabsContent value="register">
                                <RegisterForm />
                            </TabsContent>
                        </Tabs>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
