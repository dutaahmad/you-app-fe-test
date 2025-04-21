"use client";

import { InputFieldTags } from "@/components/input-tag-field";
import PageWithBackAndSaveButton from "@/components/page-with-back-and-save";
import { updateProfile } from "@/server-actions/profile-actions";
import { GetProfileResponseData, InterestsUpdateSchema } from "@/zod/profile-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const EditInterests = ({ userProfileData }: { userProfileData: GetProfileResponseData['data'] }) => {
    const interests = Array.isArray(userProfileData?.interests) ? userProfileData.interests : [];
    const form = useForm<z.infer<typeof InterestsUpdateSchema>>({
        resolver: zodResolver(InterestsUpdateSchema),
        defaultValues: {
            interests
        },
    });

    const onSubmit = async (values: z.infer<typeof InterestsUpdateSchema>) => {
        console.log({
            message: "edi-profile - save",
            values
        });

        try {
            const response = await updateProfile(values);
            console.log({ updatedProfile: response });
            router.push('/about');
        } catch (error) {
            console.log({ error });
        }

    };
    return (
        <PageWithBackAndSaveButton backHref={'/about'} className="justify-center items-center w-full !h-[50vh] !min-h-[10%]" onSave={form.handleSubmit(onSubmit)}>
            {/* <Input type="text" className="mt-4 w-full" /> */}
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-start gap-2 w-[90%]"
                    autoComplete="none"
                >
                    <h2 className="ml-2 font-semibold text-gradient-gold">Tell everyone about yourself</h2>
                    <h1 className="ml-2 font-semibold text-xl">What interests you?</h1>
                    <InputFieldTags name="interests" placeholder="" className="mt-10 w-full" />
                </form>
            </FormProvider>
        </PageWithBackAndSaveButton>
    );
};

export default EditInterests;