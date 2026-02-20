"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import RecommendedProperties from "@/components/RecommendedProperties";
import SocialMedia from "@/components/SocialMedia";
import ContactOverlay from "@/components/ContactOverlay";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Hero onContactClick={() => setContactOpen(true)} />
      <RecommendedProperties />
      <SocialMedia />
      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
