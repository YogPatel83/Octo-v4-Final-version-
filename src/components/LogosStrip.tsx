/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function LogosStrip() {
  const logos = ["Vercel", "Stripe", "Airbnb", "Linear", "Attio"];
  
  return (
    <section className="py-20 border-y border-brand-border bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-brand-secondary mb-10 tracking-widest uppercase">
          Trusted by founders building the next generation of companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale">
          {logos.map((logo) => (
            <div key={logo} className="text-2xl font-bold tracking-tighter text-brand-primary">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
