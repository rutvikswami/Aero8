'use client';
import { useData } from '@/context/DataContext';

export default function Team() {
  const { team, sections } = useData();
  if (!sections.team) return null;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="team-section" id="team">
      <div className="container">
        <h2 className="section-heading">The AERO8 Crew</h2>
        <p className="section-subtext" style={{ textAlign: 'center', margin: '0 auto' }}>
          8 engineers. 1 mission. Building India&apos;s robotics future.
        </p>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  getInitials(member.name)
                )}
              </div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              {member.bio && <p className="team-bio">{member.bio}</p>}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-linkedin">
                  in
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
