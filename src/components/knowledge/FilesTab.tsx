"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Plus, FileText, Table, Trash2, Zap } from "lucide-react";

const files = [
  {
    id: 1,
    name: "Product_Strategy_2024.pdf",
    type: "PDF",
    status: "Clean",
    learning: "Learned",
    icon: FileText,
    color: "text-brand-accent"
  },
  {
    id: 2,
    name: "Customer_Segments_Q3.csv",
    type: "CSV",
    status: "Scanning",
    learning: "Not learned",
    icon: Table,
    color: "text-brand-accent"
  }
];

export default function FilesTab() {
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2 hover:bg-brand-accent-hover transition-all">
          <Plus className="w-4 h-4" />
          Upload File
        </button>
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-brand-primary">
          {files.map((file) => (
            <motion.div 
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-brand-card border border-brand-border rounded-2xl shadow-sm hover:border-brand-accent/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center ${file.color}`}>
                    <file.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-primary text-sm truncate max-w-[140px]" title={file.name}>
                      {file.name}
                    </h3>
                    <span className="px-1.5 py-0.5 bg-brand-bg text-[10px] font-bold text-brand-secondary rounded border border-brand-border uppercase tracking-widest">
                      {file.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                    file.status === 'Clean' 
                      ? 'bg-status-active-bg text-status-active-text border-brand-border' 
                      : 'bg-status-paused-bg text-status-paused-text border-brand-border'
                  }`}>
                    {file.status}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-bg rounded-xl border border-brand-border mb-6">
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${file.learning === 'Learned' ? 'text-brand-accent' : 'text-brand-secondary/30'}`} />
                  <span className="text-xs font-bold text-brand-primary">{file.learning}</span>
                </div>
                <button className="p-1.5 text-brand-secondary hover:text-brand-destructive transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <button className={`w-full py-2.5 font-bold rounded-xl text-xs transition-all ${
                file.learning === 'Learned' 
                  ? 'bg-brand-bg text-brand-secondary cursor-default' 
                  : 'bg-brand-accent text-brand-accent-text hover:bg-brand-accent-hover shadow-md shadow-brand-accent/10'
              }`}>
                {file.learning === 'Learned' ? 'File Learned' : 'Learn from file'}
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-brand-card border border-brand-border rounded-[32px] border-dashed text-brand-primary">
          <FileText className="w-12 h-12 text-brand-secondary/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No files uploaded yet</h3>
          <p className="text-brand-secondary text-sm mb-8">Upload documents to start teaching Helm about your company.</p>
          <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
            Upload First File
          </button>
        </div>
      )}
    </div>
  );
}
