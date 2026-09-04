const PHRASES = [
  "Transparent",
  "Fair",
  "Impact-Driven",
  "Merit-Based Rankings",
  "Verified Completions",
  "Real Campus Impact",
];

/**
 * Neo-brutalist ticker band. The phrase list is rendered twice so the track
 * can loop seamlessly at -50%.
 */
export function Marquee() {
  const track = [...PHRASES, ...PHRASES];

  return (
    <div className="overflow-hidden border-b-2 border-line bg-accent py-3">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {track.map((phrase, index) => (
          <span key={index} className="flex items-center gap-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
              {phrase}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 bg-white" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
