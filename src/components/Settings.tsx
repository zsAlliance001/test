interface SettingsProps {
  settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
  }
  onChange: (settings: SettingsProps['settings']) => void
}

function Settings({ settings, onChange }: SettingsProps) {
  const handleChange = (key: keyof SettingsProps['settings'], value: number) => {
    onChange({ ...settings, [key]: value * 60 })
  }

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <label style={styles.label}>🍅 工作时间</label>
        <input
          type="number"
          min="1"
          max="60"
          value={settings.workDuration / 60}
          onChange={e => handleChange('workDuration', Number(e.target.value))}
          style={styles.input}
        />
        <span style={styles.unit}>分钟</span>
      </div>

      <div style={styles.row}>
        <label style={styles.label}>☕ 短休息</label>
        <input
          type="number"
          min="1"
          max="30"
          value={settings.shortBreakDuration / 60}
          onChange={e => handleChange('shortBreakDuration', Number(e.target.value))}
          style={styles.input}
        />
        <span style={styles.unit}>分钟</span>
      </div>

      <div style={styles.row}>
        <label style={styles.label}>🌿 长休息</label>
        <input
          type="number"
          min="1"
          max="60"
          value={settings.longBreakDuration / 60}
          onChange={e => handleChange('longBreakDuration', Number(e.target.value))}
          style={styles.input}
        />
        <span style={styles.unit}>分钟</span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    background: '#16213E',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF'
  },
  input: {
    width: 60,
    padding: '6px 8px',
    borderRadius: 6,
    border: '1px solid #A0A0A0',
    background: '#1A1A2E',
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center'
  },
  unit: {
    fontSize: 14,
    color: '#A0A0A0'
  }
}

export default Settings
