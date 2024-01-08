import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { ru } from "date-fns/locale";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem = ({ data, userId }: PostItemProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (evt: any) => {
      evt.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (evt: any) => {
      evt.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt), { locale: ru });
  }, [data.createdAt]);

  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 cursor-pointer 
      hover:bg-neutral-900 
      transition
    "
    >
      <div className="flex items-start gap-3" onClick={goToPost}>
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >{data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="hidden text-neutral-500 cursor-pointer hover:underline md:block"
            >@{data.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex items-center mt-3 gap-10">
            <div
              className="
                flex
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-sky-500
                "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500
                "
            >
              <AiOutlineHeart size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
