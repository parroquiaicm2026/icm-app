import React from 'react';
import { Home, BookOpen, Map, Settings, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const navItems = [
        { to: "/", icon: Home, label: "Inicio" },
        { to: "/news", icon: Bell, label: "Novedades" },
        { to: "/pastorales", icon: BookOpen, label: "Pastorales" },
        { to: "/diocesis", icon: Map, label: "Equipo" },
    ];

    return (
        <nav className={styles.nav}>
            {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `${styles.item} ${isActive ? styles.active : ''}`
                    }
                >
                    <Icon size={24} />
                    <span className={styles.label}>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
