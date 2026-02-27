// app/components/Footer.tsx v1.0.2
import React from 'react';
import { Github, Bug, Lightbulb, FileText } from 'lucide-react';
import { UILabels } from '../types';

interface FooterProps {
  labels: UILabels;
  version: string;
}

const Footer: React.FC<FooterProps> = ({ labels, version }) => {
  return (
    <footer id="app-footer" className="mt-auto border-t border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors">
      <div id="footer-content" className="max-w-5xl mx-auto px-4 py-8 md:py-10 flex flex-col gap-6 text-sm text-slate-500 dark:text-slate-400">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="font-medium text-slate-600 dark:text-slate-300">{labels.footerCredit}</p>
            <p className="text-xs opacity-60">GPL-3.0 License &copy; {new Date().getFullYear()} HanziMaster</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-xs font-medium">
            <a href="https://github.com/sutchan/HanziMaster" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              <span>Source Code</span>
            </a>
            <a href="https://github.com/sutchan/HanziMaster/issues/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
              <Bug size={14} className="group-hover:scale-110 transition-transform" />
              <span>Report Bug</span>
            </a>
            <a href="https://github.com/sutchan/HanziMaster/issues/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
              <Lightbulb size={14} className="group-hover:scale-110 transition-transform" />
              <span>Request Feature</span>
            </a>
            <a href="https://github.com/sutchan/HanziMaster/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
              <FileText size={14} className="group-hover:scale-110 transition-transform" />
              <span>License</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
           <div className="flex items-center gap-2 text-xs font-mono opacity-80 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
             <span>v{version}</span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
