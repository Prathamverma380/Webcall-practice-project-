'use client'

import { FiX } from 'react-icons/fi'
import { COUNTRIES } from '@/lib/countries'

interface RatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RatesModal({ isOpen, onClose }: RatesModalProps) {
  if (!isOpen) return null

  // Sample rates per minute for each country
  const countryRates: Record<string, number> = {
    'United States': 0.01,
    'United Kingdom': 0.02,
    'Canada': 0.01,
    'Australia': 0.03,
    'Germany': 0.02,
    'France': 0.02,
    'Spain': 0.02,
    'Italy': 0.02,
    'Netherlands': 0.02,
    'Sweden': 0.02,
    'Norway': 0.03,
    'Denmark': 0.02,
    'India': 0.005,
    'Pakistan': 0.006,
    'Bangladesh': 0.005,
    'Japan': 0.04,
    'South Korea': 0.04,
    'China': 0.03,
    'Brazil': 0.02,
    'Mexico': 0.015,
    'Argentina': 0.02,
    'South Africa': 0.025,
    'Nigeria': 0.015,
    'Egypt': 0.01,
    'Turkey': 0.015,
    'Poland': 0.015,
    'Portugal': 0.02,
    'Switzerland': 0.04,
    'Belgium': 0.02
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-700 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Call Rates by Country</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <FiX size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COUNTRIES.map((country) => (
              <div
                key={country.name}
                className="flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 rounded-lg transition border border-slate-700/50"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{country.name}</p>
                  <p className="text-xs text-slate-400">{country.dial}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-400">
                    ${(countryRates[country.name] || 0.02).toFixed(3)}/min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6 bg-slate-800/30">
          <p className="text-sm text-slate-400 text-center mb-4">
            Rates are per minute of call duration. Billing starts after the call connects.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
