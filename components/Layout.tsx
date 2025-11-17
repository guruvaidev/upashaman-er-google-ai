
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomNavLink from './NavLink';
import { HomeIcon, PlusCircleIcon, SearchIcon, ScaleIcon, TestTubeIcon, SettingsIcon } from './icons/Icons';

const Layout: React.FC = () => {
    const navItems = [
        { to: '/', icon: HomeIcon, label: 'Home' },
        { to: '/triage', icon: PlusCircleIcon, label: 'Triage' },
        { to: '/search', icon: SearchIcon, label: 'Search' },
        { to: '/equity', icon: ScaleIcon, label: 'Equity' },
        { to: '/test', icon: TestTubeIcon, label: 'Test' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-between px-4 border-b border-border">
                <h1 className="text-xl font-bold text-primary">Upashaman-ER</h1>
                <button className="p-2 rounded-full hover:bg-secondary">
                    <SettingsIcon className="w-6 h-6 text-foreground" />
                </button>
            </header>

            <main className="flex-grow pt-16 pb-20">
                <div className="p-4 h-full">
                    <Outlet />
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-sm z-10 border-t border-border flex justify-around items-center">
                {navItems.map((item) => (
                    <CustomNavLink key={item.to} to={item.to}>
                        <item.icon className="w-7 h-7" />
                        <span className="text-xs mt-1">{item.label}</span>
                    </CustomNavLink>
                ))}
            </nav>
        </div>
    );
};

export default Layout;