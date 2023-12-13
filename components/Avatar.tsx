import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

import useUser from "@/hooks/useUser";


interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const router = useRouter();
  const { data: user } = useUser(userId);

  const onClick = useCallback((evt: any) => {
    evt.stopPropagation();

    router.push(`/users/${userId}`);
  }, [router, userId])

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        bg-zinc-50
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        onClick={onClick}
        alt="Avatar"
        src={user?.profileImage || '/images/default_user.png'}
      />
    </div>
  )
}

export default Avatar;