import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsGrid1X2Fill, BsFileEarmarkText, BsBook, BsFiles,
  BsShieldCheck, BsServer, BsBarChart, BsPeople,
  BsGear, BsQuestionCircle, BsList, BsChevronDown,
} from 'react-icons/bs';
import '../../styles/sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: <BsGrid1X2Fill /> },
  { to: '/questionnaires', label: 'Questionnaires', icon: <BsFileEarmarkText /> },
  { to: '/knowledge-base', label: 'Knowledge Base', icon: <BsBook /> },
  { to: '/documents', label: 'Documents', icon: <BsFiles /> },
  { to: '/trust-pages', label: 'Trust Pages', icon: <BsShieldCheck /> },
  { to: '/data-rooms', label: 'Data Rooms', icon: <BsServer /> },
  { to: '/analytics', label: 'Analytics', icon: <BsBarChart /> },
  { to: '/customers', label: 'Customers', icon: <BsPeople /> },
];

const FOOTER_ITEMS = [
  { to: '/settings', label: 'Settings', icon: <BsGear /> },
  { to: '/help', label: 'Help & Support', icon: <BsQuestionCircle /> },
];

/* Props: collapsed (bool), onToggle (fn) */
export function Sidebar({ collapsed, onToggle }) {
  return (
    <nav className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        {!collapsed && (
          <div className="sidebar__workspace">
            <div
              style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0,
                boxShadow: '0 2px 8px rgba(79,70,229,0.45)',
              }}
            >
              C
            </div>
            <span className="sidebar__workspace-name">Copart</span>
            <BsChevronDown size={11} style={{ marginLeft: 2, opacity: 0.5, flexShrink: 0 }} />
          </div>
        )}
        <button className="sidebar__hamburger" onClick={onToggle} title="Toggle sidebar">
          <BsList />
        </button>
      </div>

      <div className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`
            }
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar__footer">
        {FOOTER_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`
            }
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
