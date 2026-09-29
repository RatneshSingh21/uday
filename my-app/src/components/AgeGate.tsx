import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const AGE_GATE_KEY = 'earthveda-age-verified';

export default function AgeGate() {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AGE_GATE_KEY);
      if (!stored) setVerified(false);
    } catch {
      setVerified(false);
    }
  }, []);

  const handleVerify = () => {
    try {
      localStorage.setItem(AGE_GATE_KEY, 'true');
    } catch {
      // ignore
    }
    setVerified(true);
  };

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-forest-900/95 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full bg-cream-50 rounded-3xl shadow-lift p-8 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-forest-600 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-gold-400" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest-700 mb-3">Adults Only (18+)</h2>
        <p className="text-sm text-ink-500 leading-relaxed mb-6">
          EarthVeda Herbal products are intended for adult men aged 18 and above. By entering, you confirm
          that you are of legal age and understand these products are Ayurvedic wellness supplements, not
          medical treatments.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={handleVerify} className="btn-primary w-full">
            I am 18 or older — Enter
          </button>
          <a href="https://www.google.com" className="btn-ghost w-full text-ink-400 hover:text-ink-600">
            I am under 18 — Leave
          </a>
        </div>
        <p className="text-[11px] text-ink-300 mt-6 leading-relaxed">
          These statements have not been evaluated by any medical authority. This product is not intended
          to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}
