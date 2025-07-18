"use client"

import { Suspense } from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Suspense>{children}</Suspense>
    </div>
  )
}

export default AuthLayout