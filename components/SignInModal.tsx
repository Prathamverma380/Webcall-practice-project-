'use client'

import { useState } from 'react'
import { FiX, FiMail, FiArrowLeft } from 'react-icons/fi'
import { FaGoogle, FaTwitter } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  if (!isOpen) return null

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Google sign in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleTwitterSignIn = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Twitter sign in failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignIn = () => {
    setShowEmailForm(true)
    setMessage(null)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      if (error) throw error
      setMessage({ type: 'success', text: 'Check your email for the magic link!' })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to send magic link' })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setShowEmailForm(false)
    setEmail('')
    setMessage(null)
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
          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              {message.text}
            </div>
          )}

          {!showEmailForm ? (
            <>
              <p className="text-slate-300 text-center mb-6">
                Sign in to your WebbCall account to make international calls
              </p>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-medium transition border border-slate-300 disabled:opacity-50"
              >
                <FaGoogle size={20} />
                <span>{loading ? 'Connecting...' : 'Continue with Google'}</span>
              </button>

              {/* Twitter Sign In */}
              <button
                onClick={handleTwitterSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition disabled:opacity-50"
              >
                <FaTwitter size={20} />
                <span>{loading ? 'Connecting...' : 'Continue with Twitter'}</span>
              </button>

              {/* Email Sign In */}
              <button
                onClick={handleEmailSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition border border-slate-600 disabled:opacity-50"
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

              {/* Info Text */}
              <p className="text-center text-sm text-slate-400">
                No account needed - just sign in with any method above
              </p>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={resetForm}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-4"
              >
                <FiArrowLeft size={18} />
                <span>Back to options</span>
              </button>

              <h3 className="text-lg font-semibold text-white mb-2">
                Sign in with Email
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                We'll send you a magic link to sign in instantly
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>

              <p className="text-center text-sm text-slate-400 mt-4">
                No password needed - check your inbox for the link
              </p>
            </>
          )}
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
