"use client";

import { PencilLine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const EditButton = ({ path }: { path: "profile" | "interests" }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleEdit = () => {
        if (path === 'profile') router.push('/about?edit=profile');
        if (path === 'interests') router.push('/about/edit-interests');
    };

    const isEditProfile = searchParams.get('edit') === 'profile';
    const isEditInterests = searchParams.get('edit') === 'interests';

    if (isEditProfile || isEditInterests) return null;

    return (
        <PencilLine onClick={handleEdit} className="size-4 hover:cursor-pointer" />
    );
};

export default EditButton;