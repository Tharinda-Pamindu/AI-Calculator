import { Calculator } from '@/components/calculator';
import { FormulaSimplifier } from '@/components/formula-simplifier';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator as CalculatorIcon, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-tight text-primary font-headline">Mathly</h1>
          <p className="text-muted-foreground mt-2">
            Your friendly neighborhood calculator and formula simplifier.
          </p>
        </header>
        <main>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">
                <CalculatorIcon className="mr-2 h-4 w-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="simplifier">
                <BrainCircuit className="mr-2 h-4 w-4" />
                AI Formula Simplifier
              </TabsTrigger>
            </TabsList>
            <TabsContent value="calculator">
              <Card>
                <CardContent className="p-6">
                  <Calculator />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="simplifier">
                <Card>
                  <CardContent className="p-6">
                    <FormulaSimplifier />
                  </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </main>
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Built with Next.js & Genkit</p>
        </footer>
      </div>
    </div>
  );
}
