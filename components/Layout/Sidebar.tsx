import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut, useSession } from 'next-auth/react';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
//import useCurrentUser from '@/hooks/useCurrentUser';


const Sidebar = () => {
  //const { data: currentUser } = useCurrentUser();
  const { data: session } = useSession();

  if (session) {
    // Пользователь аутентифицирован
    console.log('Пользователь аутентифицирован:', session.user);
  } else {
    // Пользователь не аутентифицирован
    console.log('Пользователь не аутентифицирован');
  }

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser,
      auth: true
    }
  ]
  
  return(
    <nav className='col-span-1 h-full pr-4 md:pr-6 pt-4'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {
          session ? 
            (<SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout'/>) 
          : null
          }
          <SidebarTweetButton />
        </div>
      </div>
    </nav>
  )
}

export default Sidebar;