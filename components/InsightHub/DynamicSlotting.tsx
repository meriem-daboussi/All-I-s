
import React, { useState } from 'react';
import { Box, Sparkles, Camera, Loader2, CheckCircle2, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const DynamicSlotting: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [itemData, setItemData] = useState<{ sku: string; weight: string; type: string } | null>(null);
  const [allocation, setAllocation] = useState<string | null>(null);

  const simulateComputerVision = () => {
    setScanning(true);
    setAllocation(null);
    // Simulate camera/CV processing
    setTimeout(() => {
      setItemData({
        sku: `SKU-${Math.floor(Math.random() * 9000) + 1000}`,
        weight: `${(Math.random() * 50 + 5).toFixed(1)}kg`,
        type: ['Industrial Fluid', 'Heavy Machinery Part', 'Electronic Component', 'Perishable Catalyst'][Math.floor(Math.random() * 4)]
      });
      setScanning(false);
    }, 1500);
  };

  const requestOptimalSlot = async () => {
    if (!itemData) return;
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `New product detected via CV: SKU: ${itemData.sku}, Type: ${itemData.type}, Weight: ${itemData.weight}. Based on predictive dynamic slotting logic (heavy items low, fast-movers near docks), suggest the best warehouse coordinate (AISLE/RACK/LEVEL) and a brief justification.`,
        config: {
          systemInstruction: 'You are an advanced industrial warehouse optimizer. Use predictive analytics to suggest high-efficiency slotting coordinates. Be professional and data-driven.',
          temperature: 0.2,
        },
      });
      setAllocation(response.text || 'Manual override required');
    } catch (error) {
      console.error('Slotting Error:', error);
      setAllocation('ERROR: Slotting Service Offline');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="px-6 mb-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Space Allocation & Slotting</h3>
      <div className="bg-gray-900/60 border border-emerald-900/30 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full" />

        {!itemData && !scanning ? (
          <button 
            onClick={simulateComputerVision}
            className="w-full py-4 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <Camera size={24} className="text-gray-500 group-hover:text-emerald-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-emerald-400">
              Register New Item (Computer Vision)
            </span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${scanning ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
                  {scanning ? <Loader2 size={18} className="animate-spin text-amber-500" /> : <Box size={18} className="text-emerald-500" />}
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    {scanning ? 'Processing Vision Stream...' : 'CV Registration Complete'}
                  </h4>
                  <p className="font-mono text-xs text-white">{itemData?.sku || 'Scanning...'}</p>
                </div>
              </div>
              {!scanning && (
                <CheckCircle2 size={16} className="text-emerald-500" />
              )}
            </div>

            {itemData && !scanning && (
              <div className="grid grid-cols-2 gap-2 py-2">
                <div className="bg-black/30 p-2 rounded border border-gray-800">
                  <span className="text-[8px] text-gray-500 block uppercase">Weight Class</span>
                  <span className="text-xs font-mono text-gray-200">{itemData.weight}</span>
                </div>
                <div className="bg-black/30 p-2 rounded border border-gray-800">
                  <span className="text-[8px] text-gray-500 block uppercase">Class Profile</span>
                  <span className="text-xs font-mono text-gray-200">{itemData.type}</span>
                </div>
              </div>
            )}

            {!allocation && !scanning && (
              <button 
                onClick={requestOptimalSlot}
                disabled={analyzing}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                {analyzing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    AI Predictive Slotting...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Run Optimal Allocation
                  </>
                )}
              </button>
            )}

            {allocation && (
              <div className="mt-4 animate-in slide-in-from-bottom-2 fade-in duration-500">
                <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-emerald-400" />
                    <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest">
                      Optimized Slot Location
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white leading-relaxed whitespace-pre-line">
                    {allocation}
                  </p>
                </div>
                <button 
                  onClick={() => { setItemData(null); setAllocation(null); }}
                  className="mt-3 w-full py-1 text-[9px] text-gray-500 hover:text-gray-300 uppercase underline tracking-widest"
                >
                  Clear & Process Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicSlotting;
