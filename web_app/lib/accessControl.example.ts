/**
 * EXAMPLE USAGE OF ACCESS CONTROL SYSTEM
 *
 * This file demonstrates how to use the checkUserAccess function
 * throughout your application to enforce plan limits.
 */

import { checkUserAccess } from "@/lib/accessControl";

// ============================================
// EXAMPLE 1: Check if user can create a space
// ============================================
async function _handleCreateSpace(userId: string) {
  const accessCheck = await checkUserAccess(userId, "space");

  if (!accessCheck.hasAccess) {
    // Show error to user
    return {
      error: accessCheck.reason,
      currentUsage: accessCheck.currentUsage,
      limit: accessCheck.limit,
    };
  }

  // Proceed with space creation
  // ... your space creation logic
}

// ============================================
// EXAMPLE 2: Check if user can upload video feedback
// ============================================
async function _handleVideoFeedbackUpload(userId: string, spaceId: string) {
  const accessCheck = await checkUserAccess(userId, "videoFeedback", spaceId);

  if (!accessCheck.hasAccess) {
    if (accessCheck.isTrialExpired) {
      // Show trial expired message with upgrade prompt
      return {
        error:
          "Your trial has expired. Please upgrade to continue using video feedbacks.",
        trialExpired: true,
      };
    }

    // Show limit reached message
    return {
      error: accessCheck.reason,
      currentUsage: accessCheck.currentUsage,
      limit: accessCheck.limit,
    };
  }

  // Proceed with video upload
  // ... your video upload logic
}

// ============================================
// EXAMPLE 3: Check if user can add text testimonial
// ============================================
async function _handleTextTestimonialSubmit(userId: string, spaceId: string) {
  const accessCheck = await checkUserAccess(userId, "textTestimonial", spaceId);

  if (!accessCheck.hasAccess) {
    return {
      error: accessCheck.reason,
      currentUsage: accessCheck.currentUsage,
      limit: accessCheck.limit,
    };
  }

  // Proceed with testimonial submission
  // ... your testimonial logic
}

// ============================================
// EXAMPLE 4: Check if user can use AI spam detection
// ============================================
async function _handleSpamAnalysis(userId: string, _testimonialId: string) {
  void _testimonialId;
  const accessCheck = await checkUserAccess(userId, "aiSpam");

  if (!accessCheck.hasAccess) {
    // Show upgrade prompt
    return {
      error: accessCheck.reason,
      upgradeRequired: true,
    };
  }

  // Proceed with spam analysis
  // ... your AI spam detection logic
}

// ============================================
// EXAMPLE 5: Check if user can use AI sentiment analysis
// ============================================
async function _handleSentimentAnalysis(userId: string, _testimonialId: string) {
  void _testimonialId;
  const accessCheck = await checkUserAccess(userId, "aiSentiment");

  if (!accessCheck.hasAccess) {
    // Show upgrade prompt
    return {
      error: accessCheck.reason,
      upgradeRequired: true,
    };
  }

  // Proceed with sentiment analysis
  // ... your AI sentiment analysis logic
}

// ============================================
// EXAMPLE 6: Use in API routes
// ============================================
/*
// In your API route (e.g., app/api/spaces/route.ts)
import { auth } from "@/lib/auth";
import { checkUserAccess } from "@/lib/accessControl";

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Check access before creating space
  const accessCheck = await checkUserAccess(session.user.id, "space");
  
  if (!accessCheck.hasAccess) {
    return Response.json(
      { 
        error: accessCheck.reason,
        currentUsage: accessCheck.currentUsage,
        limit: accessCheck.limit,
      },
      { status: 403 }
    );
  }
  
  // Proceed with space creation
  // ...
}
*/

// ============================================
// EXAMPLE 7: Use in Server Actions
// ============================================
/*
// In your server action (e.g., actions/spaceActions.ts)
"use server";

import { auth } from "@/lib/auth";
import { checkUserAccess } from "@/lib/accessControl";

export async function createSpace(data: SpaceData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }
  
  // Check access
  const accessCheck = await checkUserAccess(session.user.id, "space");
  
  if (!accessCheck.hasAccess) {
    return { 
      error: accessCheck.reason,
      limitReached: true,
      currentUsage: accessCheck.currentUsage,
      limit: accessCheck.limit,
    };
  }
  
  // Create space
  // ...
}
*/

// ============================================
// EXAMPLE 8: Show usage stats to user
// ============================================
/*
// In a component showing user's plan usage
import { getUserPlanInfo } from "@/lib/accessControl";

async function PlanUsageComponent({ userId }: { userId: string }) {
  const planInfo = await getUserPlanInfo(userId);
  
  if (!planInfo) return null;
  
  return (
    <div>
      <h3>Your Plan: {planInfo.plan}</h3>
      {planInfo.isTrialActive && (
        <p>Trial ends in {planInfo.daysLeftInTrial} days</p>
      )}
      {planInfo.isTrialExpired && (
        <p>Your trial has expired. Please upgrade to continue.</p>
      )}
    </div>
  );
}
*/

void _handleCreateSpace;
void _handleVideoFeedbackUpload;
void _handleTextTestimonialSubmit;
void _handleSpamAnalysis;
void _handleSentimentAnalysis;

export {};
