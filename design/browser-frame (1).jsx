// Minimal browser window chrome + mobile phone frame, used to present
// each variation of the onboarding. Not a starter — hand-rolled so it
// matches the MN palette.

function MNBrowser({ url = 'clubmarenostrum.com/adhesion', width = 1280, height = 820, children, theme = 'light' }) {
  const chromeBg = theme === 'dark' ? '#0b1226' : '#eceae3';
  const chromeLine = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const addressBg = theme === 'dark' ? '#1a2142' : '#f6f2ea';
  const addressText = theme === 'dark' ? '#b7c1df' : '#555f7a';
  return (
    <div style={{
      width, height, borderRadius: 10, overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08), 0 24px 60px rgba(15,23,51,0.14)',
      border: `1px solid ${chromeLine}`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 40, background: chromeBg, display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 14, borderBottom: `1px solid ${chromeLine}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 24, background: addressBg, borderRadius: 5,
          display: 'flex', alignItems: 'center', padding: '0 12px',
          fontSize: 12, color: addressText, fontFamily: 'ui-monospace, Menlo, monospace',
          letterSpacing: 0.2,
        }}>
          <span style={{ opacity: 0.55, marginRight: 8 }}>🔒</span>{url}
        </div>
        <div style={{ width: 40 }} />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#fff' }}>
        {children}
      </div>
    </div>
  );
}

function MNPhone({ width = 340, height = 720, children, theme = 'light' }) {
  const bezel = theme === 'dark' ? '#060a1a' : '#1a2142';
  return (
    <div style={{
      width, height, borderRadius: 42,
      background: bezel, padding: 10,
      boxShadow: '0 30px 80px rgba(15,23,51,0.25), inset 0 0 0 2px rgba(255,255,255,0.05)',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 34,
        overflow: 'hidden', position: 'relative', background: '#fff',
      }}>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 22px 0 26px', fontSize: 13, fontWeight: 600,
          color: theme === 'dark' ? '#e9edf8' : '#0F1733', zIndex: 50,
          pointerEvents: 'none',
        }}>
          <span>9:41</span>
          <div style={{
            position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
            width: 96, height: 26, borderRadius: 14, background: '#060a1a',
          }} />
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11 }}>●●●</span>
            <span style={{
              width: 22, height: 11, borderRadius: 3,
              border: `1.5px solid ${theme === 'dark' ? '#e9edf8' : '#0F1733'}`,
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute', inset: 1, width: '75%',
                background: theme === 'dark' ? '#e9edf8' : '#0F1733', borderRadius: 1,
              }} />
            </span>
          </span>
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MNBrowser, MNPhone });
