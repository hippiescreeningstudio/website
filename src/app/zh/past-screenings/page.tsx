"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PastScreeningsZh() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to current year (2025)
    router.replace("/zh/past-screenings/2025");
  }, [router]);

  return null;
} 