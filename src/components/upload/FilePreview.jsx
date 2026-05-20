/* Props: file (File) */
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const MAX_PREVIEW_ROWS = 10;

const QUESTION_KEYWORDS = ['question', 'query', 'prompt', 'q'];
const RESPONSE_KEYWORDS = ['response', 'answer', 'reply', 'ans', 'result'];

const COLUMN_TYPES = {
  question: {
    badge: 'Q',
    badgeStyle: {
      background: '#166534',
      color: '#fff',
      borderRadius: 4,
      padding: '1px 5px',
      fontSize: 10,
      fontWeight: 700,
      marginLeft: 5,
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    headerStyle: { background: '#dcfce7', color: '#14532d' },
  },
  response: {
    badge: 'R',
    badgeStyle: {
      background: '#1e40af',
      color: '#fff',
      borderRadius: 4,
      padding: '1px 5px',
      fontSize: 10,
      fontWeight: 700,
      marginLeft: 5,
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    headerStyle: { background: '#dbeafe', color: '#1e3a8a' },
  },
};

function detectColumnType(header) {
  const normalized = String(header).toLowerCase().trim();
  if (QUESTION_KEYWORDS.some((k) => normalized === k || normalized.includes(k))) return 'question';
  if (RESPONSE_KEYWORDS.some((k) => normalized === k || normalized.includes(k))) return 'response';
  return null;
}

function ColumnBadge({ type }) {
  if (!type) return null;
  const cfg = COLUMN_TYPES[type];
  return <span style={cfg.badgeStyle}>{cfg.badge}</span>;
}

export function FilePreview({ file }) {
  const [sheets, setSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) { setSheets([]); return; }

    setLoading(true);
    setError(null);
    setActiveSheet(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const parsed = workbook.SheetNames.map((name) => {
          const ws = workbook.Sheets[name];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
          return { name, rows };
        });
        setSheets(parsed);
      } catch (err) {
        setError('Could not parse file. Make sure it is a valid .xlsx file.');
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file.');
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  if (!file) return null;
  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 text-muted mt-3" style={{ fontSize: 13 }}>
        <span className="spinner-border spinner-border-sm" /> Parsing file…
      </div>
    );
  }
  if (error) {
    return <div className="alert alert-danger mt-3 py-2" style={{ fontSize: 13 }}>{error}</div>;
  }
  if (!sheets.length) return null;

  const current = sheets[activeSheet];
  const headers = current.rows[0] || [];
  const columnTypes = headers.map(detectColumnType);
  const dataRows = current.rows.slice(1, MAX_PREVIEW_ROWS + 1);
  const totalRows = current.rows.length - 1;

  const questionCount = columnTypes.filter((t) => t === 'question').length;
  const responseCount = columnTypes.filter((t) => t === 'response').length;

  return (
    <div className="mt-3 border rounded" style={{ fontSize: 13 }}>
      <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-light border-bottom">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="fw-semibold text-muted">Preview</span>
          <span className="badge bg-secondary">{totalRows} row{totalRows !== 1 ? 's' : ''}</span>
          {questionCount > 0 && (
            <span style={{ fontSize: 11, color: '#14532d', background: '#dcfce7', borderRadius: 4, padding: '2px 7px' }}>
              <span style={{ ...COLUMN_TYPES.question.badgeStyle, marginLeft: 0, marginRight: 4 }}>Q</span>
              {questionCount} question col{questionCount !== 1 ? 's' : ''} detected
            </span>
          )}
          {responseCount > 0 && (
            <span style={{ fontSize: 11, color: '#1e3a8a', background: '#dbeafe', borderRadius: 4, padding: '2px 7px' }}>
              <span style={{ ...COLUMN_TYPES.response.badgeStyle, marginLeft: 0, marginRight: 4 }}>R</span>
              {responseCount} response col{responseCount !== 1 ? 's' : ''} detected
            </span>
          )}
        </div>

        {sheets.length > 1 && (
          <div className="d-flex align-items-center gap-1">
            {sheets.map((s, i) => (
              <button
                key={s.name}
                className={`btn btn-sm ${i === activeSheet ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ fontSize: 12, padding: '2px 8px' }}
                onClick={() => setActiveSheet(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ overflowX: 'auto', maxHeight: 280 }}>
        <table className="table table-sm table-bordered mb-0" style={{ fontSize: 12, minWidth: 400 }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr>
              {headers.map((h, i) => {
                const type = columnTypes[i];
                const cfg = type ? COLUMN_TYPES[type] : null;
                return (
                  <th
                    key={i}
                    style={{
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                      ...(cfg ? cfg.headerStyle : { background: '#f8f9fa' }),
                    }}
                  >
                    {h !== '' ? String(h) : <span className="text-muted">Col {i + 1}</span>}
                    <ColumnBadge type={type} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri}>
                {headers.map((_, ci) => {
                  const type = columnTypes[ci];
                  return (
                    <td
                      key={ci}
                      style={{
                        maxWidth: 220,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        ...(type === 'question' ? { background: '#f0fdf4' } : {}),
                        ...(type === 'response' ? { background: '#eff6ff' } : {}),
                      }}
                    >
                      {String(row[ci] ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalRows > MAX_PREVIEW_ROWS && (
        <div className="px-3 py-2 text-muted border-top" style={{ fontSize: 12 }}>
          Showing {MAX_PREVIEW_ROWS} of {totalRows} rows
        </div>
      )}
    </div>
  );
}
