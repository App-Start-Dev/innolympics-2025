import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAuth } from '@/providers/auth.provider';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginForm({
    onForgotPassword,
}: {
    onForgotPassword: () => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await loginWithEmail(data.email, data.password);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                />
                {errors.email && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.email.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {errors.password.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            <Button
                variant="link"
                className="w-full"
                onClick={onForgotPassword}
            >
                Forgot password?
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                    setIsLoading(true);
                    try {
                        await loginWithGoogle();
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsLoading(false);
                    }
                }}
                disabled={isLoading}
            >
                {isLoading ? (
                    'Signing in...'
                ) : (
                    <>
                        <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                        >
                            <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                        </svg>
                        Sign in with Google
                    </>
                )}
            </Button>
        </form>
    );
}
