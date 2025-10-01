'use client';

import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const applicantInfoSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'A valid phone number is required.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
});

const homeEnvironmentSchema = z.object({
  homeType: z.enum(['House', 'Apartment', 'Condo', 'Other']),
  ownOrRent: z.enum(['Own', 'Rent']),
  hasYard: z.string(),
});

const preferencesSchema = z.object({
  petType: z.enum(['Dog', 'Cat', 'Any']),
  age: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one age preference.',
  }),
});

const formSchema = applicantInfoSchema.merge(homeEnvironmentSchema).merge(preferencesSchema);

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'Step 1', name: 'Your Information', fields: ['fullName', 'email', 'phone', 'address'] },
  { id: 'Step 2', name: 'Home Environment', fields: ['homeType', 'ownOrRent', 'hasYard'] },
  { id: 'Step 3', name: 'Pet Preferences', fields: ['petType', 'age'] },
  { id: 'Step 4', name: 'Review & Submit' },
];

export default function AdoptionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: [],
    },
  });
  const { trigger, handleSubmit, getValues } = methods;

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as (keyof FormData)[], { shouldFocus: true });
    if (!output) return;
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Adoption Application Data:', data);
    setIsSubmitted(true);
    toast({
      title: 'Application Submitted!',
      description: "Thank you! We've received your application and will be in touch soon.",
    });
  };

  if (isSubmitted) {
    return (
      <>
        <PageHeader title="Thank You!" />
        <div className="container py-12 text-center">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
                        <Heart className="w-10 h-10" />
                    </div>
                    <CardTitle className="text-2xl mt-4">Application Received!</CardTitle>
                    <CardDescription>
                        We appreciate you taking the time to apply to adopt one of our wonderful animals. Our team will review your information and get back to you within 3-5 business days.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full">
                        <a href="/animals">Continue Browsing Animals</a>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </>
    );
  }


  return (
    <>
      <PageHeader title="Adoption Application" subtitle="Ready to welcome a new member to your family? Complete the form below to get started." />
      <div className="container py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-4" />
            <CardTitle>{steps[currentStep].name}</CardTitle>
            <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
          </CardHeader>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <FormField name="fullName" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} type="email" /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} type="tel" /></FormControl><FormMessage /></FormItem> )} />
                        <FormField name="address" render={({ field }) => ( <FormItem><FormLabel>Full Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      </div>
                    )}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <FormField name="homeType" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>What type of home do you live in?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    {['House', 'Apartment', 'Condo', 'Other'].map(type => (
                                        <FormItem key={type} className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value={type} /></FormControl><FormLabel className="font-normal">{type}</FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl><FormMessage />
                          </FormItem>
                        )} />
                        <FormField name="ownOrRent" render={({ field }) => (
                          <FormItem className="space-y-3"><FormLabel>Do you own or rent your home?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Own" /></FormControl><FormLabel className="font-normal">Own</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Rent" /></FormControl><FormLabel className="font-normal">Rent</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl><FormMessage />
                          </FormItem>
                        )} />
                        <FormField name="hasYard" render={({ field }) => (
                          <FormItem><FormLabel>Do you have a fenced yard?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="yes">Yes, fully fenced</SelectItem><SelectItem value="partial">Yes, partially fenced</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                            </Select><FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    )}
                    {currentStep === 2 && (
                       <div className="space-y-6">
                          <FormField name="petType" render={({ field }) => (
                              <FormItem className="space-y-3"><FormLabel>Are you looking for a dog or a cat?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Dog" /></FormControl><FormLabel className="font-normal">Dog</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Cat" /></FormControl><FormLabel className="font-normal">Cat</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Any" /></FormControl><FormLabel className="font-normal">No Preference</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl><FormMessage />
                              </FormItem>
                          )} />
                          <FormField control={methods.control} name="age" render={() => (
                              <FormItem><FormLabel>What age are you interested in?</FormLabel>
                                <div className="space-y-2">
                                  {['Puppy/Kitten', 'Young', 'Adult', 'Senior'].map((item) => (
                                    <FormField key={item} control={methods.control} name="age" render={({ field }) => (
                                      <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                            return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item));
                                          }} />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item}</FormLabel>
                                      </FormItem>
                                    )} />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                          )} />
                       </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
                            <div className="space-y-4 text-sm p-4 bg-secondary/30 rounded-lg">
                                {Object.entries(getValues()).map(([key, value])=> (
                                    <div key={key} className="flex justify-between">
                                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className="text-muted-foreground text-right">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    {currentStep === steps.length - 2 ? 'Review' : 'Next'}
                  </Button>
                ) : (
                  <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Submit Application</Button>
                )}
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </div>
    </>
  );
}
