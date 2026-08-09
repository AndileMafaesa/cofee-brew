import React, { useState, useEffect } from 'react';
import styles from './BrewForm.module.css';

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

const EMPTY = {
  beans: '',
  method: '',
  coffeeGrams: '',
  waterGrams: '',
  rating: '0',
  tastingNotes: '',
};

export default function BrewForm({ brew, onSave, onDelete, onClose, loading }) {
  const isEditing = Boolean(brew);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (brew) {
      setForm({
        beans: brew.beans,
        method: brew.method,
        coffeeGrams: String(brew.coffeeGrams),
        waterGrams: String(brew.waterGrams),
        rating: String(brew.rating),
        tastingNotes: brew.tastingNotes,
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [brew]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.beans.trim()) errs.beans = 'Required';
    if (!form.method) errs.method = 'Select a method';
    if (!form.coffeeGrams || Number(form.coffeeGrams) <= 0) errs.coffeeGrams = 'Enter a valid amount';
    if (!form.waterGrams || Number(form.waterGrams) <= 0) errs.waterGrams = 'Enter a valid amount';
    if (form.rating === '' || Number(form.rating) < 0 || Number(form.rating) > 5) errs.rating = '0 to 5 only';
    if (!form.tastingNotes.trim()) errs.tastingNotes = 'Required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({
      beans: form.beans.trim(),
      method: form.method,
      coffeeGrams: Number(form.coffeeGrams),
      waterGrams: Number(form.waterGrams),
      rating: Number(form.rating),
      tastingNotes: form.tastingNotes.trim(),
    });
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={isEditing ? 'Edit a brew' : 'Add a brew'}>
        <div className={styles.header}>
          <h2>{isEditing ? 'Edit a brew' : 'Add a brew'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="f-beans">Beans</label>
            <input
              id="f-beans"
              type="text"
              value={form.beans}
              onChange={e => set('beans', e.target.value)}
              placeholder="e.g. Ethiopian Yirgacheffe"
              className={errors.beans ? styles.inputError : ''}
            />
            {errors.beans && <span className={styles.error}>{errors.beans}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="f-method">Method</label>
            <select
              id="f-method"
              value={form.method}
              onChange={e => set('method', e.target.value)}
              className={errors.method ? styles.inputError : ''}
            >
              <option value="">Select a method</option>
              {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors.method && <span className={styles.error}>{errors.method}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="f-coffee">Coffee grams</label>
              <input
                id="f-coffee"
                type="number"
                value={form.coffeeGrams}
                onChange={e => set('coffeeGrams', e.target.value)}
                placeholder="18"
                min="0"
                className={errors.coffeeGrams ? styles.inputError : ''}
              />
              {errors.coffeeGrams && <span className={styles.error}>{errors.coffeeGrams}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="f-water">Water grams</label>
              <input
                id="f-water"
                type="number"
                value={form.waterGrams}
                onChange={e => set('waterGrams', e.target.value)}
                placeholder="300"
                min="0"
                className={errors.waterGrams ? styles.inputError : ''}
              />
              {errors.waterGrams && <span className={styles.error}>{errors.waterGrams}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="f-rating">Rating (out of 5)</label>
            <input
              id="f-rating"
              type="number"
              value={form.rating}
              onChange={e => set('rating', e.target.value)}
              min="0"
              max="5"
              className={errors.rating ? styles.inputError : ''}
            />
            {errors.rating && <span className={styles.error}>{errors.rating}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="f-notes">Tasting notes</label>
            <input
              id="f-notes"
              type="text"
              value={form.tastingNotes}
              onChange={e => set('tastingNotes', e.target.value)}
              placeholder="Fruity, bright, caramel finish"
              className={errors.tastingNotes ? styles.inputError : ''}
            />
            {errors.tastingNotes && <span className={styles.error}>{errors.tastingNotes}</span>}
          </div>

          <div className={styles.actions}>
            {isEditing && (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={onDelete}
                disabled={loading}
              >
                Delete
              </button>
            )}
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
