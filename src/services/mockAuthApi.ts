import { User, AuthSession, LoginFormValues, SignupFormValues, ApiResponse } from '@/types/auth';

const STORAGE_USERS_KEY = 'mock_auth_users';
const STORAGE_SESSION_KEY = 'mock_auth_session';
const NETWORK_LATENCY_MS = 800;

interface StoredUser extends User {
  passwordHash: string;
}

// Seed default demo user if empty
const SEED_USERS: StoredUser[] = [
  {
    id: 'user-seed-1',
    name: 'Demo User',
    email: 'demo@example.com',
    passwordHash: 'Password123!',
    createdAt: new Date('2025-01-01').toISOString(),
  },
];

function delay(ms: number = NETWORK_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return SEED_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users to localStorage', error);
  }
}

export const mockAuthApi = {
  async login(values: LoginFormValues): Promise<ApiResponse<AuthSession>> {
    await delay();

    const normalizedEmail = values.email.trim().toLowerCase();
    const users = getStoredUsers();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return {
        success: false,
        error: 'No account found with this email address.',
      };
    }

    if (user.passwordHash !== values.password) {
      return {
        success: false,
        error: 'Incorrect password. Please verify and try again.',
      };
    }

    const session: AuthSession = {
      token: `mock-jwt-${Math.random().toString(36).substring(2)}-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    }

    return {
      success: true,
      data: session,
    };
  },

  async signup(values: SignupFormValues): Promise<ApiResponse<AuthSession>> {
    await delay();

    const normalizedEmail = values.email.trim().toLowerCase();
    const users = getStoredUsers();

    const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email address already exists.',
      };
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: values.name.trim(),
      email: normalizedEmail,
      passwordHash: values.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveStoredUsers(users);

    const session: AuthSession = {
      token: `mock-jwt-${Math.random().toString(36).substring(2)}-${Date.now()}`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    }

    return {
      success: true,
      data: session,
    };
  },

  async getSession(): Promise<ApiResponse<AuthSession | null>> {
    await delay(300);

    if (typeof window === 'undefined') {
      return { success: true, data: null };
    }

    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) {
        return { success: true, data: null };
      }
      const session = JSON.parse(raw) as AuthSession;
      return { success: true, data: session };
    } catch {
      return { success: true, data: null };
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(300);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
    return { success: true, data: null };
  },
};
