'use client'

import { FiX, FiCheck } from 'react-icons/fi'

interface PackagesModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Package {
  name: string
  price: number
  credits: number
  monthlyMinutes: number
  features: string[]
  popular?: boolean
}

const PACKAGES: Package[] = [
  {
    name: 'Starter',
    price: 9.99,
    credits: 50,
    monthlyMinutes: 1000,
    features: [
      'Up to 1000 minutes/month',
      'Call to 50+ countries',
      'Standard call quality',
      'Email support',
      'Credits never expire'
    ]
  },
  {
    name: 'Professional',
    price: 29.99,
    credits: 200,
    monthlyMinutes: 5000,
    features: [
      'Up to 5000 minutes/month',
      'Call to 150+ countries',
      'HD call quality',
      'Priority support',
      'Custom caller ID',
      'Credits never expire',
      'Call history analytics'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 99.99,
    credits: 1000,
    monthlyMinutes: 20000,
    features: [
      'Up to 20000 minutes/month',
      'Call to 200+ countries',
      'Ultra HD call quality',
      '24/7 dedicated support',
      'Custom caller ID',
      'Credits never expire',
      'Advanced analytics',
      'API access',
      'Team management'
    ]
  }
]

export default function PackagesModal({ isOpen, onClose }: PackagesModalProps) {
  if (!isOpen) return null

  const handlePurchase = (packageName: string) => {
    // TODO: Implement payment processing
    console.log(`Purchasing ${packageName} package`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-700 max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
            <p className="text-slate-400 text-sm mt-1">Select the perfect package for your calling needs</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <FiX size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg border-2 overflow-hidden flex flex-col transition ${
                  pkg.popular
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-900/20 to-slate-900 shadow-lg shadow-cyan-500/20'
                    : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Plan Info */}
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${pkg.price}</span>
                    <span className="text-slate-400 text-sm ml-2">/month</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">
                    {pkg.credits} credits • {pkg.monthlyMinutes.toLocaleString()} min/month
                  </p>
                </div>

                {/* Features */}
                <div className="p-6 flex-1 border-b border-slate-700">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-4">Includes</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FiCheck className="text-green-400 flex-shrink-0 mt-1" size={18} />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-6">
                  <button
                    onClick={() => handlePurchase(pkg.name)}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    Get {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-slate-800/40 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-white mb-3">Billing Information</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• All plans include HD voice quality and crystal-clear audio</li>
              <li>• Credits never expire and can be used for any international calls</li>
              <li>• Cancel your subscription anytime - no long-term contracts</li>
              <li>• Additional credits available as pay-as-you-go at $0.01-$0.04 per minute</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6 bg-slate-800/30 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Questions? <span className="text-cyan-400 cursor-pointer hover:text-cyan-300">Contact support</span>
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
