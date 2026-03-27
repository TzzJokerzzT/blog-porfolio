import type {
  ApiResponse,
  AuthResponse,
  LoginPayload,
  Post,
  PaginatedPosts,
  CreatePostPayload,
  UpdatePostPayload,
  GetPostsParams,
  AuthTokens,
} from "@/shared/types/api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4856";

// ── Helpers ───────────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers: optHeaders, ...restOptions } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...optHeaders,
    },
  });

  // 204 No Content — no hay body que parsear
  if (res.status === 204) {
    return undefined as T;
  }

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message ?? "Error inesperado") as Error & {
      status: number;
      errors?: { field: string; message: string }[];
    };
    error.status = res.status;
    error.errors = json.errors;
    throw error;
  }

  return json as T;
}

function withAuth(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (payload: LoginPayload) =>
    request<ApiResponse<AuthResponse>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  refresh: (refreshToken: string) =>
    request<ApiResponse<AuthTokens>>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  logout: (accessToken: string) =>
    request<ApiResponse<null>>("/api/auth/logout", {
      method: "POST",
      headers: withAuth(accessToken),
    }),
};

// ── Posts ─────────────────────────────────────────────────────────────────────

export const postsApi = {
  getAll: (params: GetPostsParams = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.category) query.set("category", params.category);
    if (params.featured !== undefined)
      query.set("featured", String(params.featured));

    const qs = query.toString();
    return request<ApiResponse<PaginatedPosts>>(
      `/api/posts${qs ? `?${qs}` : ""}`
    );
  },

  getBySlug: (slug: string) =>
    request<ApiResponse<Post>>(`/api/posts/${slug}`),

  create: (payload: CreatePostPayload, accessToken: string) =>
    request<ApiResponse<Post>>("/api/posts", {
      method: "POST",
      headers: withAuth(accessToken),
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: UpdatePostPayload, accessToken: string) =>
    request<ApiResponse<Post>>(`/api/posts/${id}`, {
      method: "PUT",
      headers: withAuth(accessToken),
      body: JSON.stringify(payload),
    }),

  delete: (id: string, accessToken: string) =>
    request<void>(`/api/posts/${id}`, {
      method: "DELETE",
      headers: withAuth(accessToken),
    }),
};
