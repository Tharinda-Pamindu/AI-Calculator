'use server';

/**
 * @fileOverview A formula simplification AI agent.
 *
 * - simplifyFormula - A function that handles the formula simplification process.
 * - SimplifyFormulaInput - The input type for the simplifyFormula function.
 * - SimplifyFormulaOutput - The return type for the simplifyFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyFormulaInputSchema = z.object({
  formula: z.string().describe('The mathematical formula to simplify.'),
});
export type SimplifyFormulaInput = z.infer<typeof SimplifyFormulaInputSchema>;

const SimplifyFormulaOutputSchema = z.object({
  simplifiedFormula: z.string().describe('The simplified mathematical formula.'),
  explanation: z.string().describe('The explanation of how the formula was simplified.'),
});
export type SimplifyFormulaOutput = z.infer<typeof SimplifyFormulaOutputSchema>;

export async function simplifyFormula(input: SimplifyFormulaInput): Promise<SimplifyFormulaOutput> {
  return simplifyFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyFormulaPrompt',
  input: {schema: SimplifyFormulaInputSchema},
  output: {schema: SimplifyFormulaOutputSchema},
  prompt: `You are an expert mathematician specializing in simplifying complex formulas.

You will use this information to simplify the formula and explain the steps taken to simplify it.

Formula: {{{formula}}}`,
});

const simplifyFormulaFlow = ai.defineFlow(
  {
    name: 'simplifyFormulaFlow',
    inputSchema: SimplifyFormulaInputSchema,
    outputSchema: SimplifyFormulaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
