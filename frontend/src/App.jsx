import { useState, useEffect } from "react"
import axios from "axios"

const API = "https://athletehub-backend-yvgn.onrender.com"

function App() {
  const [tab, setTab] = useState("nba")
  const [nba, setNba] = useState([])
  const [search, setSearch] = useState("")
  const [dark, setDark] = useState(true)

  const [p1, setP1] = useState(null)
  const [p2, setP2] = useState(null)

  // LOAD NBA
  const loadNBA = async () => {
    const res = await axios.get(`${API}/nba-players`)
    setNba(res.data)
  }

  useEffect(() => {
    loadNBA()
  }, [])

  // FILTERED PLAYERS
  const filtered = nba.filter(p =>
    p.PLAYER_NAME.toLowerCase().includes(search.toLowerCase())
  )

  // TOP 5 LEADERBOARD
  const top5 = [...nba]
    .sort((a, b) => b.PTS - a.PTS)
    .slice(0, 5)

  // UI STYLE
  const theme = {
    background: dark ? "#0f0f0f" : "#f5f5f5",
    color: dark ? "white" : "black",
    minHeight: "100vh",
    padding: 20
  }

  return (
    <div style={theme}>
      {/* HEADER */}
      <h1>🏀 AthleteHub NBA Analytics</h1>

      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? "Light" : "Dark"} Mode
      </button>

      <button onClick={loadNBA} style={{ marginLeft: 10 }}>
        🔄 Refresh Stats
      </button>

      {/* TABS */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setTab("nba")}>NBA</button>
        <button onClick={() => setTab("compare")}>Compare</button>
        <button onClick={() => setTab("leaderboard")}>Leaderboard</button>
      </div>

      {/* SEARCH */}
      {tab === "nba" && (
        <>
          <input
            placeholder="Search NBA player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: 20, padding: 10, width: "100%" }}
          />

          {/* PLAYER CARDS */}
          {filtered.map((p, i) => (
            <div
              key={i}
              style={{
                background: dark ? "#1a1a1a" : "white",
                padding: 15,
                margin: 10,
                borderRadius: 10
              }}
            >
              <b>{p.PLAYER_NAME}</b> ({p.TEAM_ABBREVIATION})
              <div>PTS: {p.PTS} | REB: {p.REB} | AST: {p.AST}</div>

              <button onClick={() => setP1(p)}>Compare 1</button>
              <button onClick={() => setP2(p)} style={{ marginLeft: 5 }}>
                Compare 2
              </button>
            </div>
          ))}
        </>
      )}

      {/* COMPARE TAB */}
      {tab === "compare" && (
        <div style={{ marginTop: 20 }}>
          <h2>⚔️ Player Comparison</h2>

          {p1 && p2 ? (
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <h3>{p1.PLAYER_NAME}</h3>
                <p>PTS: {p1.PTS}</p>
                <p>REB: {p1.REB}</p>
                <p>AST: {p1.AST}</p>
              </div>

              <div>
                <h3>{p2.PLAYER_NAME}</h3>
                <p>PTS: {p2.PTS}</p>
                <p>REB: {p2.REB}</p>
                <p>AST: {p2.AST}</p>
              </div>
            </div>
          ) : (
            <p>Select 2 players from NBA tab</p>
          )}
        </div>
      )}

      {/* LEADERBOARD */}
      {tab === "leaderboard" && (
        <div style={{ marginTop: 20 }}>
          <h2>🏆 Top 5 Players</h2>

          {top5.map((p, i) => (
            <div key={i}>
              #{i + 1} {p.PLAYER_NAME} - {p.PTS} PTS
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App