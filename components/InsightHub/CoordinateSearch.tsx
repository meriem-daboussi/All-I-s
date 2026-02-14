
import React, { useState } from 'react';
import { Search, MapPin, Loader2, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const CoordinateSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Locate this item in our industrial warehouse grid: "${query}". Return a specific coordinate in the format: AISLE [X] - RACK [Y] - LVL [Z].`,
        config: {
          systemInstruction: 'You are a warehouse management AI. Map items to a logical 3D coordinate system (Aisles 1-20, Racks A-Z, Levels 1-5). Be concise.',
          temperature: 0.1,
        },
      });

      setResult(response.text || 'COORDINATE NOT FOUND');
    } catch (error) {
      console.error('Gemini Error:', error);
      setResult('ERROR: ACCESS DENIED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 mb-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Product Locator</h3>
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 shadow-xl">
        <form onSubmit={handleSearch} className="relative mb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SKU or Product Name..."
            className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-3 pr-10 text-xs focus:border-emerald-500 focus:outline-none transition-colors font-mono"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-1.5 text-gray-400 hover:text-emerald-500 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>

        {result && !loading && (
          <div className="bg-emerald-950/20 border border-emerald-900/50 p-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="p-2 bg-emerald-500/20 rounded-md">
                <MapPin size={16} className="text-emerald-500" />
            </div>
            <div>
                <span className="text-[9px] text-emerald-600 uppercase font-bold block mb-0.5 tracking-tighter">Digital Coordinate</span>
                <span className="font-mono text-sm text-emerald-400 font-bold tracking-widest">
                  {result}
                </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinateSearch;
