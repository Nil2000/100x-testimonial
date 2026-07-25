
import { PlanType, SubscriptionStatus } from "@/generated/prisma/enums";
import { getSubscriptionDetails } from "@/actions/subscriptionActions";
import { create } from "zustand";

export type SubscriptionDetails = {
  plan: PlanType;
  subscriptionStatus: SubscriptionStatus;
  trialStartDate: string | null;
  trialEndDate: string | null;
  subscriptionId: string | null;
};

interface SubscriptionStore {
  subscription: SubscriptionDetails | null;
  loading: boolean;
  error: string | null;

  fetchSubscriptionDetails: () => Promise<void>;
  setSubscriptionDetails: (details: SubscriptionDetails | null) => void;
  clearSubscriptionError: () => void;
}

export const usePlanStore = create<SubscriptionStore>((set) => ({
  subscription: null,
  loading: false,
  error: null,

  fetchSubscriptionDetails: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getSubscriptionDetails();

      if ("error" in result) {
        set({ loading: false, error: result.error });
        return;
      }

      set({ loading: false, subscription: result.data });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch subscription details";
      set({ loading: false, error: message });
    }
  },
  setSubscriptionDetails: (details) => set({ subscription: details }),
  clearSubscriptionError: () => set({ error: null }),
}));

