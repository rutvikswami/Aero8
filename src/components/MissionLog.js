'use client';
import { useData } from '@/context/DataContext';

export default function MissionLog() {
  const { missionLog } = useData();

  const items = [...missionLog, ...missionLog]; // duplicate for seamless loop

  return (
    <div className="mission-log-ticker">
      <div className="ticker-track">
        {items.map((entry, i) => (
          <div key={`${entry.id}-${i}`} className="ticker-item">
            <span className="ticker-dot" />
            <span>{entry.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
