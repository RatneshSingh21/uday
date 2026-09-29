import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
  max?: number;
}

export default function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
  max = 99,
}: QuantityStepperProps) {
  const btnSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className="inline-flex items-center border border-cream-300 rounded-full bg-cream-50 overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`${btnSize} flex items-center justify-center text-ink-600 hover:bg-cream-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <Minus className={iconSize} />
      </button>
      <span className={`${textSize} font-semibold text-ink-700 min-w-[2rem] text-center select-none`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${btnSize} flex items-center justify-center text-ink-600 hover:bg-cream-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
}
