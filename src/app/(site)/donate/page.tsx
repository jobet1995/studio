'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Heart, Users } from 'lucide-react';

const suggestedAmounts = [25, 50, 100, 250];
const recentDonors = [
  { name: 'Jennifer L.', amount: 50, time: '2 hours ago' },
  { name: 'Mark C.', amount: 100, time: '5 hours ago' },
  { name: 'Anonymous', amount: 25, time: '1 day ago' },
  { name: 'The Smith Family', amount: 250, time: '2 days ago' },
];

export default function DonatePage() {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState<number | ''>(50);
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(Number(value));
  };
  
  const fundraisingGoal = 10000;
  const currentFunds = 6500;
  const progress = (currentFunds / fundraisingGoal) * 100;

  return (
    <>
      <PageHeader
        title="Support Our Cause"
        subtitle="Your generous donation helps us provide food, shelter, and medical care to animals in need. Every dollar makes a difference."
      />
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Tabs defaultValue="one-time" onValueChange={setDonationType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
                    <TabsTrigger value="recurring">Monthly Donation</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold">Choose an amount</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {suggestedAmounts.map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        className={cn('py-6 text-lg', amount === value && customAmount === '' && 'bg-primary/20 border-primary')}
                        onClick={() => handleAmountClick(value)}
                      >
                        ${value}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="custom-amount" className="text-lg font-semibold">Or enter a custom amount</Label>
                  <div className="relative mt-2">
                    <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="5.00"
                      className="pl-7 py-6 text-lg"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full text-lg py-7 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Donate ${amount || 0} {donationType === 'recurring' ? 'per Month' : ''}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                    Secure donation processing by Stripe.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="text-primary"/> Monthly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-4" />
                <div className="mt-4 flex justify-between font-semibold">
                  <span>${currentFunds.toLocaleString()}</span>
                  <span>${fundraisingGoal.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">raised of our goal</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Recent Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentDonors.map((donor, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold">{donor.name}</p>
                        <p className="text-muted-foreground">{donor.time}</p>
                      </div>
                      <p className="font-bold text-primary">${donor.amount}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
