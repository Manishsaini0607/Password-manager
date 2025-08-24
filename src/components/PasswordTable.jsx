import { useMemo, useState, useEffect } from 'react';
import {
  faCopy,
  faPen,
  faTrash,
  faSort,
  faSortUp,
  faSortDown,
  faEye,
  faEyeSlash,
  faSearch,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

/*
  Enhanced PasswordTable — v2
  Fixes & polishing:
  - stronger hover elevation and smooth transitions
  - larger touch/click targets for icons
  - accessible "Copied!" feedback (aria-live)
  - subtle row card look on mobile with margin + rounded corners
  - smoother show/hide animation for password
  - improved truncation and wrapping
*/

const IconBtn = ({ icon, className = '', title, ...rest }) => (
  <button
    type="button"
    className={`p-2 rounded-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${className}`}
    title={title}
    {...rest}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

const ThBtn = ({ children, dir, onClick }) => (
  <th className="hidden sm:table-cell sticky top-0 select-none bg-emerald-600 px-4 py-3 font-semibold text-white">
    <button className="flex items-center gap-2" onClick={onClick} aria-label={`Sort by ${children}`}>
      {children}
      <FontAwesomeIcon
        icon={dir === 'asc' ? faSortUp : dir === 'desc' ? faSortDown : faSort}
        className="text-xs"
      />
    </button>
  </th>
);

export default function PasswordTable({ data = [], onCopy, onEdit, onDelete }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ key: 'site', dir: 'asc' });
  const [copiedId, setCopiedId] = useState(null);

  const rows = useMemo(() => {
    const ql = q.toLowerCase();
    const filtered = data.filter(
      r =>
        r.site.toLowerCase().includes(ql) ||
        r.username.toLowerCase().includes(ql)
    );
    const sorted = [...filtered].sort((a, b) => {
      const v1 = a[sort.key].toLowerCase();
      const v2 = b[sort.key].toLowerCase();
      return sort.dir === 'asc' ? v1.localeCompare(v2) : v2.localeCompare(v1);
    });
    return sorted;
  }, [data, q, sort]);

  useEffect(() => {
    if (copiedId == null) return;
    const t = setTimeout(() => setCopiedId(null), 1400);
    return () => clearTimeout(t);
  }, [copiedId]);

  if (!data.length) return (
    <div className="rounded-xl mb-10 bg-white/95 shadow-lg ring-1 ring-slate-200/60 p-8 text-center">
      <p className="text-lg font-semibold text-slate-700">No passwords yet</p>
      <p className="mt-2 text-sm text-slate-500">Add your first credential to get started.</p>
    </div>
  );

  const toggleSort = key =>
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));

  const handleCopy = (txt, id) => {
    try {
      onCopy(txt);
      setCopiedId(id);
      toast.success('Copied to clipboard');
    } catch (e) {
      toast.error('Copy failed');
    }
  };

  return (
    <div className="rounded-xl mb-10 bg-white/90 shadow-lg ring-1 ring-slate-200/60">
      {/* header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-3 py-2">
            <FontAwesomeIcon icon={faSearch} className="text-emerald-600" />
            <input
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Filter websites or usernames..."
              className="bg-transparent px-2 py-1 text-sm focus:outline-none"
              aria-label="Filter passwords"
            />
            {q && (
              <button
                onClick={() => setQ('')}
                className="text-xs px-2 py-1 rounded-md hover:bg-emerald-100"
                aria-label="Clear filter"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="text-sm text-slate-500">{rows.length} shown</div>
      </div>

      {/* table / list */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm table-fixed">
          <thead className="hidden sm:table-header-group">
            <tr>
              <ThBtn onClick={() => toggleSort('site')} dir={sort.key === 'site' ? sort.dir : null}>Website</ThBtn>
              <ThBtn onClick={() => toggleSort('username')} dir={sort.key === 'username' ? sort.dir : null}>Username</ThBtn>
              <th className="hidden sm:table-cell sticky top-0 bg-emerald-600 px-4 py-3 font-semibold text-white">Password</th>
              <th className="hidden sm:table-cell sticky top-0 w-36 bg-emerald-600 px-4 py-3 text-center font-semibold text-white">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y sm:divide-y">
            {rows.map((row, i) => (
              <PasswordRow
                key={row.id}
                row={row}
                stripe={i % 2 === 0}
                onCopy={(txt) => handleCopy(txt, row.id)}
                onEdit={onEdit}
                onDelete={onDelete}
                copied={copiedId === row.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PasswordRow({ row, stripe, onCopy, onEdit, onDelete, copied }) {
  const [showPwd, setShowPwd] = useState(false);

  // create simple initials avatar from site hostname
  const initials = (() => {
    try {
      const url = new URL(row.site);
      const host = url.hostname.replace('www.', '');
      return host.split('.').slice(0, 1)[0][0]?.toUpperCase() || 'S';
    } catch (e) {
      return row.site[0]?.toUpperCase() || 'S';
    }
  })();

  return (
    // block on small screens so cells stack; table-row on sm+
    <tr className={`block sm:table-row ${stripe ? 'bg-slate-50' : 'bg-white'} mb-3 sm:mb-0 sm:odd:bg-transparent sm:even:bg-transparent`}>
      <td className="px-4 py-4 block sm:table-cell">
        <div className="flex items-center gap-3 rounded-md p-2 sm:p-0 hover:shadow-lg transition-shadow duration-200">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white font-semibold shadow-sm">{initials}</div>
          </div>
          <div className="min-w-0">
            <a href={row.site} target="_blank" rel="noreferrer" className="font-medium text-slate-800 hover:underline flex items-center gap-2">
              <span className="truncate max-w-xs block">{row.site}</span>
              <FontAwesomeIcon icon={faLink} className="text-slate-400 text-xs" />
            </a>
            <div className="text-xs text-slate-500 mt-1 sm:hidden">Website</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 block sm:table-cell">
        <div className="flex items-center justify-between gap-3 rounded-md p-2 sm:p-0 hover:shadow-lg transition-shadow duration-200">
          <div className="min-w-0">
            <div className="text-slate-700 truncate">{row.username}</div>
            <div className="text-xs text-slate-500 mt-1 sm:hidden">Username</div>
          </div>
          <div className="flex items-center gap-2">
            <IconBtn icon={faCopy} onClick={() => onCopy(row.username)} title="Copy username" aria-label="Copy username" />
          </div>
        </div>
      </td>

      <td className="px-4 py-4 block sm:table-cell">
        <div className="flex items-center justify-between gap-3 rounded-md p-2 sm:p-0 hover:shadow-lg transition-shadow duration-200">
          <div className="min-w-0 flex items-center gap-3">
            <div className="text-slate-700 font-mono truncate transition-opacity duration-200">{showPwd ? row.password : '•'.repeat(Math.max(6, row.password.length))}</div>
        
          </div>

          <div className="flex items-center gap-2">
            <IconBtn icon={showPwd ? faEyeSlash : faEye} onClick={() => setShowPwd(s => !s)} title={showPwd ? 'Hide password' : 'Show password'} aria-label={showPwd ? 'Hide password' : 'Show password'} />
            <div className="relative">
              <IconBtn icon={faCopy} onClick={() => onCopy(row.password)} title="Copy password" aria-label="Copy password" />
              {copied && (
                <span role="status" aria-live="polite" className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 text-white text-xs px-2 py-1 shadow">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 block sm:table-cell text-center">
        <div className="flex items-center justify-center gap-3 rounded-md p-2 sm:p-0 hover:shadow-lg transition-shadow duration-200">
          <IconBtn icon={faPen} onClick={() => onEdit(row.id)} className="text-sky-600 hover:bg-sky-50" title="Edit" aria-label="Edit" />
          <IconBtn icon={faTrash} onClick={() => onDelete(row.id)} className="text-rose-600 hover:bg-rose-50" title="Delete" aria-label="Delete" />
        </div>
        <div className="text-xs text-slate-400 mt-2 sm:hidden">Actions</div>
      </td>
    </tr>
  );
}
