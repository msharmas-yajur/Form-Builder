
import React, { useState, useMemo } from 'react';
import { generateFormFromPrompt } from '../services/geminiService';
import { FormDefinition } from '../types';
import { Sparkles, Loader2, Wand2, Search, Thermometer, Brain, Heart, Activity, Baby, Info, ArrowRight } from 'lucide-react';

interface AIDesignerProps {
  onFormGenerated: (def: FormDefinition) => void;
}

interface Template {
  name: string;
  category: 'Clinical' | 'Screening' | 'Assessment' | 'Specialized';
  icon: React.ReactNode;
  prompt: string;
}

const AIDesigner: React.FC<AIDesignerProps> = ({ onFormGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;
    
    setLoading(true);
    try {
      const def = await generateFormFromPrompt(finalPrompt);
      onFormGenerated(def);
    } catch (err) {
      console.error(err);
      alert("Error generating form. The AI might be busy or the prompt was too complex.");
    } finally {
      setLoading(false);
    }
  };

  const templates: Template[] = [
    { 
      name: "Vital Signs Log", 
      category: "Clinical", 
      icon: <Activity className="w-5 h-5" />,
      prompt: "Full clinical vital signs form: Height, Weight, BP, Heart Rate, Respiration, Temp. Include LOINC codes."
    },
    { 
      name: "PHQ-9 Screening", 
      category: "Screening", 
      icon: <Brain className="w-5 h-5" />,
      prompt: "Patient Health Questionnaire-9 (PHQ-9) for depression assessment. Use 0-3 scale."
    },
    { 
      name: "SDOH Assessment", 
      category: "Assessment", 
      icon: <Info className="w-5 h-5" />,
      prompt: "Social Determinants of Health: Housing, Food, Transport, and Safety screening."
    },
    { 
      name: "Diabetes Review", 
      category: "Clinical", 
      icon: <Thermometer className="w-5 h-5" />,
      prompt: "Diabetes follow-up form: A1C, Fasting Glucose, Foot Exam, and Medication adherence."
    },
    { 
      name: "Pediatric Wellness", 
      category: "Specialized", 
      icon: <Baby className="w-5 h-5" />,
      prompt: "Well-child visit for ages 2-5: Development, Diet, Activity, and Immunization status."
    }
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-white rounded-lg border-2 border-[#d8dde0] overflow-hidden shadow-sm">
        <div className="p-8 md:p-12 border-b border-[#f0f4f5]">
          <h3 className="text-3xl font-extrabold text-[#212b32] mb-2">Build with AI</h3>
          <p className="text-[#4c6272] text-lg mb-8 max-w-2xl">
            Describe the medical form you need. Our AI engine will structure it using standard clinical terminology and Nshuk design principles.
          </p>

          <div className="space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Emergency Room Intake for suspected stroke patients, include time of onset and NIHSS checklist'"
              className="w-full h-40 p-6 bg-[#f0f4f5] border-2 border-[#212b32] rounded-md focus:border-[#005ea5] focus:ring-4 focus:ring-[#ffeb3b]/50 outline-none transition-all resize-none text-xl font-medium"
            />

            <button
              onClick={() => handleGenerate()}
              disabled={loading || !prompt}
              className="w-full py-5 bg-[#005ea5] hover:bg-[#004a82] disabled:bg-[#a1acb4] text-white rounded-md font-bold text-xl shadow-lg transition-all flex items-center justify-center space-x-3"
            >
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <><Wand2 className="w-6 h-6" /> <span>Generate Clinical Schema</span></>}
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-[#f0f4f5]/30">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-[#212b32]">Verified Templates</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#768692]" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border-2 border-[#d8dde0] rounded-md text-sm focus:border-[#005ea5] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((t) => (
              <button
                key={t.name}
                onClick={() => { setPrompt(t.prompt); handleGenerate(t.prompt); }}
                className="text-left bg-white p-6 border-2 border-[#d8dde0] hover:border-[#005ea5] rounded-md transition-all group flex flex-col h-full shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-[#f0f4f5] text-[#005ea5] rounded group-hover:bg-[#005ea5] group-hover:text-white transition-colors">
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#4c6272] uppercase tracking-widest">{t.category}</span>
                </div>
                <h5 className="text-lg font-bold text-[#212b32] mb-2 group-hover:text-[#005ea5]">{t.name}</h5>
                <p className="text-sm text-[#4c6272] leading-snug mb-6 flex-grow">{t.prompt}</p>
                <div className="flex items-center text-[#005ea5] font-bold text-sm">
                  <span>Load and Build</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesigner;
