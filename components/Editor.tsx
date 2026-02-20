
import React, { useState } from 'react';
import { FormDefinition } from '../types';

interface EditorProps {
  definition: FormDefinition;
  onChange: (newDef: FormDefinition) => void;
}

const Editor: React.FC<EditorProps> = ({ definition, onChange }) => {
  const [localText, setLocalText] = useState(JSON.stringify(definition, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (val: string) => {
    setLocalText(val);
    try {
      const parsed = JSON.parse(val);
      onChange(parsed);
      setError(null);
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">JSON Architect</span>
        {error && <span className="text-red-400 text-[10px]">{error}</span>}
      </div>
      <textarea
        className="flex-1 w-full bg-slate-800 border-none focus:ring-0 resize-none p-4 custom-scrollbar rounded-lg"
        value={localText}
        onChange={(e) => handleUpdate(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
