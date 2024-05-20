import React from 'react';

interface Segment {
  start: number;
  end: number;
  color: string;
  startTime: string;
  endTime: string;
  analysisType: string;
}

interface CustomProgressBarProps {
  segments: Segment[];
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ segments }) => {
  return (
    <div className="progress" style={{ height: '20px' }}>
      {segments.map((segment, index) => (
        <div
          key={index}
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${segment.end - segment.start}%`,
            backgroundColor: segment.color,
          }}
          aria-valuenow={segment.end - segment.start}
          aria-valuemin={0}
          aria-valuemax={100}
          title={`Start Time: ${segment.startTime}, End Time: ${segment.endTime}, Analysis Type: ${segment.analysisType}`}
        ></div>
      ))}
    </div>
  );
};

const Progress: React.FC = () => {
  const segments: Segment[] = [
    { start: 0, end: 10, color: 'gray', startTime: '09:00', endTime: '09:10', analysisType: 'Type A' },
    { start: 10, end: 20, color: 'blue', startTime: '09:10', endTime: '09:20', analysisType: 'Type B' },
    { start: 20, end: 50, color: 'gray', startTime: '09:20', endTime: '09:50', analysisType: 'Type C' },
    { start: 50, end: 70, color: 'green', startTime: '09:50', endTime: '10:10', analysisType: 'Type D' },
    { start: 70, end: 100, color: 'gray', startTime: '10:10', endTime: '10:30', analysisType: 'Type E' },
  ];

  return (
    <CustomProgressBar segments={segments} />
  );
};

export default Progress;

