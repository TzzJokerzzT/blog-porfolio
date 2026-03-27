// Tipos alineados con las entidades del backend (blog-api)

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

// ── Posts ────────────────────────────────────────────────────────────────────

export interface PostAuthor {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
  author: string | PostAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPosts {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreatePostPayload {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

export interface UpdatePostPayload {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}

// ── API Response wrapper ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: { field: string; message: string }[];
}
