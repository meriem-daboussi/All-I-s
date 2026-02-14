
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = Array.from({ length: 20 }, (_, i) => ({
  freq: i * 500,
  val: Math.floor(Math.random() * 40) + (i > 10 && i < 14 ? 60 : 20),
}));

const Spectrogram: React.FC = () => {
  return (
    <div className="h-32 w-full bg-black/40 rounded-lg p-2 border border-gray-800/50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorLeak" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="5%" stopColor="#FFB300" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FFB300" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="freq" hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }}
            itemStyle={{ color: '#2E7D32' }}
          />
          <Area 
            type="monotone" 
            dataKey="val" 
            stroke="#2E7D32" 
            fillOpacity={1} 
            fill="url(#colorFreq)" 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-1 px-2">
        <span className="text-[8px] text-gray-600 font-mono">0 Hz</span>
        <span className="text-[8px] text-amber-500/80 font-mono animate-pulse">DETECTED: HISS PROFILE</span>
        <span className="text-[8px] text-gray-600 font-mono">10 kHz</span>
      </div>
    </div>
  );
};

export default Spectrogram;
