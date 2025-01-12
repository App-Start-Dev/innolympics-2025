'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type ChildFormProps = {
    initialData?: {
        id?: string;
        name: string;
        birthday: Date;
        sex: 'male' | 'female' | 'other';
        asdType: 'autism' | 'aspergers' | 'pdd_nos' | 'rett' | 'cdd' | 'other';
    };
    onSubmit: (formData: FormData) => Promise<void>;
    isUpdate?: boolean;
};

export function ChildForm({
    initialData,
    onSubmit,
    isUpdate = false,
}: ChildFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        defaultValues: initialData || {
            name: '',
            birthday: new Date(),
            sex: 'male',
            asdType: 'other',
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const values = form.getValues();
            const formData = new FormData();
            
            // Add ID if it's an update
            if (isUpdate && initialData?.id) {
                formData.append('id', initialData.id);
            }
            
            // Format date in YYYY-MM-DD format without timezone conversion
            const date = new Date(values.birthday);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            
            // Add form fields to FormData
            formData.append('name', values.name);
            formData.append('birthday', formattedDate);
            formData.append('sex', values.sex);
            formData.append('asdType', values.asdType);

            // Add files if present
            const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput?.files?.length) {
                for (let i = 0; i < fileInput.files.length; i++) {
                    formData.append('files', fileInput.files[i]);
                }
            }

            await onSubmit(formData);
            if (!isUpdate) {
                form.reset();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
                {isUpdate && initialData?.id && (
                    <input type="hidden" name="id" value={initialData.id} />
                )}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Child's name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Birthday</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sex</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select sex" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="asdType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ASD Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ASD type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="autism">Autism</SelectItem>
                                    <SelectItem value="aspergers">Asperger's</SelectItem>
                                    <SelectItem value="pdd_nos">PDD-NOS</SelectItem>
                                    <SelectItem value="rett">Rett Syndrome</SelectItem>
                                    <SelectItem value="cdd">CDD</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isUpdate && (
                    <FormField
                        name="file"
                        render={() => (
                            <FormItem>
                                <FormLabel>PDF File</FormLabel>
                                <FormControl>
                                    <Input type="file" accept=".pdf" />
                                </FormControl>
                                <FormDescription>
                                    Upload at least one PDF file (only for
                                    create)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Submitting...'
                        : isUpdate
                          ? 'Update'
                          : 'Create'}
                </Button>
            </form>
        </Form>
    );
}
