"use client";

import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="text-[120px] sm:text-[180px] font-bold font-dm_serif text-primary/10 leading-none">
            404
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-6xl"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            🫠
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-dm_serif">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-poppins max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4"
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="pt-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground font-poppins mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/spaces/create">
              <Button variant="ghost" size="sm">
                Create Space
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Search className="w-3 h-3 mr-1" />
                Explore
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
