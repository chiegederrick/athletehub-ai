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

  // LOAD NBA DATA
  const loadNBA = async () => {
    const res = await axios.get(`${API}/nba-players`)
    setNba(res.data)
  }

  useEffect(() => {
    loadNBA()
  }, [])

  // FILTER SEARCH
  const filtered = nba.filter(p =>
    p.PLAYER_NAME.toLowerCase().includes(search.toLowerCase())
  )

  // TOP LEADERSHIPS
  const topPoints = [...nba].sort((a, b) => b.PTS - a.PTS).slice(0, 5)
  const topReb = [...nba].sort((a, b) => b.REB - a.REB).slice(0, 5)
  const topAst = [...nba].sort((a, b) => b.AST - a.AST).slice(0, 5)

  // THEME
  const theme = {
    background: dark ? "#0b0f1a" : "#f5f5f5",
    color: dark ? "#ffffff" : "#111",
    minHeight: "100vh",
    padding: 20,
    fontFamily: "'Roboto Condensed', Arial, sans-serif"
  }

  return (
    <div style={theme}>

      {/* HEADER */}
      <h1 style={{
        color: dark ? "#00d4ff" : "#111",
        fontSize: "38px",
        fontWeight: "800"
      }}>
        🏀 StatShot
      </h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setDark(!dark)}>Toggle Theme</button>
        <button onClick={loadNBA} style={{ marginLeft: 10 }}>
          🔄 Refresh Stats
        </button>
      </div>

      {/* TABS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("nba")}>NBA</button>
        <button onClick={() => setTab("compare")}>Compare</button>
        <button onClick={() => setTab("leaderboard")}>Leaderboard</button>
      </div>

      {/* ================= NBA TAB ================= */}
      {tab === "nba" && (
        <>
          {/* SEARCH */}
          <input
            placeholder="Search NBA player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: 10,
              width: "100%",
              borderRadius: 8,
              marginBottom: 20
            }}
          />

          {/* PLAYER GRID */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 15
          }}>
            {filtered.map((p, i) => (
              <div
                key={i}
                style={{
                  background: dark ? "#151a2e" : "white",
                  padding: 15,
                  borderRadius: 12,
                  border: dark ? "1px solid #222" : "1px solid #ddd",
                  cursor: "pointer"
                }}
              >
                <h3>{p.PLAYER_NAME}</h3>
                <p>🏀 {p.TEAM_ABBREVIATION}</p>
                <p>PTS: {p.PTS} | REB: {p.REB} | AST: {p.AST}</p>

                <button onClick={() => setP1(p)}>Compare 1</button>
                <button onClick={() => setP2(p)} style={{ marginLeft: 5 }}>
                  Compare 2
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= COMPARE TAB ================= */}
      {tab === "compare" && (
        <div>
          <h2>⚔️ Player Comparison</h2>

          {p1 && p2 ? (
            <div style={{ display: "flex", gap: 40 }}>
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

      {/* ================= LEADERBOARD TAB ================= */}
      {tab === "leaderboard" && (
        <div>
          <h2>🏆 Leaderboards</h2>

          <h3>🔥 Points Leaders</h3>
          {topPoints.map((p, i) => (
            <p key={i}>{p.PLAYER_NAME} - {p.PTS}</p>
          ))}

          <h3>💪 Rebounds Leaders</h3>
          {topReb.map((p, i) => (
            <p key={i}>{p.PLAYER_NAME} - {p.REB}</p>
          ))}

          <h3>🎯 Assists Leaders</h3>
          {topAst.map((p, i) => (
            <p key={i}>{p.PLAYER_NAME} - {p.AST}</p>
          ))}
        </div>
      )}

    </div>
  )
}

export default App