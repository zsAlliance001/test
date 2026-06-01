import { useState, useEffect, useCallback, useRef } from 'react'
import TitleBar from './components/TitleBar'
import Timer from './components/Timer'
import Controls from './components/Controls'
import Settings from './components/Settings'
import Stats from './components/Stats'

type Phase = 'work' | 'shortBreak' | 'longBreak'

interface Settings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
}

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60
}

function App() {
  const [phase, setPhase] = useState<Phase>('work')
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const getPhaseLabel = (p: Phase) => {
    switch (p) {
      case 'work': return '🍅 工作'
      case 'shortBreak': return '☕ 短休息'
      case 'longBreak': return '🌿 长休息'
    }
  }

  const getPhaseTime = useCallback((p: Phase) => {
    switch (p) {
      case 'work': return settings.workDuration
      case 'shortBreak': return settings.shortBreakDuration
      case 'longBreak': return settings.longBreakDuration
    }
  }, [settings])

  const switchToNextPhase = useCallback(() => {
    setIsRunning(false)

        if (phase === 'work') {
      const newCount = pomodoroCount + 1
      setPomodoroCount(newCount)
      window.electronAPI?.setStore('pomodoroCount', newCount)

      if (newCount % 4 === 0) {
        setPhase('longBreak')
        setTimeLeft(getPhaseTime('longBreak'))
        window.electronAPI?.showNotification('番茄钟', '太棒了！完成4个番茄，开始长休息 🌿')
      } else {
        setPhase('shortBreak')
        setTimeLeft(getPhaseTime('shortBreak'))
        window.electronAPI?.showNotification('番茄钟', '休息一下！☕')
      }
    } else {
      setPhase('work')
      setTimeLeft(getPhaseTime('work'))
      window.electronAPI?.showNotification('番茄钟', '开始新的番茄！🍅')
    }
  }, [phase, pomodoroCount, settings])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      switchToNextPhase()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, switchToNextPhase])

  useEffect(() => {
    const unsubToggle = window.electronAPI?.onTrayToggle(() => {
      setIsRunning(r => !r)
    })
    const unsubReset = window.electronAPI?.onTrayReset(() => {
      setIsRunning(false)
      setTimeLeft(getPhaseTime(phase))
    })

    return () => {
      unsubToggle?.()
      unsubReset?.()
    }
  }, [phase, getPhaseTime])

  useEffect(() => {
    const loadStats = async () => {
      const today = new Date().toDateString()
      const savedDate = await window.electronAPI?.getStore('statsDate')
      const savedCount = await window.electronAPI?.getStore('pomodoroCount') as number | undefined

      if (savedDate !== today) {
        await window.electronAPI?.setStore('statsDate', today)
        await window.electronAPI?.setStore('pomodoroCount', 0)
        setPomodoroCount(0)
      } else if (typeof savedCount === 'number') {
        setPomodoroCount(savedCount)
      }

      const savedSettings = await window.electronAPI?.getStore('settings') as Settings | undefined
      if (savedSettings) {
        setSettings(savedSettings)
        setTimeLeft(getPhaseTime(phase))
      }
    }
    loadStats()
  }, [])

  useEffect(() => {
    if (phase === 'work' && !isRunning) {
      setTimeLeft(settings.workDuration)
    }
  }, [settings.workDuration, phase, isRunning])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(getPhaseTime(phase))
  }

  const handleSettingChange = async (newSettings: Settings) => {
    setSettings(newSettings)
    await window.electronAPI?.setStore('settings', newSettings)
    if (!isRunning) {
      setTimeLeft(getPhaseTime(phase))
    }
  }

  return (
    <div style={styles.container}>
      <TitleBar />

      <div style={styles.content}>
        <Timer
          timeLeft={timeLeft}
          phase={phase}
          isRunning={isRunning}
        />

        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />

        <div style={styles.phaseIndicator}>
          {getPhaseLabel(phase)}
        </div>

        <div style={styles.pomodoroDots}>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={styles.dot}>
              {i < (pomodoroCount % 8) ? '●' : '○'}
            </span>
          ))}
        </div>

        <button
          style={styles.settingsButton}
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? '收起设置' : '⚙️ 设置'}
        </button>

        {showSettings && (
          <Settings
            settings={settings}
            onChange={handleSettingChange}
          />
        )}

        <Stats pomodoroCount={pomodoroCount} />
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #0F0F23 0%, #1A1A2E 100%)',
    borderRadius: 16,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    gap: 12
  },
  phaseIndicator: {
    fontSize: 16,
    color: '#A0A0A0'
  },
  pomodoroDots: {
    fontSize: 12,
    letterSpacing: 4,
    color: '#E74C3C'
  },
  dot: {
    margin: '0 2px'
  },
  settingsButton: {
    background: 'transparent',
    border: '1px solid #A0A0A0',
    color: '#A0A0A0',
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14
  }
}

export default App
