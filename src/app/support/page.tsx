export default function SupportPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-neutral-900">
      <h1 className="text-4xl font-semibold tracking-tight">Support</h1>
      <p className="mt-4 text-neutral-600">Need help with Octo? Contact support below.</p>
      <section className="mt-10 grid gap-4 text-sm text-neutral-700">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-neutral-900">General Support</h2>
          <p className="mt-2">For account, workspace, and product questions.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-neutral-900">Billing Support</h2>
          <p className="mt-2">For subscriptions, credit packs, invoices, and cancellations.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-neutral-900">Security Reports</h2>
          <p className="mt-2">For responsible vulnerability reports and security issues.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-neutral-900">Contact</h2>
          <p className="mt-2">yogparel8299@gmail.com</p>
        </div>
      </section>
    </main>
  );
}
