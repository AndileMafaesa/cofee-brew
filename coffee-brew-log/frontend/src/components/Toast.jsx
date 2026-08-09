import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
