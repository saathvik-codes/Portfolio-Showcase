export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-paper px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display text-5xl text-ink">This page took a wrong turn.</h1>
        <p className="mt-5 text-muted">The walkthrough starts on the home page.</p>
        <a href="/" className="mt-8 inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper hover:bg-accent">Back to the start</a>
      </div>
    </main>
  );
}
