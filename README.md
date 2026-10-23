# Next.js Custom Authentication Flow

A production-grade authentication flow implemented in Next.js using custom React hooks for state management, client-side input validation, protected routing, and simulated backend API latency.

---

## 🚀 Features

- **Custom React Hooks**:
  - `useAuth`: Global authentication session, user status (`loading` | `authenticated` | `unauthenticated`), and actions (`login`, `signup`, `logout`).
  - `useLoginForm`: Dedicated form hook encapsulating email/password state, touch tracking, client-side validation, demo autofill, and submission.
  - `useSignupForm`: Dedicated form hook managing name, email, password, and password confirmation validation.
  - `useRequireAuth`: Protected route guard hook that redirects unauthenticated visitors to `/login` with return URL handling.
- **Form Validation & UX**:
  - Real-time and on-blur field error validation.
  - Password visibility toggle.
  - Interactive loading spinners and disabled button states during API submission.
  - User-friendly error alert banners for invalid credentials or duplicate accounts.
- **Simulated Backend API (`mockAuthApi`)**:
  - Artificial network latency (800ms) with `setTimeout`.
  - Realistic success/failure responses.
  - Pre-seeded demo account (`demo@example.com` / `Password123!`).
  - Session persistence via `localStorage`.
- **Protected Routing (`ProtectedRoute`)**:
  - Unauthenticated users attempting to access `/dashboard` are automatically redirected to `/login?redirect=%2Fdashboard`.
  - Smooth loading indicators during session hydration.

---

## 🛠️ Project Structure

```text
src/
├── app/
│   ├── layout.tsx            # Global layout wrapped with AuthProvider
│   ├── globals.css           # Clean, minimalist design tokens & styles (light/dark theme)
│   ├── page.tsx              # Public home page
│   ├── login/page.tsx        # Login page (pure UI consuming useLoginForm)
│   ├── signup/page.tsx       # Signup page (pure UI consuming useSignupForm)
│   └── dashboard/page.tsx    # Protected route with user details & logout
├── components/
│   ├── Alert.tsx             # Error and success alert component
│   ├── Button.tsx            # Loading-capable button component
│   ├── FormInput.tsx         # Accessible input with error states
│   ├── Navbar.tsx            # Header showing session status, actions & theme toggle
│   └── ProtectedRoute.tsx    # Route guard wrapper
├── context/
│   └── AuthContext.tsx       # React Context holding global session
├── hooks/
│   ├── useAuth.ts            # Primary authentication hook
│   ├── useLoginForm.ts       # Login form state and validation logic
│   ├── useSignupForm.ts      # Registration form state and validation logic
│   └── useRequireAuth.ts     # Protected route redirection hook
├── services/
│   └── mockAuthApi.ts        # Simulated backend service
└── types/
    └── auth.ts               # TypeScript types and interfaces
```

---

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔑 Demo Credentials

| Email | Password |
|---|---|
| `demo@example.com` | `Password123!` |

*(You can also click the **"Auto-fill"** demo button on the login page)*
