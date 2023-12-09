import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';


const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser
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
            />
          ))}
          {
          !currentUser ? 
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