import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { 
  apiAuthPrefix, 
  authRoutes, 
  DEFAULT_LOGIN_REDIRECT, 
  publicRoutes 
} from "./routes"

const { auth } = NextAuth(authConfig)

// Get base path from environment or use empty string
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Middleware using Next.js 14/15 syntax
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Next.js automatically handles the basePath in middleware
  // so we can check paths without the basePath prefix
  const pathname = nextUrl.pathname
  
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = pathname + nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ))
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}