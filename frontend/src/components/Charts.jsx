import React from 'react';

// Progress Line Chart using Pure SVG for crisp vector rendering in both Light & Dark modes
export const ProgressLineChart = ({ data = [], height = 180 }) => {
  if (!data || data.length === 0) return null;

  const padding = { top: 20, right: 25, bottom: 30, left: 35 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const minVal = 50;
  const maxVal = 100;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((d.score - minVal) / (maxVal - minVal)) * innerHeight;
    return { x, y, score: d.score, label: d.month };
  });

  const pathD = points.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[60, 80, 100].map((val) => {
          const y = padding.top + innerHeight - ((val - minVal) / (maxVal - minVal)) * innerHeight;
          return (
            <g key={val}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="currentColor"
                strokeDasharray="4 4"
                className="text-slate-200 dark:text-slate-800"
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={areaD} fill="url(#chartGradient)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points & X Labels */}
        {points.map((pt, i) => (
          <g key={i} className="group cursor-pointer">
            <circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              className="fill-white dark:fill-slate-900 stroke-brand-600 dark:stroke-brand-400 transition-transform group-hover:scale-125"
              strokeWidth="2.5"
            />
            {/* Tooltip on hover */}
            <text
              x={pt.x}
              y={pt.y - 10}
              textAnchor="middle"
              className="text-[11px] font-bold fill-brand-600 dark:fill-brand-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {pt.score}%
            </text>
            {/* X-axis label */}
            <text
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className="text-[11px] fill-slate-400 font-medium"
            >
              {pt.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Subject Performance Bar Chart
export const SubjectPerformanceBars = ({ data = [] }) => {
  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{item.subject}</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">{item.strength}</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">{item.score}%</span>
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                item.score >= 85
                  ? 'bg-emerald-500'
                  : item.score >= 75
                  ? 'bg-brand-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${item.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Score Distribution Bar Chart for Admin
export const ScoreDistributionChart = ({ data = [] }) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="grid grid-cols-4 gap-3 items-end h-44 pt-6 pb-2">
      {data.map((item, idx) => {
        const heightPercent = Math.round((item.count / maxCount) * 100);
        return (
          <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform">
              {item.count}
            </span>
            <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex flex-col justify-end h-32">
              <div
                className="w-full rounded-xl transition-all duration-700 group-hover:brightness-110"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: item.color || '#6366f1'
                }}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              {item.range}
            </span>
          </div>
        );
      })}
    </div>
  );
};
