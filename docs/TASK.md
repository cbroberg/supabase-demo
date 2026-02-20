● Build a NextJS demo app that connects to a local Supabase instance simulating a real hosted setup.                 
                                                                                                                   
  ## Context                                                                                                         
                                                            
  - Supabase runs on a separate Ubuntu machine, exposed via Caddy at `http://supabase.db`                            
  - This simulates how you'd normally connect to `https://yourproject.supabase.co`                                   
  - An MCP server is configured at `http://supabase.db/mcp` — use it to inspect the database schema and run
  migrations

  ## Stack

  - Next.js (App Router, TypeScript)
  - Tailwind CSS
  - @supabase/supabase-js + @supabase/ssr for auth

  ## Environment

  `.env.local` has already been created with:
  NEXT_PUBLIC_SUPABASE_URL=http://supabase.db
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from supabase status on Ubuntu>

  ## What to build

  1. `/signup` — email + password signup form using Supabase auth (let's try but i do not think this can work on a local version)
  2. `/login` — email + password login form
  3. `/` — protected page, redirects to `/login` if not authenticated, shows "Hello World, [user email]" if logged
  in, with a logout button

  ## Requirements

  - Use server-side session handling via `@supabase/ssr` (SSR cookies, not client-side localStorage)
  - Middleware to protect the `/` route
  - Keep it simple — no UI library, plain Tailwind is fine
  - Use the MCP server to verify auth schema and run any needed migrations
