import DialPad from '../components/DialPad'

export default function Home() {
  return (
    <main className="container-center">
      <div className="grid grid-cols-12 gap-6 items-start">
        <aside className="col-span-3 space-y-4">
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">International Calls</h3>
            <p className="text-sm text-slate-300">Make crystal-clear calls to any country directly from your browser. No downloads needed.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">Personal ID</h3>
            <p className="text-sm text-slate-300">Set your own caller ID for a professional and personal touch.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">Free Credits</h3>
            <p className="text-sm text-slate-300">Get started with free credit for your first call.</p>
          </div>
        </aside>

        <section className="col-span-6 flex justify-center">
          <DialPad />
        </section>

        <aside className="col-span-3 space-y-4">
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">Low Rates</h3>
            <p className="text-sm text-slate-300">Competitive international rates starting from just $0.01/minute.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">High Quality CALLS</h3>
            <p className="text-sm text-slate-300">Crystal clear HD voice quality for all your international calls.</p>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-lg">
            <h3 className="font-semibold">No Expiration on Credits</h3>
            <p className="text-sm text-slate-300">Credits never expire.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
