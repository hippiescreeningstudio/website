"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PastScreenings() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to current year (2025)
    router.replace("/past-screenings/2025");
  }, [router]);

  return null;
} 