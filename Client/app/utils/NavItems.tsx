import Link from 'next/link';
import React from 'react';

export const navItemsData = [
    {
        name: "Home",
        url: '/',
    },
    {
        name: "About",
        url: '/about',
    },
    {
        name: "Policy",
        url: '/policy',
    },
    {
        name: "FAQ",
        url: '/faq',
    },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
};

const NavItem: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex'>
                {navItemsData.map((navItem, index) => (
                    <Link href={navItem.url} key={index} passHref>
                        <span
                            className={`${activeItem === index ? 'dark:text-sky-500 text-[crimson]' : 'dark:text-white text-black'} text-[18px] px-6 font-Poppins font-[400]`}
                        >{navItem.name}
                        </span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className='800px:hidden mt-5'>
                    <div className="w-full text-center py-6">
                        <Link href={'/'} passHref>
                            <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                LMS
                            </span>
                        </Link>
                    </div>
                    {navItemsData.map((navItem, index) => (
                        <Link href={navItem.url} key={index} passHref>
                            <span
                                className={`${activeItem === index ? 'dark:text-sky-500 text-[crimson]' : 'dark:text-white text-black'} block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                            >{navItem.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default NavItem;
