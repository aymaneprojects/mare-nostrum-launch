// Timeline view — horizontal parcours of Niteo Toulouse 2026
// Renders a zoomable day-scale timeline with 3 swim-lanes (module / session / tutorat),
// plus a phase strip header and a side detail panel for clicked items.

const { useState, useMemo, useRef, useEffect } = React;

const C = {
  nuit: '#24335D',
  turquoise: '#3BD9DB',
  ivory: '#F6F2EA',
  sand: '#E8DFCE',
  ink: '#0F1733',
  muted: '#6C7591',
  line: 'rgba(36,51,93,0.12)',
  ochre: '#F2C56B',
};

// ─── helpers ───
const DAY_MS = 24 * 3600 * 1000;
const parseD = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const dayDiff = (a, b) => Math.round((parseD(b) - parseD(a)) / DAY_MS);
const fmtFR = (s) => {
  const d = parseD(s);
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juill.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
};
const fmtFRlong = (s) => {
  const d = parseD(s);
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return `${days[d.getUTCDay()]} ${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

// Icon glyphs — simple inline SVGs that play well with MN's quiet voice
function TypeIcon({ type, size = 18, color = '#fff' }) {
  const s = size;
  if (type === 'module') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M4 6 L12 3 L20 6 L20 17 L12 20 L4 17 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 6 L12 9 L20 6 M12 9 L12 20" stroke={color} strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === 'session') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="2.2" stroke={color} strokeWidth="1.6" />
        <circle cx="16" cy="9" r="2.2" stroke={color} strokeWidth="1.6" />
        <path d="M4 19 Q 8 14 12 14 Q 16 14 20 19" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === 'tutorat') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3" stroke={color} strokeWidth="1.6" />
        <path d="M5 20 Q 12 14 19 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return null;
}

// ─────────────────────────────────────────────
// Logo component
// ─────────────────────────────────────────────
function Logo({ size = 36, color = C.nuit, showWord = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src="assets/logo-mare-nostrum.png" alt="Mare Nostrum" style={{ width: size, height: size, objectFit: 'contain' }} />
      {showWord && (
        <div style={{ lineHeight: 1, color }}>
          <div style={{ fontSize: size * 0.42, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Mare Nostrum</div>
          <div style={{ fontSize: size * 0.3, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', marginTop: 7, color: C.turquoise, whiteSpace: 'nowrap' }}>— Niteo · Promotion 2026</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Day-scale horizontal timeline
// ─────────────────────────────────────────────
function Timeline({ onPick, selected }) {
  const start = PROGRAM.start;
  const end = PROGRAM.end;
  const totalDays = dayDiff(start, end) + 1;
  const [pxPerDay, setPxPerDay] = useState(22);
  const containerRef = useRef(null);

  // Lane assignment per type (keeps rows from overlapping)
  const lanesByType = useMemo(() => {
    const out = { module: [], session: [], tutorat: [] };
    const groups = { module: [], session: [], tutorat: [] };
    ITEMS.forEach(it => groups[it.type].push(it));

    for (const type of Object.keys(groups)) {
      const rows = []; // each row = array of [startDay, endDay]
      for (const it of groups[type].sort((a, b) => dayDiff(start, a.date) - dayDiff(start, b.date))) {
        const s = dayDiff(start, it.date);
        const e = dayDiff(start, it.dateEnd || it.date);
        let placed = false;
        for (let r = 0; r < rows.length; r++) {
          if (rows[r].every(([rs, re]) => e < rs - 0.5 || s > re + 0.5)) {
            rows[r].push([s, e]);
            out[type].push({ ...it, lane: r });
            placed = true;
            break;
          }
        }
        if (!placed) {
          rows.push([[s, e]]);
          out[type].push({ ...it, lane: rows.length - 1 });
        }
      }
    }
    return out;
  }, [start]);

  const laneCount = (type) => Math.max(1, Math.max(0, ...lanesByType[type].map(i => i.lane)) + 1);
  const LANE_H = 48;
  const LANE_GAP = 8;
  const TYPE_LABEL_W = 180;
  const PHASE_H = 64;
  const AXIS_H = 40;

  const typeOrder = ['session', 'module', 'tutorat'];
  const typeHeights = typeOrder.map(t => laneCount(t) * (LANE_H + LANE_GAP) + 8);
  const totalHeight = PHASE_H + AXIS_H + typeHeights.reduce((a, b) => a + b, 0);

  const width = totalDays * pxPerDay;

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 2, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: `1px solid ${C.line}`, background: C.ivory }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {typeOrder.map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 14, height: 14, background: TYPES[t].color, borderRadius: 3,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TypeIcon type={t} size={10} color={TYPES[t].text} />
              </span>
              <span style={{ fontSize: 12, color: C.ink, letterSpacing: 0.3 }}>{TYPES[t].label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase' }}>
          <span>Échelle</span>
          <input type="range" min="14" max="40" value={pxPerDay} onChange={e => setPxPerDay(+e.target.value)}
            style={{ accentColor: C.nuit, width: 120 }} />
        </div>
      </div>

      {/* Scroll area */}
      <div ref={containerRef} className="mn-scroll" style={{ overflow: 'auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `${TYPE_LABEL_W}px 1fr`, minWidth: TYPE_LABEL_W + width }}>
          {/* Left fixed column with type labels */}
          <div style={{ position: 'sticky', left: 0, zIndex: 4, background: '#fff', borderRight: `1px solid ${C.line}` }}>
            <div style={{ height: PHASE_H, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>
              Phase du parcours
            </div>
            <div style={{ height: AXIS_H, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>
              Avril — Juin 2026
            </div>
            {typeOrder.map((t, i) => (
              <div key={t} style={{
                height: typeHeights[i], padding: '16px 20px',
                borderBottom: i < typeOrder.length - 1 ? `1px solid ${C.line}` : 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{
                    width: 26, height: 26, background: TYPES[t].color, borderRadius: 4,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TypeIcon type={t} size={16} color={TYPES[t].text} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{TYPES[t].short}</span>
                </div>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
                  {t === 'module' && '11 modules · e-learning'}
                  {t === 'session' && '4 sessions · collectives'}
                  {t === 'tutorat' && '3 tutorats · individuels'}
                </div>
              </div>
            ))}
          </div>

          {/* Right scrolling timeline */}
          <div style={{ position: 'relative', width }}>
            {/* Phase strip */}
            <div style={{ height: PHASE_H, position: 'relative', borderBottom: `1px solid ${C.line}` }}>
              {PHASES.map(p => {
                const left = dayDiff(start, p.start) * pxPerDay;
                const w = (dayDiff(p.start, p.end) + 1) * pxPerDay;
                const tints = ['rgba(36,51,93,0.06)', 'rgba(59,217,219,0.10)', 'rgba(36,51,93,0.06)', 'rgba(242,197,107,0.14)'];
                return (
                  <div key={p.n} style={{
                    position: 'absolute', top: 6, left: left + 4, width: w - 8, bottom: 6,
                    background: tints[p.n - 1], borderRadius: 3,
                    padding: '10px 14px', overflow: 'hidden',
                  }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: C.turquoise, fontWeight: 700 }}>
                      Phase {String(p.n).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, fontWeight: 600, color: C.nuit, letterSpacing: -0.3, marginTop: 2 }}>{p.title}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Axis — weeks */}
            <div style={{ height: AXIS_H, position: 'relative', borderBottom: `1px solid ${C.line}`, background: 'repeating-linear-gradient(90deg, transparent 0, transparent ' + (7 * pxPerDay - 1) + 'px, rgba(36,51,93,0.06) ' + (7 * pxPerDay - 1) + 'px, rgba(36,51,93,0.06) ' + (7 * pxPerDay) + 'px)' }}>
              {Array.from({ length: Math.ceil(totalDays / 7) + 1 }).map((_, i) => {
                const dayIdx = i * 7;
                if (dayIdx > totalDays) return null;
                const d = new Date(parseD(start).getTime() + dayIdx * DAY_MS);
                const iso = d.toISOString().slice(0, 10);
                return (
                  <div key={i} style={{
                    position: 'absolute', top: 0, bottom: 0, left: dayIdx * pxPerDay,
                    display: 'flex', alignItems: 'center',
                    fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: C.muted, fontWeight: 600,
                    paddingLeft: 6,
                  }}>
                    {fmtFR(iso)}
                  </div>
                );
              })}
              {/* Month dividers */}
              {[...new Set(Array.from({ length: totalDays }).map((_, d) => {
                const dt = new Date(parseD(start).getTime() + d * DAY_MS);
                return dt.getUTCFullYear() + '-' + (dt.getUTCMonth() + 1);
              }))].map(k => {
                const [y, m] = k.split('-').map(Number);
                const first = new Date(Date.UTC(y, m - 1, 1));
                const diff = Math.round((first - parseD(start)) / DAY_MS);
                if (diff < 0 || diff > totalDays) return null;
                return <div key={k} style={{ position: 'absolute', top: 0, bottom: 0, left: diff * pxPerDay, borderLeft: `1px dashed ${C.line}` }} />;
              })}
            </div>

            {/* Type rows */}
            {typeOrder.map((t, ti) => {
              const items = lanesByType[t];
              const height = typeHeights[ti];
              return (
                <div key={t} style={{
                  height, position: 'relative',
                  borderBottom: ti < typeOrder.length - 1 ? `1px solid ${C.line}` : 'none',
                  background: ti % 2 === 0 ? 'rgba(246,242,234,0.35)' : '#fff',
                }}>
                  {/* weekend bands */}
                  {Array.from({ length: totalDays }).map((_, d) => {
                    const dt = new Date(parseD(start).getTime() + d * DAY_MS);
                    const dow = dt.getUTCDay();
                    if (dow !== 0 && dow !== 6) return null;
                    return <div key={d} style={{ position: 'absolute', top: 0, bottom: 0, left: d * pxPerDay, width: pxPerDay, background: 'rgba(36,51,93,0.025)' }} />;
                  })}
                  {items.map(it => {
                    const s = dayDiff(start, it.date);
                    const e = dayDiff(start, it.dateEnd || it.date);
                    const left = s * pxPerDay + 4;
                    const w = Math.max(pxPerDay - 8, (e - s + 1) * pxPerDay - 8);
                    const top = 8 + it.lane * (LANE_H + LANE_GAP);
                    const meta = TYPES[it.type];
                    const isSel = selected && selected.id === it.id;
                    const isSpan = it.span;
                    return (
                      <button key={it.id} onClick={() => onPick(it)} style={{
                        position: 'absolute', left, top, width: w, height: LANE_H,
                        background: isSpan ? `repeating-linear-gradient(135deg, ${meta.color} 0 10px, ${shade(meta.color, -10)} 10px 20px)` : meta.color,
                        color: meta.text,
                        border: isSel ? `2px solid ${C.ink}` : `1px solid ${shade(meta.color, -20)}`,
                        borderRadius: 4, padding: '6px 10px', textAlign: 'left',
                        fontFamily: 'inherit', cursor: 'pointer',
                        boxShadow: isSel ? '0 6px 20px rgba(36,51,93,0.25)' : '0 1px 2px rgba(15,23,51,0.08)',
                        transition: 'transform .15s, box-shadow .15s',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2,
                        overflow: 'hidden',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 700, opacity: 0.9 }}>
                          {it.type === 'module' && `Module ${it.num}`}
                          {it.type === 'session' && `Session ${it.num}`}
                          {it.type === 'tutorat' && `Tutorat ${it.num}`}
                          {it.tag && <span style={{ marginLeft: 4, opacity: 0.7 }}>· {it.tag}</span>}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</div>
                      </button>
                    );
                  })}
                </div>
              );
            })}

            {/* TODAY marker */}
            <TodayMarker start={start} end={end} pxPerDay={pxPerDay} totalHeight={PHASE_H + AXIS_H + typeHeights.reduce((a, b) => a + b, 0) - PHASE_H - AXIS_H} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayMarker({ start, end, pxPerDay }) {
  // Mocked "today" = April 20, 2026 to reflect mid-program state
  const today = '2026-04-20';
  if (today < start || today > end) return null;
  const d = dayDiff(start, today);
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: d * pxPerDay, width: 2, background: C.turquoise, zIndex: 3, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: -4, left: -4, width: 10, height: 10, borderRadius: '50%', background: C.turquoise,
        boxShadow: '0 0 0 4px rgba(59,217,219,0.25)',
      }} />
      <div style={{
        position: 'absolute', top: 8, left: 8, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
        color: C.nuit, background: C.turquoise, padding: '2px 6px', fontWeight: 700, whiteSpace: 'nowrap',
        borderRadius: 2,
      }}>Aujourd'hui</div>
    </div>
  );
}

function shade(hex, amt) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0, 2), 16) + amt));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2, 4), 16) + amt));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4, 6), 16) + amt));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

Object.assign(window, { Timeline, Logo, TypeIcon, C, fmtFR, fmtFRlong, parseD, dayDiff });
