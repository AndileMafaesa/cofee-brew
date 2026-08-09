import React, { useState, useEffect, useCallback } from 'react';
import { fetchBrews, createBrew, updateBrew, deleteBrew } from './api/brews';
import BrewCard from './components/BrewCard';
import BrewForm from './components/BrewForm';
import FilterBar from './components/FilterBar';
import Toast from './components/Toast';
import styles from './App.module.css';

export default function App() {
  const [brews, setBrews] = useState([]);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const loadBrews = useCallback(async (method = filter) => {
    setFetching(true);
    setError('');
    try {
      const data = await fetchBrews(method);
      setBrews(data);
    } catch (err) {
      setError('Could not load brews. Is the server running?');
    } finally {
      setFetching(false);
    }
  }, [filter]);

  useEffect(() => {
    loadBrews(filter);
  }, [filter]);

  useEffect(() => {
    document.title = `Brews: ${brews.length}`;
  }, [brews.length]);

  function openAdd() {
    setEditingBrew(null);
    setModalOpen(true);
  }

  function openEdit(brew) {
    setEditingBrew(brew);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingBrew(null);
  }

  async function handleSave(data) {
    setLoading(true);
    try {
      if (editingBrew) {
        await updateBrew(editingBrew.id, data);
        setToast('Brew updated');
      } else {
        await createBrew(data);
        setToast('Brew added');
      }
      closeModal();
      await loadBrews(filter);
    } catch (err) {
      if (err.errors) {
        setToast(err.errors[0].message);
      } else {
        setToast('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!editingBrew) return;
    if (!window.confirm('Delete this brew?')) return;
    setLoading(true);
    try {
      await deleteBrew(editingBrew.id);
      setToast('Brew deleted');
      closeModal();
      await loadBrews(filter);
    } catch {
      setToast('Failed to delete brew');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Brew log</h1>
            <p className={styles.subtitle}>Brews: {brews.length}</p>
          </div>
          <button className={styles.addBtn} onClick={openAdd}>
            + Add
          </button>
        </div>

        <FilterBar value={filter} onChange={setFilter} />

        {error && (
          <div className={styles.errorBanner}>{error}</div>
        )}

        {fetching ? (
          <div className={styles.empty}>Loading...</div>
        ) : brews.length === 0 ? (
          <div className={styles.empty}>
            {filter ? 'No brews with that method.' : 'No brews yet — add your first one!'}
          </div>
        ) : (
          <div className={styles.list}>
            {brews.map(brew => (
              <BrewCard key={brew.id} brew={brew} onEdit={openEdit} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <BrewForm
          brew={editingBrew}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {toast && (
        <Toast message={toast} onDone={() => setToast('')} />
      )}
    </div>
  );
}
