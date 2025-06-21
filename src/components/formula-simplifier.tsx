"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  simplifyFormula,
  SimplifyFormulaInput,
  SimplifyFormulaOutput,
} from '@/ai/flows/simplify-formula';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  formula: z.string().min(3, {
    message: 'Please enter a formula with at least 3 characters.',
  }),
});

export function FormulaSimplifier() {
  const [result, setResult] = useState<SimplifyFormulaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formula: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: SimplifyFormulaInput = { formula: values.formula };
      const output = await simplifyFormula(input);
      setResult(output);
    } catch (e) {
      console.error(e);
      setError('An error occurred while simplifying the formula.');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="formula"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Complex Formula</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., (x^2 + 2x + 1) / (x + 1)"
                    className="min-h-[100px] text-base font-mono"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Simplify with AI
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
        </div>
      )}

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-4 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Simplified Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono bg-muted p-4 rounded-md">
                {result.simplifiedFormula}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-foreground/90">
                {result.explanation.split('\\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
