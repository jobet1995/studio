'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { petMatch } from '@/ai/flows/ai-powered-pet-matching';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Dog } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const petMatchSchema = z.object({
  lifestyle: z.string().min(20, { message: 'Please describe your lifestyle in a bit more detail.' }),
  preferences: z.string().min(10, { message: 'Please tell us your preferences.' }),
  existingPets: z.string().optional(),
});

type PetMatchForm = z.infer<typeof petMatchSchema>;

type PetMatchState = {
  recommendations?: string;
  error?: string;
} | undefined;

const initialFormState: PetMatchState = undefined;

async function petMatchAction(_prevState: PetMatchState, formData: FormData): Promise<PetMatchState> {
  const validatedFields = petMatchSchema.safeParse({
    lifestyle: formData.get('lifestyle'),
    preferences: formData.get('preferences'),
    existingPets: formData.get('existingPets'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data.',
    };
  }

  try {
    const result = await petMatch(validatedFields.data);
    return { recommendations: result.recommendations };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while getting recommendations. Please try again.' };
  }
}

export default function PetMatchPage() {
  const [state, formAction] = useActionState(petMatchAction, initialFormState);

  const form = useForm<PetMatchForm>({
    resolver: zodResolver(petMatchSchema),
  });

  const { formState } = form;

  return (
    <>
      <PageHeader
        title="AI Pet Match"
        subtitle="Answer a few questions about your lifestyle and preferences, and our AI will help you find the perfect companion."
      />
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card>
            <form action={formAction}>
              <CardHeader>
                <CardTitle>Find Your Match</CardTitle>
                <CardDescription>The more detail you provide, the better the match!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="lifestyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Lifestyle</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="e.g., I live in an apartment and work from home. I enjoy long walks on weekends but am less active during the week. I live alone."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="e.g., Looking for a medium-sized dog, under 3 years old. I'd prefer a playful but not overly hyper personality. A cuddly cat would also be great."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="existingPets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Existing Pets (if any)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={2}
                          placeholder="e.g., I have a 5-year-old, calm male cat."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={formState.isSubmitting} className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {formState.isSubmitting ? 'Finding Matches...' : 'Get Recommendations'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <div>
            <Card className="min-h-[400px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dog className="text-primary"/>
                  Our Recommendations
                </CardTitle>
                <CardDescription>Based on your input, here are a few friends you might get along with.</CardDescription>
              </CardHeader>
              <CardContent>
                {formState.isSubmitting && (
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-6 w-1/4 mt-4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                )}
                {state?.error && <p className="text-destructive">{state.error}</p>}
                {state?.recommendations && (
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {state.recommendations}
                  </div>
                )}
                {!state?.recommendations && !formState.isSubmitting && (
                    <div className="text-center text-muted-foreground py-16">
                        <p>Your perfect pet recommendations will appear here.</p>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
