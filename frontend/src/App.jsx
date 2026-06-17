import { useState, useEffect } from "react"
import axios from "axios"

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const API = "https://athletehub-backend-yvgn.onrender.com"

function App() {
  const [players, setPlayers] = useState([])
  const [stats, setStats] = useState(null)
  const [scouts, setScouts] = useState([])

  // ADD PLAYER
  const addPlayer = async () => {
    await axios.post(`${API}/add-player`, {
      name: "Derrick",
      points: Math.floor(Math.random() * 30),
      rebounds: Math.floor(Math.random() * 10),
      assists: Math.floor(Math.random() * 10)
    })

    loadPlayers()
    loadStats()
    loadScouts()
  }

  // LOAD PLAYERS
  const loadPlayers = async () => {
    const res = await axios.get(`${API}/players`)
    setPlayers(res.data)
  }

  // LOAD ANALYTICS
  const loadStats = async () => {
    try {
      const res = await axios.get(`${API}/analytics`)
      setStats(res.data)
    } catch (err) {
      console.log("Analytics not ready yet")
    }
  }

  // LOAD SCOUTING
  const loadScouts = async () => {
    try {
      const res = await axios.get(`${API}/scout`)
      setScouts(res.data)
    } catch (err) {
      console.log("Scout not ready yet")
    }
  }

  useEffect(() => {
    loadPlayers()
    loadStats()
    loadScouts()
  }, [])

  // CHART DATA
  const chartData = {
    labels: players.map(p => p[1]),
    datasets: [
      {
        label: "Points",
        data: players.map(p => p[2])
      }
    ]
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🏀 AthleteHub Dashboard</h1>

      {/* ANALYTICS */}
      {stats && (
        <div style={{ marginBottom: 20 }}>
          <h3>📊 Analytics</h3>
          <p>Average Points: {stats.average_points}</p>
          <p>Top Player: {stats.top_player?.[0]}</p>
        </div>
      )}

      <button onClick={addPlayer}>
        ➕ Add Player Stats
      </button>

      {/* PLAYERS */}
      <h2>🏆 Players</h2>

      {players.map((p, i) => (
        <div key={i} style={{ margin: "10px 0" }}>
          <b>{p[1]}</b> | PTS: {p[2]} | REB: {p[3]} | AST: {p[4]}
        </div>
      ))}

      {/* CHART */}
      <h2>📊 Player Performance Chart</h2>
      <div style={{ maxWidth: 600 }}>
        <Bar data={chartData} />
      </div>

      {/* AI SCOUTING */}
      <h2>🧠 AI Scouting Report</h2>

      {scouts.map((p, i) => (
        <div key={i} style={{ margin: "10px 0" }}>
          <b>{p.name}</b> — {p.role} — Score: {p.score}
        </div>
      ))}
    </div>
  )
}

export default App