import useUsers from "@/hooks/useUsers";

import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = []} = useUsers(); 

  if (users.length === 0) {
    return null;
  }

  return(
    <aside className="px-6 py-4 hidden lg:block">
      <div className=" bg-neutral-800 p-4 rounded-xl">
        <h2 className="text-white text-xl font-semibold">На кого подписаться</h2>
        <div className="mt-4 flex flex-col gap-6">
          {users.map((user: any) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id}/>
              <div className="flex flex-col">
                <p className="text-sm text-white font-semibold">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default FollowBar;