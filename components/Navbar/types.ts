import react from 'react';

export type TabData = {
    id: string;
    label: string;
    href?: string;
};

export type NavbarProps = {
    logo?: React.ReactNode;
    tabs?: TabData[];
    className?: string;
};