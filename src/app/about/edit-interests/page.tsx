import { getProfile } from "@/server-actions/profile-actions";
import EditInterests from "../(components)/edit-interests";

const EditInterestsPage = async () => {
  const {data: userProfileData} = await getProfile();
  console.log({userProfileData});
  return (
    <EditInterests  userProfileData={userProfileData} />
  );
};

export default EditInterestsPage;