import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DeviceFrame from './components/DeviceFrame';
import FeedbackPanel from './components/FeedbackPanel';
import PrizeModal from './components/PrizeModal';
import { CASES_BANK } from './data/cases';
import { playSuccessSound, playErrorSound } from './utils/audio';

// Helper function to pick 3 random cases with a balanced mix of safe and scam cases
function getRandomCases(bank, count = 3) {
  const scams = bank.filter(c => c.isScam);
  const safes = bank.filter(c => !c.isScam);

  const shuffledScams = [...scams].sort(() => 0.5 - Math.random());
  const shuffledSafes = [...safes].sort(() => 0.5 - Math.random());

  // Alternate between 2 scams + 1 safe OR 1 scam + 2 safes randomly
  const pickScamCount = Math.random() > 0.5 ? 2 : 1;
  const pickSafeCount = count - pickScamCount;

  const roundCases = [
    ...shuffledScams.slice(0, pickScamCount),
    ...shuffledSafes.slice(0, pickSafeCount)
  ].sort(() => 0.5 - Math.random());

  return roundCases;
}

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeCases, setActiveCases] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Initialize round on mount
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const selected = getRandomCases(CASES_BANK, 3);
    setActiveCases(selected);
    setCurrentStep(0);
    setUserChoices([]);
    setIsAnswered(false);
    setCurrentChoice(null);
    setGameFinished(false);
  };

  const currentCase = activeCases[currentStep];

  // Calculate score (aciertos)
  const score = useMemo(() => {
    return userChoices.filter(item => item.isCorrect).length;
  }, [userChoices]);

  const handleAnswer = (choice) => {
    if (isAnswered || !currentCase) return;

    const isScam = currentCase.isScam;
    const isCorrect = (choice === 'scam' && isScam) || (choice === 'safe' && !isScam);

    // Audio feedback
    if (soundEnabled) {
      if (isCorrect) {
        playSuccessSound();
      } else {
        playErrorSound();
      }
    }

    setCurrentChoice(choice);
    setIsAnswered(true);
    setUserChoices(prev => [
      ...prev,
      { caseId: currentCase.id, userChoice: choice, isCorrect }
    ]);
  };

  const handleNextCase = () => {
    if (currentStep < activeCases.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsAnswered(false);
      setCurrentChoice(null);
    } else {
      setGameFinished(true);
    }
  };

  return (
    <div className="bg-[#F4F7FB] font-body text-[#042C6C] min-h-screen flex flex-col selection:bg-[#3BA2F7] selection:text-white">
      {/* Interseguro Branded Header HUD */}
      <Header
        score={score}
        currentStep={currentStep}
        totalSteps={activeCases.length || 3}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onReset={startNewRound}
      />

      {/* Main Game Container */}
      <main className="flex-1 w-full bg-[#F4F7FB] px-4 py-4 sm:py-6 flex flex-col items-center">
        <div className="flex flex-col w-full max-w-xl mx-auto pb-8">
          
          {!gameFinished && currentCase ? (
            <>
              {/* Question Headline */}
              <div className="w-full text-center py-1 mb-3">
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#042C6C] leading-tight tracking-tight drop-shadow-xs">
                  ¿Es Seguro o Estafa?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Analiza el mensaje entrante y selecciona la opción correcta
                </p>
              </div>

              {/* Simulated Device (SMS or WhatsApp) */}
              <DeviceFrame currentCase={currentCase} isAnswered={isAnswered} />

              {/* Big Action Buttons (Disabled once answered) */}
              <div className="w-full flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  onClick={() => handleAnswer('safe')}
                  disabled={isAnswered}
                  className={`flex-1 h-16 sm:h-20 rounded-2xl bg-[#E0F2FE] hover:bg-[#bae6fd] text-[#042C6C] active:scale-98 transition-all flex items-center justify-center gap-3 font-headline text-xl sm:text-2xl font-bold shadow-md shadow-sky-100 cursor-pointer border-2 border-[#3BA2F7] ${
                    isAnswered ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[32px] text-[#042C6C]">
                    check_circle
                  </span>
                  ES SEGURO
                </button>

                <button
                  onClick={() => handleAnswer('scam')}
                  disabled={isAnswered}
                  className={`flex-1 h-16 sm:h-20 rounded-2xl bg-[#F32682] hover:bg-[#e01570] text-white active:scale-98 transition-all flex items-center justify-center gap-3 font-headline text-xl sm:text-2xl font-extrabold shadow-lg shadow-[#F32682]/30 cursor-pointer border-2 border-white ${
                    isAnswered ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[32px]">
                    dangerous
                  </span>
                  ES ESTAFA
                </button>
              </div>

              {/* Educational Feedback Panel (Revealed on choice) */}
              {isAnswered && (
                <FeedbackPanel
                  currentCase={currentCase}
                  userChoice={currentChoice}
                  onNext={handleNextCase}
                  isLastCase={currentStep === activeCases.length - 1}
                />
              )}
            </>
          ) : (
            /* Winner / Retry Prize Screen */
            <PrizeModal
              score={score}
              totalCases={activeCases.length || 3}
              soundEnabled={soundEnabled}
              onPlayAgain={startNewRound}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-3 text-xs font-medium text-slate-400 border-t border-slate-200 bg-white">
        © 2026 Interseguro - Programa de Prevención de Fraudes Digitales
      </footer>
    </div>
  );
}
