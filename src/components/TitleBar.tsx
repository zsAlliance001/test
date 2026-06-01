function TitleBar() {
  const handleMinimize = () => window.electronAPI?.minimize()
  const handleClose = () => window.electronAPI?.close()

  return (
    <div style={styles.titleBar}>
      <span style={styles.title}>番茄钟</span>
      <div style={styles.controls}>
        <button style={styles.btn} onClick={handleMinimize} title="最小化">
          ─
        </button>
        <button style={{ ...styles.btn, ...styles.closeBtn }} onClick={handleClose} title="关闭">
          ×
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  titleBar: {
    height: 32,
    background: 'linear-gradient(90deg, #0F0F23 0%, #1A1A2E 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    WebkitAppRegion: 'drag' as 'drag'
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 500
  },
  controls: {
    display: 'flex',
    gap: 8,
    WebkitAppRegion: 'no-drag' as 'no-drag'
  },
  btn: {
    width: 24,
    height: 24,
    border: 'none',
    borderRadius: 4,
    background: 'transparent',
    color: '#A0A0A0',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBtn: {
    color: '#E74C3C'
  }
}

export default TitleBar
