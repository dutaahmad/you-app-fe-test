
import ButtonLink from "@/components/button-link";
import { cn } from "@/lib/utils";
import { getProfile } from "@/server-actions/profile-actions";
import { ChevronLeft } from "lucide-react";
import EditButton from "./(components)/edit-button";
import ProfileList from "./(components)/profile-list";
import InterestFlexbox from "./(components)/interests-flexbox";

const AboutPage = async ({ searchParams }: { searchParams: Promise<{ edit: 'profile' | 'interests' | undefined }> }) => {
    const isEditProfile = (await searchParams).edit === 'profile';
    const isEditInterests = (await searchParams).edit === 'interests';
    const userProfile = await getProfile();
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="flex w-full">
                <div className="w-full">
                    <ButtonLink href={'/'} className="flex gap-0.5 pt-2 w-fit text-white">
                        <ChevronLeft className="size-6" />
                        <p>Back</p>
                    </ButtonLink>
                </div>
                <h1 className="pt-2 w-full text-white text-base text-center">
                    @{userProfile.data?.username}
                </h1>
                <span className="w-full" />
            </div>
            <div className={cn("flex flex-col gap-2 px-2 min-h-[94vh]")}>
                <div className="flex items-end bg-gray-200/10 p-2 rounded-xl w-full min-h-[12rem]">
                    <p className="bottom-0">@{userProfile.data?.username}</p>
                </div>
                {/* About div section (empty state) */}
                <div className="flex flex-col justify-between bg-[#0E191F] mt-4 px-4 py-4 rounded-xl w-full min-h-[8rem]">
                    <div className="flex justify-between items-center text-white">
                        <p className="font-semibold">About</p>
                        <EditButton path="profile" />
                    </div>
                    <ProfileList isEditProfile={isEditProfile} userProfileData={userProfile.data} />
                </div>
                {/* Interests div section (empty state) */}
                <div
                    className={
                        cn(
                            "flex flex-col bg-[#0E191F] mt-2 px-4 py-4 rounded-xl w-full min-h-[8rem]",
                            userProfile.data?.interests && userProfile.data?.interests.length > 0 ? "justify-start gap-6" : "justify-between"
                        )
                    }
                >
                    <div className="flex justify-between items-center text-white">
                        <p className="font-semibold">Interest</p>
                        <EditButton path="interests" />
                    </div>
                    <InterestFlexbox isEditInterests={isEditInterests} interests={userProfile.data?.interests} />
                </div>
            </div>
        </section>
    );
};

export default AboutPage;