'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

// ============ GAME 1: A8 NAVIGATOR (Mars Rover) ============
function A8Navigator({ onScore }) {
  const canvasRef = useRef(null);
  const gameRef = useRef({ active: false, score: 0, speed: 3 });
  const animRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 400;

    const rover = { x: 80, y: 300, w: 50, h: 30, vy: 0, jumping: false };
    const obstacles = [];
    let frame = 0;
    let gameScore = 0;
    gameRef.current = { active: true, score: 0, speed: 3 };
    setGameState('playing');
    setScore(0);

    const jump = () => {
      if (!rover.jumping) {
        rover.vy = -12;
        rover.jumping = true;
      }
    };

    const keyHandler = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    };
    const tapHandler = () => jump();
    window.addEventListener('keydown', keyHandler);
    canvas.addEventListener('click', tapHandler);

    const loop = () => {
      if (!gameRef.current.active) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mars ground
      ctx.fillStyle = '#2a1000';
      ctx.fillRect(0, 360, canvas.width, 40);
      ctx.fillStyle = '#3a1500';
      ctx.fillRect(0, 355, canvas.width, 8);

      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 47 + frame * 0.3) % canvas.width);
        ctx.fillRect(sx, (i * 13) % 300, 1, 1);
      }

      // Rover
      rover.vy += 0.6;
      rover.y += rover.vy;
      if (rover.y >= 300) { rover.y = 300; rover.vy = 0; rover.jumping = false; }

      // Draw rover body
      ctx.fillStyle = '#F5A623';
      ctx.fillRect(rover.x, rover.y, rover.w, rover.h);
      ctx.fillStyle = '#000';
      ctx.fillRect(rover.x + 8, rover.y - 12, 34, 14);
      ctx.fillStyle = '#3AA0FF';
      ctx.fillRect(rover.x + 10, rover.y - 10, 30, 10);
      // Wheels
      ctx.fillStyle = '#888';
      [rover.x + 5, rover.x + 20, rover.x + 35].forEach(wx => {
        ctx.beginPath();
        ctx.arc(wx, rover.y + rover.h, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn obstacles
      const spd = gameRef.current.speed;
      if (frame % Math.max(60 - Math.floor(gameScore / 100), 30) === 0) {
        const h = 30 + Math.random() * 40;
        obstacles.push({ x: canvas.width, y: 360 - h, w: 20, h });
      }

      // Update & draw obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= spd;
        ctx.fillStyle = '#FF3A3A';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        // Collision
        if (rover.x + rover.w - 8 > obs.x && rover.x + 8 < obs.x + obs.w &&
            rover.y + rover.h > obs.y && rover.y < obs.y + obs.h) {
          gameRef.current.active = false;
          window.removeEventListener('keydown', keyHandler);
          canvas.removeEventListener('click', tapHandler);
          setGameState('over');
          setScore(gameScore);
          onScore && onScore('A8 Navigator', gameScore);
          cancelAnimationFrame(animRef.current);
          return;
        }
        if (obs.x + obs.w < 0) obstacles.splice(i, 1);
      }

      gameScore++;
      gameRef.current.speed = 3 + Math.floor(gameScore / 200) * 0.5;
      setScore(gameScore);

      // Score display
      ctx.fillStyle = '#F5A623';
      ctx.font = 'bold 14px Orbitron, monospace';
      ctx.fillText(`SCORE: ${gameScore}`, 10, 30);

      frame++;
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
  }, [onScore]);

  useEffect(() => {
    return () => {
      gameRef.current.active = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-canvas-wrapper">
        <canvas ref={canvasRef} className="game-canvas" width={700} height={400} />
        {gameState === 'idle' && (
          <div className="game-overlay">
            <div className="game-overlay-title">A8 NAVIGATOR</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>
              Drive A8 across Mars. Press SPACE or tap to jump over obstacles!
            </p>
            <button className="btn-primary" onClick={startGame}>START MISSION</button>
          </div>
        )}
        {gameState === 'over' && (
          <div className="game-overlay">
            <div className="game-overlay-title">MISSION FAILED</div>
            <div className="game-overlay-score">Surge got you! Score: {score}</div>
            <button className="btn-primary" onClick={startGame}>TRY AGAIN</button>
          </div>
        )}
      </div>
      {gameState === 'playing' && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginTop: '12px' }}>
          SPACE / ↑ to jump — tap canvas on mobile
        </p>
      )}
    </div>
  );
}

