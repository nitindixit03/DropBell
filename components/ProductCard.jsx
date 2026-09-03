"use client";

import { deleteProduct } from "@/app/actions";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  TrendingDown,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import PriceChart from "./PriceChart";

const ProductCard = ({ product }) => {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);

    const result = await deleteProduct(product.id);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result?.message || "Product deleted successfully");
    }

    setDeleting(false);
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/25 hover:shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {product.image_url && (
            <div className="shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-20 w-20 object-contain"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="mb-3 line-clamp-2 font-semibold leading-6 text-zinc-200">
              {product.name}
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold tracking-tight text-emerald-400">
                {product.currency} {product.current_price}
              </span>

              <Badge className="gap-1.5 border border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400 hover:bg-emerald-500/[0.08]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>

                <TrendingDown className="h-3 w-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-1 h-px w-full bg-white/[0.06]" />

        <div className="flex flex-wrap gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1.5 border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.06] hover:text-emerald-400"
          >
            {showChart ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show Chart
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.06] hover:text-emerald-400"
            render={
              <Link
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <ExternalLink className="h-4 w-4" />
            View Product
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="gap-1.5 text-zinc-500 hover:bg-red-500/[0.08] hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
            {deleting ? "Removing..." : "Remove"}
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="border-t border-white/[0.06] bg-black/20 pt-5">
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
                  Price History
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Track how the product price changes over time.
                </p>
              </div>
            </div>

            <PriceChart productId={product.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;