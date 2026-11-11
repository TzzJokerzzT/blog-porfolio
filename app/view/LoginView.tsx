import { Login } from "@/features/Login/Login";

export function LoginView() {
  return (
    <div className="page-shell py-16">
      <header className="enter">
        <h1 className="font-serif text-[clamp(2rem,5vw,2.6rem)] font-medium leading-tight tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="mt-3 max-w-[58ch] text-foreground-secondary">
          Sign in to write, edit, and publish posts.
        </p>
      </header>

      <div className="mt-10 max-w-sm">
        <Login />
      </div>
    </div>
  );
}
