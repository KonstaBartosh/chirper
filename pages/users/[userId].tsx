import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: user, isLoading } = useUser(userId as string);

  if (isLoading || !user) {
    return(
      <div className="h-full flex justify-center items-center">
        <ClipLoader color="lightblue" size={80}/>
      </div>
    )
  }
  
  return(
    <>
      <Header showBackArrow label={user?.name}/>
      <UserHero userId={userId as string}/>
      <UserBio userId={userId as string}/>
    </>
  )
}

export default Profile;