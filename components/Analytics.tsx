
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FormDefinition } from '../types';

interface AnalyticsProps {
  definition: FormDefinition;
}

const Analytics: React.FC<AnalyticsProps> = ({ definition }) => {
  const typeDistribution = definition.items.reduce((acc: any, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(typeDistribution).map(([name, value]) => ({ name, value }));
  const COLORS = ['#005ea5', '#00703c', '#ffeb3b', '#d5281b', '#330072', '#ec4899'];

  const complexityData = [
    { name: 'Required', value: definition.items.filter(i => i.required).length },
    { name: 'LOINC', value: definition.items.filter(i => i.loincCode).length },
    { name: 'Total Items', value: definition.items.length },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Form Elements', value: definition.items.length, color: 'text-[#212b32]' },
          { label: 'LOINC Mapping', value: `${Math.round((definition.items.filter(i => i.loincCode).length / (definition.items.length || 1)) * 100)}%`, color: 'text-[#005ea5]' },
          { label: 'Completion Risk', value: 'Low', color: 'text-[#00703c]' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-lg border-2 border-[#d8dde0] shadow-sm">
            <h4 className="text-[#4c6272] text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</h4>
            <p className={`text-5xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg border-2 border-[#d8dde0] shadow-sm">
          <h3 className="text-xl font-bold text-[#212b32] mb-8">Element Type Spread</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg border-2 border-[#d8dde0] shadow-sm">
          <h3 className="text-xl font-bold text-[#212b32] mb-8">Schema Metadata</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complexityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#d8dde0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 13, fontWeight: 'bold', fill: '#212b32' }} />
                <Tooltip cursor={{ fill: '#f0f4f5' }} />
                <Bar dataKey="value" fill="#005ea5" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
