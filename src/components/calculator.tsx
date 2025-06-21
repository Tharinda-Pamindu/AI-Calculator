"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { calculateExpression } from '@/app/actions';

export function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = (value: string) => {
    setError('');
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '=') {
      handleCalculate();
    } else {
      setExpression(prev => prev + value);
    }
  };

  const handleCalculate = async () => {
    if (!expression) return;
    try {
      const { result: calcResult, error: calcError } = await calculateExpression(expression);
      if (calcError) {
        setError(calcError);
        setResult('');
      } else {
        setResult(calcResult ?? '');
        setExpression(calcResult ?? '');
        setError('');
      }
    } catch (e) {
      setError('Calculation failed.');
      setResult('');
    }
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border bg-card p-4 text-right shadow-inner">
        <Input
          type="text"
          value={expression}
          onChange={(e) => {
            setError('');
            setExpression(e.target.value)
          }}
          onKeyDown={handleInputKeyDown}
          placeholder="0"
          className="w-full border-0 bg-transparent text-right text-3xl font-mono tracking-wider focus-visible:ring-0 focus-visible:ring-offset-0 h-12 pr-2"
        />
        {error ? (
          <div className="absolute bottom-2 left-4 text-sm text-destructive">{error}</div>
        ) : (
          <div className="h-6 text-xl text-muted-foreground font-mono">{result || ' '}</div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="destructive"
          className="col-span-2 text-lg py-6"
          onClick={() => handleButtonClick('C')}
        >
          C
        </Button>
        <Button variant="outline" className="text-lg py-6" onClick={() => handleButtonClick('(')}>(</Button>
        <Button variant="outline" className="text-lg py-6" onClick={() => handleButtonClick(')')}>)</Button>
        {buttons.map((btn) => (
          <Button
            key={btn}
            variant={['/','*','-','+','='].includes(btn) ? "secondary" : "outline"}
            className="text-lg py-6"
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
