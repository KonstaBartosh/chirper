import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero = ({ userId }: UserHeroProps) => {
  const { data: user } = useUser(userId);


  return(
    <div>
      <div className="bg-neutral-700 relative h-44">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="Обложка"
            style={{ objectFit: 'cover'}}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder/>
        </div>
      </div>
    </div>
  )
}

export default UserHero;