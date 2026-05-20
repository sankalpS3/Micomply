/* Props: icon, title, description, color, bg */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

export function ComingSoon({ icon, title, description, color = '#4f46e5', bg = '#eef2ff' }) {
  const [btnHovered, setBtnHovered] = React.useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '62vh',
      textAlign: 'center',
      padding: '40px 24px',
    }}>
      {/* Icon bubble */}
      <div style={{
        width: 80, height: 80,
        borderRadius: 26,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 34,
        color,
        marginBottom: 24,
        boxShadow: `0 8px 32px ${color}28`,
        animation: 'fadeInUp 0.3s ease both',
      }}>
        {icon}
      </div>

      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        padding: '4px 12px',
        borderRadius: 20,
        marginBottom: 14,
        animation: 'fadeInUp 0.3s 0.06s ease both',
      }}>
        Coming soon
      </div>

      <h2 style={{
        fontSize: 26,
        fontWeight: 800,
        color: '#0f172a',
        margin: '0 0 10px',
        letterSpacing: '-0.02em',
        animation: 'fadeInUp 0.3s 0.1s ease both',
      }}>
        {title}
      </h2>

      <p style={{
        fontSize: 14,
        color: '#64748b',
        maxWidth: 400,
        lineHeight: 1.65,
        margin: '0 0 32px',
        animation: 'fadeInUp 0.3s 0.14s ease both',
      }}>
        {description}
      </p>

      <Link
        to="/"
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '10px 20px',
          borderRadius: 10,
          background: color,
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: btnHovered ? `0 8px 24px ${color}55` : `0 4px 14px ${color}38`,
          transform: btnHovered ? 'translateY(-2px)' : 'none',
          transition: 'transform 0.14s, box-shadow 0.14s',
          animation: 'fadeInUp 0.3s 0.18s ease both',
        }}
      >
        <BsArrowLeft size={14} />
        Back to Dashboard
      </Link>

      {/* Decorative dots */}
      <div style={{
        display: 'flex', gap: 6, marginTop: 40, opacity: 0.3,
        animation: 'fadeInUp 0.3s 0.22s ease both',
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: color,
            animation: `pulse 1.4s ${i * 0.2}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
