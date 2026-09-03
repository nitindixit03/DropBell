import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Bell, LogIn, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Drop BELL extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/Drop-Bell.png"
              alt="DropBell logo"
              width={600}
              height={300}
              className="h-10 w-auto scale-180"
            />
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-20 py-20">
        {/* subtle glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-sm font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Made with ❤️ by Nitin Dixit!
          </div>

          <h2 className="mb-4 text-5xl font-bold tracking-tight text-white">
            Never Miss a <span className="text-emerald-400">Price Drop</span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-500">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>

          {/* SAME FORM */}
          <AddProductForm user={user} />

          {/* SAME CONDITION */}
          {products.length === 0 && (
            <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group rounded-xl border border-white/10 bg-[#0c0c0c] p-6 transition duration-300 hover:border-emerald-500/30 hover:bg-[#101010]"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-6 w-6 text-zinc-500 transition group-hover:text-emerald-400" />
                  </div>

                  <h3 className="mb-2 font-semibold text-zinc-200">{title}</h3>

                  <p className="text-sm text-zinc-500">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tracked Products - SAME FUNCTIONALITY */}
      {user && products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
                Live Monitoring
              </p>

              <h3 className="text-2xl font-bold text-white">
                Your Tracked Products
              </h3>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-500">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* SAME PRODUCTCARD - graph stays */}
          <div className="grid items-start gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State - SAME CONDITION */}
      {user && products.length === 0 && (
        <section className="mx-auto max-w-2xl px-4 pb-20 text-center">
          <div className="rounded-xl border-2 border-dashed border-white/10 bg-[#0c0c0c] p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <TrendingDown className="h-8 w-8 text-emerald-400" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">
              No products yet
            </h3>

            <p className="text-zinc-500">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
