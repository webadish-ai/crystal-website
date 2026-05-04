import * as React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

// India GeoJSON URL
import indiaGeoData from '../../assets/india.json';

const INDIA_JSON = indiaGeoData;

interface Location {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number];
  isHO?: boolean;
}

interface IndiaGeoMapProps {
  className?: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect?: (id: string) => void;
  locations: Location[];
}

const IndiaGeoMap: React.FC<IndiaGeoMapProps> = ({ className, activeId, onHover, onSelect, locations }) => {
  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 900,
          center: [82.9, 22.5]
        }}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <Geographies geography={INDIA_JSON}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#1a3f8f",
                    stroke: "rgba(255,255,255,0.3)",
                    strokeWidth: 0.8,
                    outline: "none",
                  },
                  hover: {
                    fill: "#2558c0",
                    stroke: "rgba(255,255,255,0.65)",
                    strokeWidth: 1.2,
                    outline: "none",
                    cursor: "pointer"
                  },
                  pressed: {
                    fill: "#2558c0",
                    stroke: "rgba(255,255,255,0.65)",
                    strokeWidth: 1.2,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {locations.map((loc) => (
          <Marker key={loc.id} coordinates={loc.coordinates}>
            <g
              style={{ cursor: "pointer", pointerEvents: "auto" }}
              onMouseEnter={() => onHover(loc.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect?.(loc.id)}
            >
              {/* Pulse ring behind pin */}
              <circle
                cx="0" cy="-6"
                r={loc.isHO ? 26 : 20}
                fill="#FAC212"
                className={`animate-ping ${activeId === loc.id ? 'opacity-40' : 'opacity-0'} transition-opacity duration-300`}
              />

              {/* Pin body — teardrop pointing down */}
              <path
                d={loc.isHO
                  ? "M 0,-26 C -15,-26 -20,-14 -20,-6 C -20,5 -11,14 0,28 C 11,14 20,5 20,-6 C 20,-14 15,-26 0,-26 Z"
                  : "M 0,-20 C -11,-20 -15,-10 -15,-4 C -15,4 -8,11 0,22 C 8,11 15,4 15,-4 C 15,-10 11,-20 0,-20 Z"
                }
                fill={activeId === loc.id ? "#e6a800" : "#FAC212"}
                stroke="white"
                strokeWidth={loc.isHO ? 2.5 : 2}
                style={{ transition: "fill 0.25s" }}
              />

              {/* Inner icon — HQ text or navy dot */}
              {loc.isHO ? (
                <text
                  x="0" y="-3"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#0F2854"
                  style={{ fontSize: "8px", fontWeight: "900", fontFamily: "sans-serif" }}
                >
                  HQ
                </text>
              ) : (
                <circle cx="0" cy="-4" r="4.5" fill="#0F2854" fillOpacity="0.8" />
              )}

              {/* Label tooltip */}
              <g
                className={`transition-opacity duration-300 ${activeId === loc.id ? 'opacity-100' : 'opacity-0'}`}
                style={{ pointerEvents: 'none' }}
              >
                <rect
                  x={loc.isHO ? 24 : 18}
                  y={-26}
                  width={180}
                  height={52}
                  rx={8}
                  fill="#0F2854"
                />
                <text
                  x={loc.isHO ? 36 : 30}
                  y={8}
                  fill="white"
                  style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    letterSpacing: "0.04em"
                  }}
                >
                  {loc.name}
                </text>
              </g>
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default IndiaGeoMap;
