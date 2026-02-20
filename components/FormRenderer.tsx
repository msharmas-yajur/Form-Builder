
import React from 'react';
import { FormDefinition, ControlType, FormItem } from '../types';
import { HelpCircle, Info } from 'lucide-react';

interface FormRendererProps {
  definition: FormDefinition;
}

const FormRenderer: React.FC<FormRendererProps> = ({ definition }) => {
  const renderItem = (item: FormItem, depth: number = 0) => {
    const isSection = item.type === ControlType.SECTION;
    const isGroup = item.type === ControlType.GROUP;

    if (isSection) {
      return (
        <section key={item.id} className="mb-12">
          <h3 className="text-3xl font-bold text-[#212b32] mb-6 pb-2 border-b-4 border-[#005ea5] inline-block">
            {item.label}
          </h3>
          <div className="space-y-8">
            {item.items?.map(child => renderItem(child, depth + 1))}
          </div>
        </section>
      );
    }

    if (isGroup) {
      return (
        <div key={item.id} className="bg-white p-6 md:p-8 rounded-lg border-l-8 border-[#005ea5] shadow-sm mb-10">
          <div className="flex items-center space-x-2 mb-6">
             <h4 className="text-xl font-bold text-[#212b32]">{item.label}</h4>
             <HelpCircle className="w-4 h-4 text-[#768692] cursor-help" />
          </div>
          <div className="space-y-10">
            {item.items?.map(child => renderItem(child, depth + 1))}
          </div>
        </div>
      );
    }

    // NHS Style Question Rendering
    return (
      <div key={item.id} className="nhsuk-form-group mb-8">
        <fieldset className="border-none p-0 m-0">
          <legend className="block text-lg font-bold text-[#212b32] mb-4 leading-tight max-w-[800px]">
            {item.index && <span className="mr-2 text-[#768692] font-normal">{item.index}</span>}
            {item.label}
            {item.required && <span className="text-[#d5281b] ml-1">*</span>}
          </legend>

          {item.description && (
            <div className="flex items-start space-x-2 text-sm text-[#4c6272] mb-4 bg-[#f0f4f5] p-3 rounded-md border-l-4 border-[#768692]">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{item.description}</span>
            </div>
          )}

          <div className="mt-2">
            {item.type === ControlType.SELECT && (
              <select className="w-full md:w-1/2 p-3 border-2 border-[#212b32] rounded-md focus:border-[#005ea5] focus:ring-4 focus:ring-[#ffeb3b]/50 outline-none text-lg bg-white transition-all">
                <option value="">Please select</option>
                {item.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}

            {item.type === ControlType.RADIO && (
              <div className="space-y-3">
                {item.options?.map(opt => (
                  <label key={opt} className="flex items-center bg-white border-2 border-[#d8dde0] hover:border-[#212b32] p-4 rounded-md cursor-pointer transition-all group active:scale-[0.99]">
                    <input 
                      type="radio" 
                      name={item.id} 
                      className="w-8 h-8 mr-4 border-2 border-[#212b32] text-[#005ea5] focus:ring-offset-0 focus:ring-[#ffeb3b] transition-all" 
                    />
                    <span className="text-lg font-semibold text-[#212b32]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {(item.type === ControlType.TEXT || item.type === ControlType.NUMBER || item.type === ControlType.DATE) && (
              <input 
                type={item.type.toLowerCase()} 
                className="w-full md:w-3/4 p-3 border-2 border-[#212b32] rounded-md focus:border-[#005ea5] focus:ring-4 focus:ring-[#ffeb3b]/50 outline-none text-lg transition-all"
                placeholder={item.placeholder || ""}
              />
            )}
            
            {item.type === ControlType.CHECKBOX && (
              <label className="flex items-center bg-white border-2 border-[#d8dde0] hover:border-[#212b32] p-4 rounded-md cursor-pointer transition-all group">
                <input 
                  type="checkbox" 
                  className="w-8 h-8 mr-4 border-2 border-[#212b32] text-[#005ea5] rounded-sm focus:ring-[#ffeb3b]" 
                />
                <span className="text-lg font-semibold text-[#212b32]">{item.label}</span>
              </label>
            )}
          </div>
          
          {item.loincCode && (
            <div className="mt-3 text-[10px] font-mono font-bold text-[#768692] uppercase tracking-widest flex items-center">
              <span className="bg-[#d8dde0] px-1.5 py-0.5 rounded mr-2">LOINC</span>
              {item.loincCode}
            </div>
          )}
        </fieldset>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-24">
       <div className="bg-[#005ea5] text-white p-6 rounded-t-lg">
          <h1 className="text-4xl font-extrabold mb-2">{definition.title}</h1>
          <div className="flex items-center space-x-4 text-sm font-medium opacity-90">
             <span>Version {definition.version}</span>
             <span>•</span>
             <span>Published by {definition.publisher}</span>
          </div>
       </div>
       
       <div className="bg-white p-6 md:p-10 border-2 border-t-0 border-[#d8dde0] rounded-b-lg shadow-sm">
          {definition.items.length > 0 ? (
            definition.items.map(item => renderItem(item, 0))
          ) : (
            <div className="text-center py-20 text-[#768692]">
               <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p className="text-lg font-medium">No fields generated yet.</p>
               <p className="text-sm">Use the AI Designer or JSON Architect to build your form.</p>
            </div>
          )}
          
          <div className="mt-12 pt-8 border-t border-[#f0f4f5] flex items-center justify-between">
            <button className="text-[#005ea5] font-bold hover:underline">
              Previous page
            </button>
            <button className="bg-[#005ea5] hover:bg-[#004a82] text-white px-8 py-3 rounded-md font-bold text-lg shadow-lg shadow-blue-200 transition-all">
              Save and continue
            </button>
          </div>
       </div>
    </div>
  );
};

export default FormRenderer;