// ============ GAME 4: SENSOR QUIZ ============
function SensorQuiz({ questions, onScore }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const letters = ['A', 'B', 'C', 'D'];

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setCorrect(c => c + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true);
        const finalScore = ((idx === q.correct ? correct + 1 : correct) / questions.length) * 100;
        onScore && onScore('Sensor Quiz', Math.round(finalScore));
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setAnswered(false);
      }
    }, 1200);
  };

  const restart = () => { setCurrent(0); setSelected(null); setAnswered(false); setCorrect(0); setDone(false); };

  if (done) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-question-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{pct >= 70 ? '🏆' : '📚'}</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: pct >= 70 ? 'var(--success-green)' : 'var(--accent-amber)', marginBottom: '12px' }}>
            {pct >= 70 ? 'MISSION PASSED!' : 'KEEP TRAINING!'}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            {correct} / {questions.length} correct ({pct}%)
          </p>
          <button className="btn-primary" onClick={restart}>RETRY QUIZ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="progress-bar" style={{ flex: 1, marginRight: '16px' }}>
          <div className="progress-bar-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
        </div>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {current + 1} / {questions.length}
        </span>
      </div>
      <div className="quiz-question-card">
        <div className="quiz-question-number">QUESTION {current + 1}</div>
        <div className="quiz-question-text">{q.question}</div>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (answered) {
              if (i === q.correct) cls += ' correct';
              else if (i === selected) cls += ' wrong';
            } else if (i === selected) cls += ' selected';
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                <span className="quiz-option-letter">{letters[i]}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ GAME 3: CODE BREAKER (Block Coding Maze) ============
function CodeBreaker({ onScore }) {
  const [commands, setCommands] = useState([]);
  const [running, setRunning] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState('');
  const [solved, setSolved] = useState(0);

  const mazes = [
    {
      grid: [
        [0, 0, 1, 0, 2],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0],
      ],
      start: { x: 0, y: 0 },
      goal: { x: 4, y: 0 },
    },
  ];

  const maze = mazes[0];
  const CELL = 56;

  const addCmd = (cmd) => {
    if (running) return;
    setCommands(prev => [...prev, { id: Date.now() + Math.random(), cmd }]);
  };

  const removeCmd = (id) => setCommands(prev => prev.filter(c => c.id !== id));

  const runCommands = async () => {
    setRunning(true);
    setMessage('');
    let pos = { ...maze.start };
    setPlayerPos({ ...maze.start });

    for (const { cmd } of commands) {
      await new Promise(r => setTimeout(r, 400));
      let nx = pos.x, ny = pos.y;
      if (cmd === 'Right') nx++;
      if (cmd === 'Left') nx--;
      if (cmd === 'Down') ny++;
      if (cmd === 'Up') ny--;
      if (nx < 0 || nx > 4 || ny < 0 || ny > 4 || maze.grid[ny][nx] === 1) {
        setMessage('💥 A8 hit a wall! Try again.');
        setRunning(false);
        setPlayerPos({ ...maze.start });
        return;
      }
      pos = { x: nx, y: ny };
      setPlayerPos({ ...pos });
    }

    if (pos.x === maze.goal.x && pos.y === maze.goal.y) {
      setMessage('🎉 Goal reached!');
      setSolved(s => s + 1);
      onScore && onScore('Code Breaker', (solved + 1) * 100);
    } else {
      setMessage('🔍 Keep going — A8 hasn\'t reached the goal yet.');
    }
    setRunning(false);
  };

  const BLOCK_CMDS = ['Right', 'Left', 'Up', 'Down'];
  const blockColors = { Right: '#F5A623', Left: '#3AA0FF', Up: '#39FF85', Down: '#FF3A3A' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--accent-amber)', marginBottom: '16px' }}>MAZE</h3>
        <div style={{ display: 'inline-block', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
          {maze.grid.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.map((cell, x) => {
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isGoal = maze.goal.x === x && maze.goal.y === y;
                const isWall = cell === 1;
                return (
                  <div key={x} style={{
                    width: CELL, height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isWall ? '#1F1F1F' : '#111', fontSize: '24px',
                    border: '1px solid #0a0a0a',
                  }}>
                    {isPlayer ? '🤖' : isGoal ? '🏁' : isWall ? '🧱' : ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {message && (
          <p style={{ marginTop: '12px', fontSize: '14px', color: message.includes('🎉') ? 'var(--success-green)' : 'var(--danger-red)' }}>
            {message}
          </p>
        )}
        {solved > 0 && <p style={{ color: 'var(--accent-amber)', fontSize: '13px' }}>Mazes solved: {solved}</p>}
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--accent-amber)', marginBottom: '16px' }}>COMMAND BLOCKS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {BLOCK_CMDS.map(cmd => (
            <button key={cmd} onClick={() => addCmd(cmd)} style={{
              padding: '10px', borderRadius: '6px', background: `${blockColors[cmd]}15`,
              border: `1px solid ${blockColors[cmd]}40`, color: blockColors[cmd],
              fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {cmd === 'Right' ? '→' : cmd === 'Left' ? '←' : cmd === 'Up' ? '↑' : '↓'} {cmd.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ minHeight: '120px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
          {commands.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Click command blocks to add them here...</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {commands.map(({ id, cmd }) => (
                <span key={id} onClick={() => removeCmd(id)} style={{
                  padding: '4px 10px', borderRadius: '4px', background: `${blockColors[cmd]}20`,
                  border: `1px solid ${blockColors[cmd]}40`, color: blockColors[cmd],
                  fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                }}>
                  {cmd === 'Right' ? '→' : cmd === 'Left' ? '←' : cmd === 'Up' ? '↑' : '↓'} {cmd}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-primary" onClick={runCommands} disabled={running || commands.length === 0} style={{ flex: 1 }}>
            {running ? 'RUNNING...' : '▶ RUN'}
          </button>
          <button className="btn-secondary" onClick={() => { setCommands([]); setPlayerPos({ ...maze.start }); setMessage(''); }}>
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ GAME 2: CIRCUIT BUILDER ============
function CircuitBuilder({ onScore }) {
  const [placed, setPlaced] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [message, setMessage] = useState('');

  const PARTS = [
    { id: 'battery', label: '🔋 Battery', color: '#39FF85' },
    { id: 'led', label: '💡 LED', color: '#F5A623' },
    { id: 'resistor', label: '⚡ Resistor', color: '#3AA0FF' },
    { id: 'wire', label: '🔌 Wire', color: '#888' },
  ];
  const required = ['battery', 'resistor', 'led', 'wire'];

  const addPart = (part) => {
    if (placed.find(p => p.id === part.id)) return;
    const newPlaced = [...placed, part];
    setPlaced(newPlaced);
    const hasAll = required.every(r => newPlaced.find(p => p.id === r));
    if (hasAll) {
      setMessage('✅ Circuit complete! LED is glowing!');
      setCompleted(c => c + 1);
      onScore && onScore('Circuit Builder', (completed + 1) * 150);
      setTimeout(() => { setPlaced([]); setMessage('🔄 Build another circuit!'); }, 2000);
    }
  };

  const removePart = (id) => setPlaced(prev => prev.filter(p => p.id !== id));

  const isSurgeActive = placed.length > 0 && !placed.find(p => p.id === 'battery') && placed.length >= 2;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--accent-amber)', marginBottom: '16px' }}>
            COMPONENTS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PARTS.map(part => {
              const isPlaced = placed.find(p => p.id === part.id);
              return (
                <button key={part.id} onClick={() => !isPlaced && addPart(part)} disabled={!!isPlaced} style={{
                  padding: '12px 16px', borderRadius: '6px', background: isPlaced ? 'rgba(255,255,255,0.03)' : `${part.color}10`,
                  border: `1px solid ${isPlaced ? 'var(--border-color)' : part.color + '40'}`,
                  color: isPlaced ? 'var(--text-muted)' : part.color,
                  fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700,
                  cursor: isPlaced ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left',
                  opacity: isPlaced ? 0.5 : 1,
                }}>
                  {part.label} {isPlaced ? '(placed)' : ''}
                </button>
              );
            })}
          </div>
          {completed > 0 && <p style={{ color: 'var(--accent-amber)', fontSize: '13px', marginTop: '12px' }}>Circuits built: {completed}</p>}
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--accent-amber)', marginBottom: '16px' }}>
            BREADBOARD
          </h3>
          <div style={{
            background: '#0a1a0a', border: '2px solid #1F2F1F', borderRadius: '8px',
            minHeight: '200px', padding: '16px', position: 'relative',
          }}>
            {placed.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Drop components onto the breadboard...</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {placed.map(p => (
                  <div key={p.id} onClick={() => removePart(p.id)} style={{
                    padding: '8px 12px', borderRadius: '6px', background: `${p.color}15`,
                    border: `1px solid ${p.color}40`, color: p.color,
                    fontFamily: 'var(--font-heading)', fontSize: '11px', cursor: 'pointer',
                  }}>
                    {p.label}
                  </div>
                ))}
              </div>
            )}
            {isSurgeActive && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(255,58,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '8px', fontSize: '32px',
              }}>
                ⚡ Surge Attack!
              </div>
            )}
          </div>
          {message && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: message.includes('✅') ? 'var(--success-green)' : 'var(--text-muted)' }}>
              {message}
            </p>
          )}
          <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            Click a placed component to remove it
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN MISSION ZONE PAGE ============
export default function MissionZonePage() {
  const { games, quizQuestions, leaderboard, setLeaderboard, sections } = useData();
  const { student, addPoints } = useAuth();
  const [activeGame, setActiveGame] = useState(null);

  const handleScore = (gameName, score) => {
    if (student) {
      addPoints(5);
      const entry = {
        id: Date.now(),
        name: student.name,
        institution: student.institution || 'Unknown',
        city: student.city || 'Unknown',
        game: gameName,
        score,
        date: new Date().toLocaleDateString('en-IN'),
      };
      setLeaderboard(prev => [...(prev || []), entry]);
    }
  };

  const gameComponents = {
    'game-01': <A8Navigator onScore={handleScore} />,
    'game-02': <CircuitBuilder onScore={handleScore} />,
    'game-03': <CodeBreaker onScore={handleScore} />,
    'game-04': <SensorQuiz questions={quizQuestions} onScore={handleScore} />,
  };

  const gameIcons = { 'game-01': '🚀', 'game-02': '⚡', 'game-03': '💻', 'game-04': '🧠' };
  const gameBgs = {
    'game-01': 'linear-gradient(135deg, #2a0a00, #0a0a0a)',
    'game-02': 'linear-gradient(135deg, #0a1a00, #0a0a0a)',
    'game-03': 'linear-gradient(135deg, #00102a, #0a0a0a)',
    'game-04': 'linear-gradient(135deg, #1a0a1a, #0a0a0a)',
  };

  const sortedLeaderboard = [...(leaderboard || [])].sort((a, b) => b.score - a.score).slice(0, 20);

  return (
    <>
      <Navbar />
      <AuthModal />
      <div className="mission-zone-page">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>INTERACTIVE</div>
            <h1 className="section-heading" style={{ textAlign: 'center' }}>MISSION ZONE</h1>
            <p className="section-subtext" style={{ textAlign: 'center', margin: '0 auto' }}>
              Test your skills. Earn your rank. Top engineers get recognized.
            </p>
          </div>

          {activeGame ? (
            <div>
              <button onClick={() => setActiveGame(null)} className="btn-secondary" style={{ marginBottom: '32px', fontSize: '12px' }}>
                ← BACK TO GAMES
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '32px', color: 'var(--accent-amber)' }}>
                {gameIcons[activeGame]} {games.find(g => g.id === activeGame)?.name}
              </h2>
              {gameComponents[activeGame]}
            </div>
          ) : (
            <>
              <div className="games-grid">
                {games.filter(g => g.visible).map(game => (
                  <div key={game.id} className="game-card" onClick={() => setActiveGame(game.id)}>
                    <div className="game-preview" style={{ background: gameBgs[game.id] }}>
                      <span className="game-preview-icon">{gameIcons[game.id]}</span>
                    </div>
                    <div className="game-info">
                      <h3 className="game-name">{game.name}</h3>
                      <p className="game-desc">{game.description}</p>
                      <button className="game-play-btn">PLAY NOW →</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '80px' }}>
                <h2 className="section-heading" style={{ textAlign: 'center' }}>🏆 LEADERBOARD</h2>
                {sortedLeaderboard.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🎮</div>
                    <p className="empty-state-title">No scores yet — be the first!</p>
                  </div>
                ) : (
                  <div className="leaderboard-table-wrapper">
                    <table className="leaderboard-table">
                      <thead>
                        <tr>
                          <th>Rank</th><th>Player</th><th>Institution</th><th>City</th><th>Game</th><th>Score</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedLeaderboard.map((entry, i) => (
                          <tr key={entry.id}>
                            <td>
                              <div className={`rank-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'normal'}`}>
                                {i + 1}
                              </div>
                            </td>
                            <td style={{ color: 'var(--text-white)', fontWeight: 600 }}>{entry.name}</td>
                            <td>{entry.institution}</td>
                            <td>{entry.city}</td>
                            <td><span className="hero-badge" style={{ fontSize: '10px' }}>{entry.game}</span></td>
                            <td style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{entry.score}</td>
                            <td>{entry.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
