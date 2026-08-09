import React from 'react';
import styles from './BrewCard.module.css';

const AVATAR_COLORS = [
  '#16a34a', '#2563eb', '#dc2626',
  '#d97706', '#7c3aed', '#0891b2', '#be185d',
];

function avatarColor(id) {
  let h = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
  }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export default function BrewCard({ brew, onEdit }) {
  return (
    <div className={styles.card}>
      <div
        className={styles.avatar}
        style={{ background: avatarColor(brew.id) }}
        aria-label={`Rating: ${brew.rating} out of 5`}
      >
        {brew.rating}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{brew.beans}</div>
        <div className={styles.tags}>
          <span className={styles.tag}>{brew.method}</span>
          <span className={styles.tag}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
            {brew.coffeeGrams}g
          </span>
          <span className={styles.tag}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            {brew.waterGrams}g
          </span>
        </div>
      </div>
      <button
        className={styles.editBtn}
        onClick={() => onEdit(brew)}
        aria-label={`Edit ${brew.beans}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    </div>
  );
}
