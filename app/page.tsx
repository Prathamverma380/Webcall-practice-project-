import DialPad from '../components/DialPad'

export default function Home() {
  return (
    <main className="container-center">
      {/* Hero Text */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Call Anyone, Anywhere
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Crystal-clear international calls directly from your browser. No apps, no downloads.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        <aside className="col-span-3 space-y-4">
          <div className="info-card">
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="font-semibold text-cyan-300 mb-1">International Calls</h3>
            <p className="text-sm text-slate-400">Make crystal-clear calls to any country directly from your browser.</p>
          </div>
          <div className="info-card">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-purple-300 mb-1">Personal Caller ID</h3>
            <p className="text-sm text-slate-400">Set your own caller ID for a professional touch.</p>
          </div>
          <div className="info-card">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold text-pink-300 mb-1">Free Credits</h3>
            <p className="text-sm text-slate-400">Get started with free credit for your first call.</p>
          </div>
        </aside>

        <section className="col-span-6 flex justify-center">
          <DialPad />
        </section>

        <aside className="col-span-3 space-y-4">
          <div className="info-card">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-emerald-300 mb-1">Low Rates</h3>
            <p className="text-sm text-slate-400">Competitive rates starting from just $0.01/minute.</p>
          </div>
          <div className="info-card">
            <div className="text-2xl mb-2">🎙️</div>
            <h3 className="font-semibold text-blue-300 mb-1">HD Voice Quality</h3>
            <p className="text-sm text-slate-400">Crystal clear audio for all your international calls.</p>
          </div>
          <div className="info-card">
            <div className="text-2xl mb-2">♾️</div>
            <h3 className="font-semibold text-amber-300 mb-1">No Expiration</h3>
            <p className="text-sm text-slate-400">Your credits never expire. Use them anytime.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
