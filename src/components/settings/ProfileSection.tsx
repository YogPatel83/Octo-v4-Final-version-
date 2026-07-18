/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function ProfileSection() {
  return (
    <div className="bg-brand-card border border-brand-border rounded-[32px] p-10 shadow-sm space-y-12 text-brand-primary">
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-brand-primary">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              defaultValue="john@acme.com"
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-brand-primary">Change Password</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Current Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">New Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-input-bg text-brand-input-text focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none" 
              />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6">
        <button className="px-8 py-3 bg-brand-accent text-brand-accent-text font-bold rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
