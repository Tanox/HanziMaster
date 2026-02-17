/**
 * app/components/dashboard/ViewerSection.tsx v0.7.1
 */
import React, { useMemo } from 'react';
import IdiomNavigator from '../IdiomNavigator';
import StrokeViewer from '../StrokeViewer';
import Controls from '../Controls';
import { AppSettings, AnimationState, InteractionMode, HanziData, UILabels, CharacterAnalysis } from '../../types';

interface ViewerSectionProps {
  activeTerm: string;
  activeChar: string;
  activeCharIndex: number;
  hanziData: HanziData | null;
  analysis: CharacterAnalysis | null;
  pinyinCache: Record<string, string>;
  animationState: AnimationState;
  interactionMode: InteractionMode;
  speed: number;
  settings: AppSettings;
  loading: boolean;
  error: string | null;
  labels: UILabels;
  actions: {
    handleCharSelect: (char: string, explicitMode?: InteractionMode, index?: number) => void;
    setAnimationState: (state: AnimationState) => void;
    setInteractionMode: (mode: InteractionMode) => void;
    handlePracticeComplete: () => void;
  };
}

const ViewerSection: React.FC<ViewerSectionProps> = ({
  activeTerm,
  activeChar,
  activeCharIndex,
  hanziData,
  analysis,
  pinyinCache,
  animationState,
  interactionMode,
  speed,
  settings,
  loading,
  error,
  labels,
  actions
}) => {
  
  const currentPinyin = useMemo(() => {
    return analysis?.char === activeChar 
      ? analysis.pinyin 
      : (pinyinCache[activeChar] || '');
  }, [analysis, activeChar, pinyinCache]);

  return (
    <div id="viewer-section" className="flex flex-col items-center min-h-[580px]">
      <IdiomNavigator 
          term={activeTerm} 
          activeChar={activeChar} 
          activeIndex={activeCharIndex}
          onSelectChar={(char, index) => actions.handleCharSelect(char, undefined, index)} 
      />

      <div id="active-pinyin-display" className="h-16 mb-4 flex items-end justify-center w-full">
        {currentPinyin && (
            <span className="text-5xl md:text-6xl text-vermilion-600 dark:text-vermilion-400 font-serif font-bold tracking-widest animate-fade-in transition-all">
                {currentPinyin}
            </span>
        )}
      </div>

      <div id="viewer-container-outer" className="w-full flex flex-col items-center min-h-[320px]">
          {hanziData ? (
          <>
              <StrokeViewer 
                data={hanziData}
                animationState={animationState}
                setAnimationState={actions.setAnimationState}
                speed={speed}
                mode={interactionMode}
                settings={settings}
                onPracticeComplete={actions.handlePracticeComplete}
                labels={labels}
              />
              <Controls 
                animationState={animationState}
                onPlay={() => actions.setAnimationState(AnimationState.PLAYING)}
                onPause={() => actions.setAnimationState(AnimationState.PAUSED)}
                onReset={() => {
                    actions.setAnimationState(AnimationState.IDLE);
                    actions.setInteractionMode(InteractionMode.VIEW);
                }}
                mode={interactionMode}
                onToggleMode={() => {
                    const newMode = interactionMode === InteractionMode.VIEW ? InteractionMode.PRACTICE : InteractionMode.VIEW;
                    actions.setInteractionMode(newMode);
                    if (newMode === InteractionMode.PRACTICE) {
                        actions.setAnimationState(AnimationState.IDLE);
                    }
                }}
                char={activeChar}
                labels={{
                    play: labels.controlsPlay,
                    pause: labels.controlsPause,
                    reset: labels.controlsReset,
                    speed: labels.controlsSpeed,
                    practiceMode: labels.practiceMode || "Practice",
                    viewMode: labels.viewMode || "Watch"
                }}
                apiKey={settings.apiKey}
              />
          </>
          ) : (
          !loading && !error && (
              <div id="viewer-placeholder" className="h-[320px] w-full max-w-xs flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-slate-400">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4" />
                  {labels.previewText}
              </div>
          )
          )}
      </div>
    </div>
  );
};

export default ViewerSection;