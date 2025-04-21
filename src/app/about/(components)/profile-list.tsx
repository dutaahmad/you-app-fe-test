"use client";

import { GetProfileResponseData } from "@/zod/profile-schemas";
import EditProfile from "./edit-profile";

const ProfileList = ({ isEditProfile, userProfileData }: { isEditProfile: boolean, userProfileData?: GetProfileResponseData['data'] }) => {
    if (isEditProfile) return <EditProfile isEditProfile={isEditProfile} userProfileData={userProfileData} />;
    if (!userProfileData) return (
        <p className="pb-4 text-white/50">Add in your personal information to help others know you better</p>
    );
    return (
        <ul className="flex flex-col gap-4 my-6">
            <li className="flex gap-2">
                <p className="text-white/50 text-sm">Birthday: </p>
                <p className="text-white text-sm">{userProfileData.birthday}</p>
            </li>
            <li className="flex gap-2">
                <p className="text-white/50 text-sm">Horoscope: </p>
                <p className="text-white text-sm">{userProfileData.horoscope}</p>
            </li>
            <li className="flex gap-2">
                <p className="text-white/50 text-sm">Zodiac: </p>
                <p className="text-white text-sm">{userProfileData.zodiac}</p>
            </li>
            <li className="flex gap-2">
                <p className="text-white/50 text-sm">Height: </p>
                <p className="text-white text-sm">{userProfileData.height} cm</p>
            </li>
            <li className="flex gap-2">
                <p className="text-white/50 text-sm">Weight: </p>
                <p className="text-white text-sm">{userProfileData.weight} kg</p>
            </li>
        </ul>
    );
};

export default ProfileList;