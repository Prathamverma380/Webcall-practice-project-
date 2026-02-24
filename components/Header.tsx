'use client'

import { useState, useEffect } from 'react'
import { FiPhone, FiUser, FiLogOut } from 'react-icons/fi'
import { supabase } from '../lib/supabaseClient'
import RatesModal from './RatesModal'
import SignInModal from './SignInModal'
import PackagesModal from './PackagesModal'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [showRatesModal, setShowRatesModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showPackagesModal, setShowPackagesModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setShowSignInModal(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <>
      <header className="w-full py-4 bg-gradient-to-r from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-105">
              <FiPhone size={22} />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              WebbCall
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <button 
              onClick={() => setShowPackagesModal(true)}
              className="px-5 py-2.5 border-2 border-emerald-400/50 text-emerald-400 rounded-full text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              💎 Buy Credits
            </button>
            <button 
              onClick={() => setShowRatesModal(true)}
              className="px-5 py-2.5 border-2 border-amber-400/50 text-amber-400 rounded-full text-sm font-medium hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              📊 Rates
            </button>
            
            {loading ? (
              <div className="px-5 py-2.5 text-slate-400 text-sm">...</div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                  <FiUser size={16} className="text-green-400" />
                  <span className="text-sm text-green-300 max-w-[120px] truncate">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="p-2.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
                  title="Sign Out"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSignInModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                ✨ Sign In
              </button>
            )}
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
