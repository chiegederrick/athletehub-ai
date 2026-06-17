from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# NBA API IMPORT
from nba_api.stats.endpoints import leaguedashplayerstats

app = FastAPI()

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATABASE SETUP ----------------
def init_db():
    conn = sqlite3.connect("athletehub.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            points INTEGER,
            rebounds INTEGER,
            assists INTEGER
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ---------------- DATA MODEL ----------------
class PlayerStats(BaseModel):
    name: str
    points: int
    rebounds: int
    assists: int

# ---------------- ROUTES ----------------

@app.get("/")
def home():
    return {"message": "AthleteHub API Running"}

# ADD PLAYER (manual input still works)
@app.post("/add-player")
def add_player(stats: PlayerStats):
    conn = sqlite3.connect("athletehub.db")
    c = conn.cursor()

    c.execute("""
        INSERT INTO players (name, points, rebounds, assists)
        VALUES (?, ?, ?, ?)
    """, (stats.name, stats.points, stats.rebounds, stats.assists))

    conn.commit()
    conn.close()

    return {"message": "Player added successfully"}

# GET MANUAL PLAYERS (your DB)
@app.get("/players")
def get_players():
    conn = sqlite3.connect("athletehub.db")
    c = conn.cursor()

    c.execute("SELECT * FROM players")
    rows = c.fetchall()

    conn.close()
    return rows

# ANALYTICS
@app.get("/analytics")
def analytics():
    conn = sqlite3.connect("athletehub.db")
    c = conn.cursor()

    c.execute("SELECT AVG(points) FROM players")
    avg_points = c.fetchone()[0] or 0

    c.execute("""
        SELECT name, points 
        FROM players 
        ORDER BY points DESC 
        LIMIT 1
    """)
    top_player = c.fetchone()

    conn.close()

    return {
        "average_points": round(avg_points, 2),
        "top_player": top_player
    }

# AI SCOUTING SYSTEM
@app.get("/scout")
def scout_players():
    conn = sqlite3.connect("athletehub.db")
    c = conn.cursor()

    c.execute("SELECT name, points, rebounds, assists FROM players")
    data = c.fetchall()
    conn.close()

    if not data:
        return []

    scouts = []

    for player in data:
        name, pts, reb, ast = player

        score = (pts * 0.5) + (reb * 0.3) + (ast * 0.2)

        if pts > 25:
            role = "Elite Scorer"
        elif ast > 7:
            role = "Playmaker"
        elif reb > 8:
            role = "Rebound Specialist"
        else:
            role = "Balanced Player"

        scouts.append({
            "name": name,
            "score": round(score, 2),
            "role": role
        })

    return scouts


# ---------------- REAL NBA DATA (NEW PART) ----------------

@app.get("/nba-players")
def nba_players():
    data = leaguedashplayerstats.LeagueDashPlayerStats().get_data_frames()[0]

    players = data[[
        "PLAYER_NAME",
        "TEAM_ABBREVIATION",
        "PTS",
        "REB",
        "AST"
    ]]

    return players.to_dict(orient="records")