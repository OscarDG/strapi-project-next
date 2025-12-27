export const revalidate = 86400; // Revalidate this page every 10 seconds

import { HeroSection } from "@/components/hero-section";
import { getHomePage } from "../lib/strapi";
import { Suspense } from "react";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  return {
    title: strapiData?.title || "Default Title",
    description: strapiData?.description || "Default Description",
  }
}

export default async function Home() {

  const strapiData = await getHomePage();

  console.log(strapiData);

  const { title, description } = strapiData;
  const [heroSection] = strapiData?.sections || [];

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>
      <Suspense fallback={<div>Loading Hero Section...</div>}>
            <HeroSection data={{...heroSection, title, description}} />
      </Suspense>
    </main>
  );
}
