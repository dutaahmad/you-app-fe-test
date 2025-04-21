'use client';

import { useState } from 'react';
import { useFormContext, Controller, ControllerRenderProps } from 'react-hook-form';
import { Input } from "@/components/ui/input"; // From ShadCN UI
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFieldTagsProps {
    name: string;
    placeholder?: string;
    className?: string;
}

/**
 * Input field for tags
 * This should be used inside a FormProvider
 * @example
 * 'use client';
 * import { useForm, FormProvider } from 'react-hook-form';
 * import { InterestTagInput } from './InterestTagInput';
 * import { Button } from "@/components/ui/button";

 * export default function ProfileForm() {
 * const form = useForm({ defaultValues: { interests: [] } });

 * const onSubmit = (data: any) => {
 *   console.log(data);
 * };

 * return (
 *   <FormProvider {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
 *       <InterestTagInput name="interests" />
 *       <Button type="submit">Save</Button>
 *     </form>
 *   </FormProvider>
 * );
 *}

 */
export const InputFieldTags = ({ name, placeholder, className }: InputFieldTagsProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field }) => <RenderedInputField field={field} placeholder={placeholder} className={className} />}
        />
    );
};

const RenderedInputField = ({
    field: { value, onChange },
    placeholder,
    className
}: {
    field: ControllerRenderProps;
    placeholder?: string;
    className?: string;
}) => {
    const [inputValue, setInputValue] = useState('');

    const removeTag = (index: number) => {
        const newTags = [...value];
        newTags.splice(index, 1);
        onChange(newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " && inputValue.trim()) {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (!value.includes(newTag)) {
                onChange([...value, newTag]);
            }
            setInputValue("");
        } else if (e.key === "Backspace" && inputValue === "") {
            onChange(value.slice(0, -1));
        }
    };

    return (
        <div className={cn(
            "flex flex-wrap gap-2 p-2 rounded-xl dark:bg-[#D9D9D90F]/90",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
        )}>
            {value.map((tag: string, index: number) => (
                <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 shadow-sm px-2 py-1 rounded-md text-sm"
                >
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            ))}
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || ""}
                className='!bg-transparent'
            />
        </div>
    );
};