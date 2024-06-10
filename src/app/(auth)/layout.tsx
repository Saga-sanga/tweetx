export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[url('/signup_graphic.png')] min-h-screen bg-scroll bg-contain bg-no-repeat bg-right">
      <div className="container">
        <nav className="py-7">
          <p className="text-primary font-medium text-3xl">TweetX</p>
        </nav>
        <article className="max-w-sm">{children}</article>
      </div>
    </main>
  );
}
