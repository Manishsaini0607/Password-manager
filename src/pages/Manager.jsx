/* ───────── src/pages/Manager.jsx ───────── */
import { useEffect, useState } from 'react';
import Background from '../components/Background';
import PasswordForm from '../components/PasswordForm';
import PasswordTable from '../components/PasswordTable';
import { ToastContainer } from 'react-toastify';

export default function Manager() {
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  /* initial load */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('passwords')) || [];
    setEntries(stored);
  }, []);

  /* helpers */
  const save = data => {
    const updated = editId
      ? entries.map(e => (e.id === editId ? { ...data, id: editId } : e))
      : [...entries, { ...data, id: crypto.randomUUID() }];

    setEntries(updated);
    localStorage.setItem('passwords', JSON.stringify(updated));
    setEditId(null);
  };

  const remove = id => {
    if (confirm('Delete this entry?')) {
      const updated = entries.filter(e => e.id !== id);
      setEntries(updated);
      localStorage.setItem('passwords', JSON.stringify(updated));
    }
  };

  return (
    <>
      <ToastContainer theme="light" autoClose={3000} />
      <Background />

      <header className="pt-16 pb-4 text-center">
        <h1 className="text-3xl font-extrabold">
          <span className="text-emerald-600">&lt;</span>
          Pass<span className="text-emerald-600">Man /&gt;</span>
        </h1>
        <p className="text-slate-600">Your own password manager</p>
      </header>

      {/* form + list */}
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <PasswordForm
          key={editId}          /* reset inputs when switching modes */
          onSave={save}
          defaultValues={entries.find(e => e.id === editId)}
        />

        <PasswordTable
          data={entries}
          onCopy={txt => navigator.clipboard.writeText(txt)}
          onEdit={id => setEditId(id)}
          onDelete={remove}
        />
      </div>
      
    </>
  );
}
