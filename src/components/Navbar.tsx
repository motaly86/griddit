'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 grid grid-cols-2 grid-rows-2 gap-0.5 rounded overflow-hidden">
            <div className="bg-indigo-500" />
            <div className="bg-pink-500" />
            <div className="bg-green-500" />
            <div className="bg-amber-400" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">griddit</span>
          <span className="text-xs text-zinc-500">.tv</span>
        </Link>

        <div className="flex-1" />

        <Link
          href="/create"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Create Grid
        </Link>

        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
            )}
            <span className="text-sm text-zinc-300 hidden sm:block">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  )
}
