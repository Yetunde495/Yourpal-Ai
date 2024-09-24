export function MatchChart({ progress, size = 100, strokeWidth = 10 }: any) {
  const center = size / 2;
  const radius = (size - strokeWidth - 5) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Determine the color based on the progress percentage
  let progressColor;
  if (progress === 0) {
    progressColor = "#007AFF26"; // Blue with opacity
  } else if (progress >= 55) {
    progressColor = "#3d9b13"; // Green from 55% and above
  } else if (progress >= 31) {
    progressColor = "#D4CF46"; // Yellow between 31% and 55%
  } else if (progress > 0 && progress <= 30) {
    progressColor = "red"; // Red between 1% and 30%
  }

  return (
    <svg width={size} height={size} className="block mx-auto mt-5">
      {/* Background Circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#007AFF26"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Foreground Circle (Progress) */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        // strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
      />
      {/* Text in the middle */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fill="black"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
}
