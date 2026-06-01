interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

function Controls({ isRunning, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.button,
          ...(isRunning ? styles.pauseButton : styles.startButton)
        }}
        onClick={isRunning ? onPause : onStart}
      >
        {isRunning ? '暂停' : '开始'}
      </button>
      <button style={styles.resetButton} onClick={onReset}>
        重置
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 16,
    marginBottom: 16
  },
  button: {
    padding: '12px 32px',
    borderRadius: 8,
    border: 'none',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  startButton: {
    background: '#E74C3C',
    color: '#FFFFFF'
  },
  pauseButton: {
    background: '#C0392B',
    color: '#FFFFFF'
  },
  resetButton: {
    padding: '12px 24px',
    borderRadius: 8,
    border: '1px solid #A0A0A0',
    background: 'transparent',
    color: '#A0A0A0',
    fontSize: 16,
    cursor: 'pointer'
  }
}

export default Controls
