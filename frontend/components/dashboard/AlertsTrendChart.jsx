'use client';
import { useEffect, useRef } from 'react';
import styles from './AlertsTrendChart.module.css';

// Lightweight SVG chart — no external dependency
export default function AlertsTrendChart({ data = [] }) {
  if (!data.length) return <div className={styles.empty}>No trend data available</div>;

  const W = 600, H = 160, PAD = { top: 12, right: 16, bottom: 28, left: 36 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...data.map(d => d.count), 1);
  const xStep = chartW / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + chartH - (d.count / maxVal) * chartH,
    label: d.date,
    count: d.count,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length-1].x} ${PAD.top + chartH} L ${points[0].x} ${PAD.top + chartH} Z`;

  return (
    <div className={styles.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left} x2={W - PAD.right}
              y1={PAD.top + chartH * (1 - t)} y2={PAD.top + chartH * (1 - t)}
              stroke="#1E2D4A" strokeWidth="1"
            />
            <text x={PAD.left - 6} y={PAD.top + chartH * (1 - t) + 4} textAnchor="end"
              fill="#4A5880" fontSize="9" fontFamily="var(--font-mono)">
              {Math.round(maxVal * t)}
            </text>
          </g>
        ))}

        {/* Area */}
        <path d={areaD} fill="url(#areaGrad)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#F59E0B" />
        ))}

        {/* X labels — show every n-th */}
        {points.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((p, i) => (
          <text key={i} x={p.x} y={H - 6} textAnchor="middle"
            fill="#4A5880" fontSize="9" fontFamily="var(--font-mono)">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}