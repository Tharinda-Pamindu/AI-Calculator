'use server';

export async function calculateExpression(expression: string): Promise<{ result: string | null; error: string | null; }> {
  try {
    const sanitizedExpression = expression.replace(/\s/g, '');
    if (!/^[0-9+\-*/().]+$/.test(sanitizedExpression) && sanitizedExpression !== '') {
      return { result: null, error: 'Invalid characters in expression.' };
    }
    
    if (sanitizedExpression === '') {
        return { result: '', error: null };
    }

    const result = new Function('return ' + sanitizedExpression)();

    if (typeof result !== 'number' || !isFinite(result)) {
        return { result: null, error: 'Invalid calculation result.' };
    }

    return { result: String(result), error: null };
  } catch (e) {
    console.error(e);
    return { result: null, error: 'Invalid expression.' };
  }
}
