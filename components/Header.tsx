'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPhone } from 'react-icons/fi'
import RatesModal from './RatesModal'
import SignInModal from './SignInModal'
import PackagesModal from './PackagesModal'

export default function Header() {
  const [showRatesModal, setShowRatesModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showPackagesModal, setShowPackagesModal] = useState(false)

  return (
    <>
      <header className="w-full py-6">
        <div className="container-center flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/5 text-cyan-300">
              <FiPhone size={22} />
            </div>
            <div className="text-xl font-semibold text-cyan-300">WebbCall</div>
          </div>

          <nav className="flex items-center gap-3">
            <button 
              onClick={() => setShowPackagesModal(true)}
              className="px-4 py-2 border border-green-400 text-green-400 rounded-full text-sm hover:bg-green-500/10 transition"
            >
              $ Buy
            </button>
            <button 
              onClick={() => setShowRatesModal(true)}
              className="px-4 py-2 border border-green-400 text-green-400 rounded-full text-sm hover:bg-green-500/10 transition"
            >
              $ Rates
            </button>
            <button 
              onClick={() => setShowSignInModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-900 rounded-full text-sm font-medium shadow hover:shadow-lg transition"
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Modals */}
      <RatesModal isOpen={showRatesModal} onClose={() => setShowRatesModal(false)} />
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
      <PackagesModal isOpen={showPackagesModal} onClose={() => setShowPackagesModal(false)} />
    </>
  )
}
