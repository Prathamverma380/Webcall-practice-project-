'use client'

import { useState } from 'react'
import { FiX, FiSearch } from 'react-icons/fi'
import { COUNTRIES } from '@/lib/countries'

interface RatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RatesModal({ isOpen, onClose }: RatesModalProps) {
  const [search, setSearch] = useState('')
  
  if (!isOpen) return null

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
  )

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-white/10 max-w-2xl w-full mx-4 max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              📊 Call Rates
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <FiX size={24} className="text-slate-400" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search country or dial code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCountries.map((country) => (
              <div
                key={country.name}
                className="flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-700/50 rounded-xl transition-all duration-300 border border-white/5 hover:border-amber-500/30 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <p className="font-medium text-white group-hover:text-amber-300 transition-colors">{country.name}</p>
                    <p className="text-xs text-slate-500">{country.dial}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">
                    ${country.rate.toFixed(3)}
                  </p>
                  <p className="text-xs text-slate-500">per min</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCountries.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No countries found for "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 bg-slate-900/50">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-400">
              💰 Billing starts when call connects
            </p>
            <p className="text-sm text-emerald-400 font-medium">
              {COUNTRIES.length} countries
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
