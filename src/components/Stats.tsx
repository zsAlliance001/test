interface StatsProps {
  pomodoroCount: number
}

function Stats({ pomodoroCount }: StatsProps) {
  return (
    <div style={styles.container}>
      <span style={styles.label}>今日完成</span>
      <span style={styles.count}>{pomodoroCount}</span>
      <span style={styles.unit}>个</span>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginTop: 'auto',
    padding: '12px 16px',
    background: '#16213E',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    width: '100%',
    justifyContent: 'center'
  },
  label: {
    fontSize: 14,
    color: '#A0A0A0'
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F39C12'
  },
  unit: {
    fontSize: 14,
    color: '#A0A0A0'
  }
}

export default Stats
