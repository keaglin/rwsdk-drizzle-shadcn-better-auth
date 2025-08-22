import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Protected Page</h1>
        <p className="text-lg">
          Welcome, {ctx.user?.name || ctx.user?.email}!
        </p>
        <p className="text-muted-foreground">
          You are successfully logged in.
        </p>
        <a 
          href="/user/logout" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
}
