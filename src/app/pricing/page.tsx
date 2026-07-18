/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import PricingHero from "../../components/pricing/PricingHero";
import PricingPlans from "../../components/pricing/PricingPlans";
import CreditPacks from "../../components/pricing/CreditPacks";
import FAQ from "../../components/pricing/FAQ";
import CTA from "../../components/CTA";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PricingPage() {
  return (
    <div className="bg-brand-bg">
      <PricingHero />
      <PricingPlans />
      <CreditPacks />
      <FAQ />
      <CTA />
    </div>
  );
}
