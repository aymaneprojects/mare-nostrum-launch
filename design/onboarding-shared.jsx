// Shared onboarding state + small reusable bits used across all three
// variations. Each variation composes its own chrome, but they all feed
// the same form state + step machine.

const { useState, useMemo, useCallback } = React;

function useOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    lang: 'fr',
    company: '',
    size: '',
    sector: '',
    country: '',
    goals: [],
    tier: 'membre',
    billing: 'monthly',
    card: { name: '', number: '', exp: '', cvc: '' },
  });
  const total = MN_CONTENT.steps.length;
  const next = useCallback(() => setStep(s => Math.min(total - 1, s + 1)), [total]);
  const back = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
  const goto = useCallback((i) => setStep(i), []);
  const set = useCallback((patch) => setData(d => ({ ...d, ...patch })), []);
  const toggleGoal = useCallback((k) => setData(d => ({
    ...d,
    goals: d.goals.includes(k) ? d.goals.filter(g => g !== k) : [...d.goals, k],
  })), []);
  return { step, setStep, next, back, goto, data, set, toggleGoal, total };
}

// ────────── text helpers ──────────
function StepCounter({ step, total, color = '#6C7591' }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
      color, fontVariantNumeric: 'tabular-nums',
    }}>
      Étape {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
}

// Little wave bar used as progress indicator in a few variants.
function WaveProgress({ step, total, color = MN_COLORS.nuit, accent = MN_COLORS.turquoise, height = 6 }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div style={{ position: 'relative', height, width: '100%', background: 'rgba(36,51,93,0.08)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, width: `${pct}%`,
        background: `linear-gradient(90deg, ${color} 0%, ${accent} 100%)`,
        borderRadius: 999, transition: 'width .4s cubic-bezier(.7,0,.2,1)',
      }} />
    </div>
  );
}

// Stepper dots
function StepperDots({ step, total, color = MN_COLORS.nuit }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === step ? 22 : 6, height: 6, borderRadius: 999,
          background: i <= step ? color : 'rgba(36,51,93,0.18)',
          transition: 'all .35s cubic-bezier(.7,0,.2,1)',
        }} />
      ))}
    </div>
  );
}

// Text input — unstyled except for underline; each variation wraps it.
function TextField({ label, value, onChange, placeholder, color = MN_COLORS.nuit, accent = MN_COLORS.turquoise, autoFocus }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase',
        color: MN_COLORS.muted, fontWeight: 600, marginBottom: 10,
      }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', border: 'none', outline: 'none',
            padding: '8px 0 10px', fontSize: 22, color,
            background: 'transparent',
            borderBottom: `1.5px solid ${focus ? accent : 'rgba(36,51,93,0.18)'}`,
            fontFamily: 'inherit',
            transition: 'border-color .2s',
          }}
        />
      </div>
    </label>
  );
}

// Chip group
function ChipGroup({ options, value, onChange, color = MN_COLORS.nuit, accent = MN_COLORS.turquoise, multi = false, onToggle }) {
  const isActive = (o) => multi ? value.includes(o) : value === o;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map(o => {
        const active = isActive(o);
        return (
          <button key={o} onClick={() => multi ? onToggle(o) : onChange(o)} style={{
            padding: '10px 18px', borderRadius: 999,
            border: `1px solid ${active ? color : 'rgba(36,51,93,0.18)'}`,
            background: active ? color : 'transparent',
            color: active ? '#fff' : color,
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all .18s',
          }}>{o}</button>
        );
      })}
    </div>
  );
}

// Logo + wordmark — used in every header
function MNLogomark({ size = 36, color = MN_COLORS.nuit, showWord = true, wordSize }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src={LOGO_SRC} alt="Mare Nostrum" style={{
        width: size, height: size, display: 'block',
        objectFit: 'contain',
      }} />
      {showWord && (
        <div style={{ lineHeight: 1, color }}>
          <div style={{
            fontSize: wordSize || size * 0.42, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>Mare Nostrum</div>
          <div style={{
            fontSize: (wordSize || size * 0.42) * 0.72, fontWeight: 500,
            letterSpacing: 2, textTransform: 'uppercase', marginTop: 7,
            color: MN_COLORS.turquoise, whiteSpace: 'nowrap',
          }}>— Le Club</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  useOnboarding, StepCounter, WaveProgress, StepperDots,
  TextField, ChipGroup, MNLogomark,
});
