import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="text-center">
        <div className="mb-6 text-8xl font-semibold tracking-tighter gradient-text">404</div>
        <h1 className="mb-3 text-3xl font-medium tracking-tight">
          festa não encontrada
        </h1>
        <p className="mb-8 max-w-md text-white/55">
          o link que você seguiu não existe ou a festa foi removida. que tal
          voltar pro ranking?
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">voltar pro início</Button>
        </Link>
      </div>
    </div>
  );
}
