
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const CustomNavLink: React.FC<NavLinkProps> = ({ to, children, ...props }) => {
    return (
        <NavLink
            to={to}
            {...props}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full w-full transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`
            }
        >
            {children}
        </NavLink>
    );
};

export default CustomNavLink;
