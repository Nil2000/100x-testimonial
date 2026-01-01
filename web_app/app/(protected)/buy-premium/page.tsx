"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for trying out the platform",
    icon: Sparkles,
    features: [
      "1 space",
      "3 video feedbacks",
      "15 text testimonials",
      "Basic customization",
      "Wall of love widget",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Best for growing businesses and agencies",
    icon: Zap,
    features: [
      "2-3 spaces",
      "5 video feedbacks per space",
      "20 text testimonials per space",
      "AI spam detection",
      "AI sentiment analysis",
      "Advanced customization",
      "Wall of love widget",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large teams and organizations",
    icon: Crown,
    features: [
      "Unlimited spaces",
      "Unlimited video feedbacks",
      "Unlimited text testimonials",
      "AI spam detection",
      "AI sentiment analysis",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Team collaboration",
    ],
    popular: false,
  },
];

export default function BuyPremiumPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Upgrade to Premium
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs and unlock powerful features to
          collect and showcase testimonials
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.name === "Starter" ? "Get Started" : "Start Free Trial"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Need a custom solution?</h2>
        <p className="text-muted-foreground mb-4">
          Contact us for enterprise pricing and custom features tailored to your
          organization
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Coming Soon!</DialogTitle>
            <DialogDescription>
              You selected the <strong>{selectedPlan}</strong> plan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Payment integration is currently under development. We&apos;ll
              notify you once it&apos;s ready! In the meantime, you can contact
              our sales team for manual setup.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
