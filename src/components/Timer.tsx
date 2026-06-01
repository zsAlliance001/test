type Phase = 'work' | 'shortBreak' | 'longBreak'

interface TimerProps {
  timeLeft: number
  phase: Phase
  isRunning: boolean
}

function Timer({ timeLeft, phase, isRunning }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const getColor = () => {
    switch (phase) {
      case 'work': return '#E74C3C'
      case 'shortBreak': return '#2ECC71'
      case 'longBreak': return '#2ECC71'
    }
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.time,
          color: getColor(),
          animation: isRunning ? 'pulse 2s ease-in-out infinite' : 'none'
        }}
      >
        {timeString}
      </div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(0.98); }
          }
        `}
      </style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginTop: 40,
    marginBottom: 20
  },
  time: {
    fontFamily: 'Consolas, monospace',
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '0 0 20px rgba(231, 76, 60, 0.3)'
  }
}

export default Timer
