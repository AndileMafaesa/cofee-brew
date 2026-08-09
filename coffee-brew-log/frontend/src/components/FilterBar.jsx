import React from 'react';
import styles from './FilterBar.module.css';

const METHODS = [
  'Aeropress',
  'V60',
  'Drip coffee',
  'French press',
  'Chemex',
  'Espresso',
  'Moka pot',
  'Cold brew',
];

export default function FilterBar({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <select
        className={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Filter brews by method"
      >
        <option value="">Filter by method</option>
        {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
}
