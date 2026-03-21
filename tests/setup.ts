import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Supabase so questions.ts can be imported without env vars
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            eq: () => ({
              order: () => Promise.resolve({ data: [], error: null }),
            }),
          }),
        }),
      }),
    }),
  },
}));
