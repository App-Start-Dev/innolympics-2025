import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/auth.provider";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export default function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
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
          {...register("email")}
        />
        {errors.email && (
          <Alert variant="destructive">
            <AlertDescription>{errors.email.message}</AlertDescription>
          </Alert>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Reset Password"}
      </Button>
      <Button variant="link" className="w-full" onClick={onBack}>
        Back to Login
      </Button>
    </form>
  );
}
