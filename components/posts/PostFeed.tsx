import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  return(
    <>
      {posts.map((post: any) => (
        <PostItem 
          key={post.id}
          data={post}
          userId={userId}
        />
      ))}
    </>
  )
}

export default PostFeed;