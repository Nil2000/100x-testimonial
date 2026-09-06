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
import {
  Check,
  Crown,
  Loader2,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { startUserTrial, getUserPlan } from "@/actions/subscriptionActions";
import {
  PlanType,
  PLAN_DISPLAY_NAMES,
  TRIAL_DURATION_DAYS,
  getPlanFeatureList,
} from "@/lib/subscription";
import { toast } from "sonner";

const pricingPlans: {
  id: PlanType;
  price: string;
  period: string;
  description: string;
  icon: LucideIcon;
  popular: boolean;
}[] = [
  {
    id: PlanType.FREE,
    price: "Free",
    period: "",
    description: "Perfect for trying out the platform",
    icon: Sparkles,
    popular: false,
  },
  {
    id: PlanType.PRO,
    price: "$20",
    period: "/month",
    description: "Best for growing businesses and agencies",
    icon: Zap,
    popular: true,
  },
  {
    id: PlanType.ENTERPRISE,
    price: "$30",
    period: "/month",
    description: "For large teams and organizations",
    icon: Crown,
    popular: false,
  },
];

const trialFeatures = getPlanFeatureList(PlanType.PRO);

export default function BuyPremiumPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPlan, setUserPlan] = useState<PlanType>(PlanType.FREE);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [daysLeftInTrial, setDaysLeftInTrial] = useState(0);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const result = await getUserPlan();
      if (result.success && result.data) {
        setUserPlan(result.data.plan as PlanType);
        setIsTrialActive(result.data.isTrialActive);
        setIsTrialExpired(result.data.isTrialExpired);
        setDaysLeftInTrial(result.data.daysLeftInTrial);
      }
    };
    fetchUserPlan();
  }, []);

  const canStartTrial =
    userPlan === PlanType.FREE && !isTrialActive && !isTrialExpired;

  const handleSelectPlan = (planId: PlanType) => {
    setSelectedPlan(planId);

    if (planId === PlanType.FREE) {
      if (isTrialActive) {
        toast.info("You're currently on a Professional trial.");
      } else if (userPlan === PlanType.FREE) {
        toast.info("You're already on the Starter plan!");
      } else {
        toast.info("You're already on a higher plan.");
      }
      return;
    }

    setIsDialogOpen(true);
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

  const ctaLabel = (planId: PlanType) => {
    if (planId === PlanType.FREE) {
      return userPlan === PlanType.FREE && !isTrialActive
        ? "Current plan"
        : "Get Started";
    }
    if (planId === userPlan && !isTrialActive) {
      return "Current plan";
    }
    return canStartTrial ? "Start Free Trial" : "Select plan";
  };

  const selectedPlanName = selectedPlan
    ? PLAN_DISPLAY_NAMES[selectedPlan]
    : "";

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Upgrade to Premium
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs and unlock powerful features to
          collect and showcase testimonials
        </p>
        {isTrialActive && (
          <p className="mt-4 text-sm text-primary">
            You&apos;re on a {PLAN_DISPLAY_NAMES[PlanType.PRO]} trial with{" "}
            <strong>
              {daysLeftInTrial} day{daysLeftInTrial === 1 ? "" : "s"}
            </strong>{" "}
            remaining.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const name = PLAN_DISPLAY_NAMES[plan.id];
          const features = getPlanFeatureList(plan.id);
          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {isTrialActive && plan.id === PlanType.PRO
                      ? "Your trial"
                      : "Most Popular"}
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{name}</CardTitle>
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
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
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
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={
                    plan.id === PlanType.FREE &&
                    userPlan === PlanType.FREE &&
                    !isTrialActive
                  }
                >
                  {ctaLabel(plan.id)}
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
              {canStartTrial
                ? `Start Your ${TRIAL_DURATION_DAYS}-Day Free Trial`
                : "Select a plan"}
            </DialogTitle>
            <DialogDescription>
              You selected the <strong>{selectedPlanName}</strong> plan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {canStartTrial ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Start your {TRIAL_DURATION_DAYS}-day free trial to unlock{" "}
                  {PLAN_DISPLAY_NAMES[PlanType.PRO]} features:
                </p>
                <ul className="space-y-2 text-sm">
                  {trialFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground">
                  After {TRIAL_DURATION_DAYS} days, you&apos;ll be moved back to
                  the {PLAN_DISPLAY_NAMES[PlanType.FREE]} plan unless you
                  upgrade.
                </p>
              </>
            ) : isTrialActive ? (
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
            {canStartTrial ? (
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
