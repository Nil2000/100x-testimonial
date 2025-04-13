"use client";

import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";

export default function NotFoundContent() {
  return (
    <div className="flex flex-col sm:items-center sm:justify-center justify-start space-y-4 p-4 h-[calc(100vh-8rem)]">
      <motion.div
        className="text-4xl"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        🫠
      </motion.div>
      <motion.div
        className="font-bold font-dm_serif text-5xl"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sorry This page doesn’t exist.{" "}
      </motion.div>
      <motion.div
        className="text-muted-foreground"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Head to our{" "}
        <Link
          href={"/"}
          className="font-semibold hover:underline text-foreground underline-offset-4"
        >
          homepage
        </Link>{" "}
        that does exist, or try double-checking the URL.
      </motion.div>
    </div>
  );
}
