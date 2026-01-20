'use client'

import { FiX, FiMail } from 'react-icons/fi'
import { FaGoogle, FaTwitter } from 'react-icons/fa'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  if (!isOpen) return null

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google Sign In clicked')
  }

  const handleTwitterSignIn = () => {
    // TODO: Implement Twitter OAuth
    console.log('Twitter Sign In clicked')
  }

  const handleEmailSignIn = () => {
    // TODO: Implement Email Sign In
    console.log('Email Sign In clicked')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-700 max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <FiX size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-300 text-center mb-6">
            Sign in to your WebbCall account to make international calls
          </p>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition border border-slate-300"
          >
            <FaGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          {/* Twitter Sign In */}
          <button
            onClick={handleTwitterSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            <FaTwitter size={20} />
            <span>Continue with Twitter</span>
          </button>

          {/* Email Sign In */}
          <button
            onClick={handleEmailSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition border border-slate-600"
          >
            <FiMail size={20} />
            <span>Sign in with Email</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <button className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign up for free
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6 bg-slate-800/30">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
