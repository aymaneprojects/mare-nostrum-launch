// Sprite: 4 colonnes × 2 lignes
// Ligne 0: lighthouse, anchor, sailboat, wheel
// Ligne 1: telescope, map, handshake, buoy
type IconName = "lighthouse" | "anchor" | "sailboat" | "wheel" | "telescope" | "map" | "handshake" | "buoy";

const POSITIONS: Record<IconName, [number, number]> = {
  lighthouse: [0, 0],
  anchor:     [1, 0],
  sailboat:   [2, 0],
  wheel:      [3, 0],
  telescope:  [0, 1],
  map:        [1, 1],
  handshake:  [2, 1],
  buoy:       [3, 1],
};

interface Props {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MaritimeIcon = ({ name, size = 64, className = "", style }: Props) => {
  const [col, row] = POSITIONS[name];
  return (
    <div
      className={className}
      style={{ width: size, height: size, overflow: "hidden", position: "relative", flexShrink: 0, ...style }}
    >
      <img
        src="/icons-maritime.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "400%",
          height: "200%",
          left: `${-col * 100}%`,
          top: `${-row * 100}%`,
        }}
      />
    </div>
  );
};

export default MaritimeIcon;
