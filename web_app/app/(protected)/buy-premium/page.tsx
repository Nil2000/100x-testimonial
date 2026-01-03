"use client";

import { useState, useEffect } from "react";
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
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react";
import { startUserTrial, getUserPlan } from "@/actions/subscriptionActions";
import { toast } from "sonner";

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
    price: "$20",
    period: "/month",
    description: "Best for growing businesses and agencies",
    icon: Zap,
    features: [
      "3 spaces",
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
    price: "$30",
    period: "/space/month",
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
  const [isLoading, setIsLoading] = useState(false);
  const [userPlan, setUserPlan] = useState<string>("FREE");
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [daysLeftInTrial, setDaysLeftInTrial] = useState(0);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const result = await getUserPlan();
      if (result.success && result.data) {
        setUserPlan(result.data.plan);
        setIsTrialActive(result.data.isTrialActive);
        setDaysLeftInTrial(result.data.daysLeftInTrial);
      }
    };
    fetchUserPlan();
  }, []);

  const handleSelectPlan = async (planName: string) => {
    setSelectedPlan(planName);

    if (planName === "Starter") {
      toast.info("You're already on the free plan!");
      return;
    }

    if (planName === "Professional" || planName === "Enterprise") {
      if (userPlan === "FREE") {
        setIsDialogOpen(true);
      } else if (userPlan === "TRIAL") {
        setIsDialogOpen(true);
      } else {
        toast.info("Payment integration coming soon!");
      }
    }
  };

  const handleStartTrial = async () => {
    setIsLoading(true);
    const result = await startUserTrial();
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Trial started successfully!");
      setIsDialogOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
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
            <DialogTitle>
              {userPlan === "FREE"
                ? "Start Your 7-Day Free Trial"
                : "Upgrade Your Plan"}
            </DialogTitle>
            <DialogDescription>
              You selected the <strong>{selectedPlan}</strong> plan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {userPlan === "FREE" ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Start your 7-day free trial to unlock all {selectedPlan}{" "}
                  features:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>3 spaces with full customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>5 video feedbacks per space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>AI spam detection & sentiment analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  After 7 days, you&apos;ll be moved back to the free plan
                  unless you upgrade.
                </p>
              </>
            ) : userPlan === "TRIAL" ? (
              <>
                <p className="text-sm text-muted-foreground">
                  You&apos;re currently on a trial with{" "}
                  <strong>{daysLeftInTrial} days</strong> remaining.
                </p>
                <p className="text-sm text-muted-foreground">
                  Payment integration is currently under development. We&apos;ll
                  notify you once it&apos;s ready!
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Payment integration is currently under development. We&apos;ll
                notify you once it&apos;s ready!
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {userPlan === "FREE" ? (
              <Button onClick={handleStartTrial} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting Trial...
                  </>
                ) : (
                  "Start Free Trial"
                )}
              </Button>
            ) : (
              <Button onClick={() => setIsDialogOpen(false)}>Got it!</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
