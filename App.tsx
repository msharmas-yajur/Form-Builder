
import React, { useState } from 'react';
import { ViewMode, FormDefinition, ControlType } from './types';
import FormRenderer from './components/FormRenderer';
import Editor from './components/Editor';
import AIDesigner from './components/AIDesigner';
import Analytics from './components/Analytics';
import { 
  ClipboardCheck, 
  Code2, 
  BrainCircuit, 
  BarChart3, 
  ChevronRight,
  ChevronDown,
  Upload,
  User as UserIcon,
  Search,
  Activity
} from 'lucide-react';

const FEATURED_QUESTIONNAIRES: Partial<FormDefinition>[] = [
  { id: '1', title: "US Surgeon General family health portrait [54127-6]" },
  { id: '2', title: "Weight & Height tracking panel [55418-8]" },
  { id: '3', title: "Comprehensive metabolic 1998 panel [24322-0]" },
  { id: '4', title: "PHQ-9 quick depression assessment panel [44249-1]" },
  { id: '5', title: "Hard Coronary Heart Disease (10-year risk)" },
  { id: '6', title: "Health Screening" },
  { id: '7', title: "Study drug toxicity panel" },
  { id: '8', title: "AHC HRSN Screening" }
];

const INITIAL_DEFINITION: FormDefinition = {
  title: "AHC HRSN Screening",
  version: "1.0.0",
  publisher: "Health Architect Suite",
  items: [
    {
      id: "core",
      label: "Part I: Core Health Questions",
      type: ControlType.SECTION,
      items: [
        {
          id: "living",
          label: "Living Situation",
          type: ControlType.GROUP,
          items: [
            { id: "q1", label: "What is your living situation today?", type: ControlType.SELECT, options: ["I have a steady place to live", "I don't have a steady place"], index: "1." },
            { id: "q2", label: "Think about the place you live. Do you have problems with any of the following?", type: ControlType.SELECT, options: ["Pests", "Mold", "Lead paint"], index: "2." }
          ]
        },
        {
          id: "food",
          label: "Food Security",
          type: ControlType.GROUP,
          items: [
            { id: "q3", label: "Within the past 12 months, you worried that your food would run out before you got money to buy more.", type: ControlType.RADIO, options: ["Often true", "Sometimes true", "Never true"], index: "3." }
          ]
        }
      ]
    }
  ]
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [definition, setDefinition] = useState<FormDefinition>(INITIAL_DEFINITION);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f4f5]">
      {/* Nshuk-style Header */}
      <header className="bg-[#005ea5] text-white z-40 shadow-sm border-b-4 border-[#ffeb3b]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
                <Activity className="w-8 h-8" />
                <span className="text-2xl font-bold tracking-tight">NHS <span className="font-normal opacity-80">Forms</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-4 border-l border-white/20 pl-6 text-sm font-medium">
                <span className="opacity-70">Patient: <span className="text-white font-bold uppercase">MOMO ABBAS</span></span>
                <span className="opacity-70">DoB: <span className="text-white font-bold">2059</span></span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-1.5 text-xs bg-black/10 px-3 py-1.5 rounded-full">
                <UserIcon className="w-3 h-3" />
                <span className="font-bold">Susan Clark (Provider)</span>
             </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar - Clean Nshuk Design */}
        <aside className="w-72 bg-white border-r border-[#d8dde0] flex flex-col z-20 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-6">
            <button className="w-full bg-[#00703c] hover:bg-[#005a30] text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 font-bold shadow-sm transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import Questionnaire</span>
            </button>

            <div className="space-y-1">
              <p className="px-2 text-[11px] font-bold text-[#4c6272] uppercase tracking-wider mb-2">Workspace</p>
              {[
                { mode: 'preview', label: 'View Form', icon: <ClipboardCheck className="w-4 h-4" /> },
                { mode: 'ai-designer', label: 'AI Designer', icon: <BrainCircuit className="w-4 h-4" /> },
                { mode: 'editor', label: 'Edit Schema', icon: <Code2 className="w-4 h-4" /> },
                { mode: 'analytics', label: 'Insights', icon: <BarChart3 className="w-4 h-4" /> }
              ].map((item) => (
                <button
                  key={item.mode}
                  onClick={() => setViewMode(item.mode as ViewMode)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-all group ${
                    viewMode === item.mode 
                      ? 'bg-[#005ea5] text-white' 
                      : 'text-[#212b32] hover:bg-[#f0f4f5]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`${viewMode === item.mode ? 'text-white' : 'text-[#4c6272]'}`}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {viewMode === item.mode && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#f0f4f5]">
              <p className="px-2 text-[11px] font-bold text-[#4c6272] uppercase tracking-wider mb-3">Library</p>
              <div className="space-y-0.5">
                {FEATURED_QUESTIONNAIRES.map((q) => (
                  <button 
                    key={q.id}
                    onClick={() => q.id === '8' && setDefinition(INITIAL_DEFINITION)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${definition.title === q.title ? 'bg-[#ffeb3b] text-[#212b32] font-bold' : 'text-[#4c6272] hover:bg-[#f0f4f5]'}`}
                  >
                    {q.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace - Nshuk Style Content Block */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f0f4f5]">
          <div className="bg-white border-b border-[#d8dde0] p-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-[#212b32]">
              {viewMode === 'preview' && definition.title}
              {viewMode === 'ai-designer' && 'Create New Medical Form'}
              {viewMode === 'editor' && 'JSON Architect'}
              {viewMode === 'analytics' && 'Form Complexity Insights'}
            </h2>
            <div className="flex items-center space-x-3">
               <button className="px-4 py-2 border-2 border-[#005ea5] text-[#005ea5] rounded-md text-sm font-bold hover:bg-[#005ea5] hover:text-white transition-all">
                 Save Draft
               </button>
               <button className="px-5 py-2 bg-[#005ea5] text-white rounded-md text-sm font-bold shadow-md hover:bg-[#004a82] transition-all">
                 Export FHIR
               </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
            <div className="max-w-[1000px] mx-auto">
              {viewMode === 'preview' && <FormRenderer definition={definition} />}
              {viewMode === 'editor' && <Editor definition={definition} onChange={setDefinition} />}
              {viewMode === 'ai-designer' && <AIDesigner onFormGenerated={(def) => { setDefinition(def); setViewMode('preview'); }} />}
              {viewMode === 'analytics' && <Analytics definition={definition} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
