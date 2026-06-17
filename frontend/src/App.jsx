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

// YOUR BACKEND
const API = "https://athletehub-backend-yvgn.onrender.com"

function App() {
  const [players, setPlayers] = useState([])

  // LOAD NBA PLAYERS
  const loadPlayers = async () => {
    try {
      const res = await axios.get(`${API}/nba-players`)
      setPlayers(res.data)
    } catch (err) {
      console.log("Failed to load NBA players", err)
    }
  }

  useEffect(() => {
    loadPlayers()
  }, [])

  // CHART DATA (NBA FORMAT: [name, pts, reb, ast])
  const chartData = {
    labels: players.map(p => p[0]),
    datasets: [
      {
        label: "Points",
        data: players.map(p => p[1])
      }
    ]
  }

  return (
    <div style={{
      padding: 30,
      maxWidth: 1000,
      margin: "0 auto",
      fontFamily: "Arial"
    }}>
      
      <h1>🏀 AthleteHub - NBA Analytics</h1>

      {/* PLAYER LIST */}
      <div style={{
        background: "#f5f5f5",
        padding: 20,
        borderRadius: 10,
        marginTop: 20
      }}>
        <h2>🏆 NBA Players</h2>

        {players.length === 0 && <p>Loading players...</p>}

        {players.map((p, i) => (
          <div key={i} style={{ margin: "8px 0" }}>
            <b>{p[0]}</b> | PTS: {p[1]} | REB: {p[2]} | AST: {p[3]}
          </div>
        ))}
      </div>

      {/* CHART */}
      <div style={{
        background: "#f5f5f5",
        padding: 20,
        borderRadius: 10,
        marginTop: 20
      }}>
        <h2>📊 Points Chart</h2>

        <div style={{ maxWidth: 700 }}>
          <Bar data={chartData} />
        </div>
      </div>

    </div>
  )
}

export default App