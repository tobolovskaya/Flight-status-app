import React from 'react';
import './PlaneSpinner.css';

export default function PlaneSpinner() {
  return (
    <div className="plane-wrapper">
      <svg viewBox="0 0 400 100" className="flight-path">
        {/* Пунктирна лінія-траєкторія */}
        <path
          id="path"
          d="M 0 60 Q 100 0, 200 60 T 400 60"
          fill="transparent"
          stroke="#ccc"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* Літак ✈ — по кривій */}
        <text>
          <textPath href="#path" startOffset="0%" className="plane">
            ✈
          </textPath>
        </text>

        {/* Другий літак (опціонально) */}
        <text>
          <textPath href="#path" startOffset="50%" className="plane delay">
            ✈
          </textPath>
        </text>
      </svg>
    </div>
  );
}
