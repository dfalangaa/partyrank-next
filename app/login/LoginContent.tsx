"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertCircle, Sparkles, Check } from "lucide-react";
import { setUser } from "@/lib/auth";

type Mode = "entrar" | "cadastrar";

type FieldErrors = Partial<Record<"name" | "email" | "password" | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode: Mode, form: { name: string; email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {};

  if (mode === "cadastrar") {
    if (!form.name.trim()) errors.name = "informa seu nome";
    else if (form.name.trim().length < 2) errors.name = "nome curto demais";
  }

  if (!form.email.trim()) errors.email = "informa o email";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = "email inválido";

  if (!form.password) errors.password = "informa a senha";
  else if (form.password.length < 6) errors.password = "senha precisa ter ao menos 6 caracteres";

  return errors;
}

export default function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const initialMode: Mode = params.get("mode") === "cadastrar" ? "cadastrar" : "entrar";
  const initialPlan = params.get("plan");
  const intent = params.get("intent"); // "claim" | "solo" | "official" | "browse"
  const intentMakesOrganizer = intent === "claim" || intent === "solo";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
    course: "",
  });

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // limpa erros ao trocar de modo
  useEffect(() => {
    setErrors({});
  }, [mode]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FieldErrors];
        delete next.form;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(mode, form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      // simulated delay
      await new Promise((r) => setTimeout(r, 700));
      setUser({
        name: form.name || form.email.split("@")[0],
        email: form.email.trim(),
        university: form.university,
        course: form.course,
        isPro: false,
        isOrganizer: intentMakesOrganizer,
        joinedAt: new Date().toISOString(),
      });
      setSuccess(true);
      // hard reload garante que toda UI dependente de auth (navbar etc) sincronize
      const redirectTo = intentMakesOrganizer ? "/gerenciar" : "/";
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 900);
    } catch {
      setErrors({ form: "algo deu errado. tenta de novo em instantes." });
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setErrors({});
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setUser({
        name: "Davi Falanga",
        email: "davi@partyrank.com",
        university: "USP",
        course: "Engenharia",
        isPro: false,
        isOrganizer: intentMakesOrganizer,
        joinedAt: new Date().toISOString(),
      });
      setSuccess(true);
      const redirectTo = intentMakesOrganizer ? "/gerenciar" : "/";
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 900);
    } catch {
      setErrors({ form: "falha no login com google. tenta de novo." });
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Bg image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: brand */}
        <div className="relative hidden flex-col justify-between p-10 lg:flex lg:p-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> voltar pro site
          </Link>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-violet-400" />
              gratuito pra sempre
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4 max-w-md text-balance leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              a festa{" "}
              <span className="font-serif italic font-normal gradient-text">
                certa
              </span>{" "}
              pra sua faculdade
            </motion.h1>
            <p className="max-w-md text-white/60">
              entra com o google em 2 segundos e descobre onde tá rolando o
              melhor da semana.
            </p>
          </div>
          <div className="flex gap-8 text-xs text-white/50">
            <div>
              <div className="mb-0.5 text-2xl font-semibold text-white">500+</div>
              festas
            </div>
            <div>
              <div className="mb-0.5 text-2xl font-semibold text-white">12k</div>
              estudantes
            </div>
            <div>
              <div className="mb-0.5 text-2xl font-semibold text-white">50+</div>
              universidades
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-background/80 p-7 backdrop-blur-2xl md:p-9"
          >
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-white lg:hidden"
            >
              <ArrowLeft className="h-3 w-3" /> voltar
            </Link>

            {/* Toggle entrar / cadastrar */}
            <div className="mb-6 flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(["entrar", "cadastrar"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-full py-2 text-sm font-medium capitalize transition-all ${
                    mode === m
                      ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {initialPlan === "pro" && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    cadastre primeiro · ative PRO depois
                  </div>
                )}
                {intent === "claim" && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cyan-300">
                    <Sparkles className="h-3 w-3" />
                    cadastro como organizador (verificada)
                  </div>
                )}
                {intent === "solo" && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-rose-300">
                    <Sparkles className="h-3 w-3" />
                    cadastro como organizador (solo)
                  </div>
                )}
                <h2 className="mb-1 text-3xl font-medium tracking-[-0.02em]">
                  {mode === "entrar" ? "entre na festa" : "crie sua conta"}
                </h2>
                <p className="mb-6 text-sm text-white/55">
                  {mode === "entrar"
                    ? "um clique e você tá dentro. sem enrolação."
                    : "leva 30 segundos. depois é só votar e curtir."}
                </p>
              </motion.div>
            </AnimatePresence>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="h-6 w-6 text-emerald-300" />
                </div>
                <h3 className="mb-1 text-lg font-medium">tudo certo!</h3>
                <p className="text-sm text-white/60">
                  redirecionando pro app...
                </p>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={handleGoogle}
                  disabled={submitting}
                  className="group mb-4 flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-50"
                >
                  <GoogleIcon className="h-5 w-5" />
                  {mode === "entrar" ? "entrar" : "continuar"} com google
                </button>

                <div className="my-5 flex items-center gap-3 text-xs text-white/40">
                  <div className="h-px flex-1 bg-white/10" />
                  <span>ou {mode === "entrar" ? "com email" : "preencha"}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <AnimatePresence>
                    {mode === "cadastrar" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <Input
                          label="nome completo"
                          value={form.name}
                          onChange={(v) => updateField("name", v)}
                          placeholder="seu nome"
                          error={errors.name}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Input
                    label="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                    placeholder="seu@email.com"
                    error={errors.email}
                  />
                  <Input
                    label="senha"
                    type="password"
                    value={form.password}
                    onChange={(v) => updateField("password", v)}
                    placeholder="ao menos 6 caracteres"
                    error={errors.password}
                  />

                  <AnimatePresence>
                    {mode === "cadastrar" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-3 overflow-hidden sm:grid-cols-2"
                      >
                        <Input
                          label="faculdade (opcional)"
                          value={form.university}
                          onChange={(v) => updateField("university", v)}
                          placeholder="USP, Insper..."
                        />
                        <Input
                          label="curso (opcional)"
                          value={form.course}
                          onChange={(v) => updateField("course", v)}
                          placeholder="Engenharia, Direito..."
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errors.form && (
                    <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-200">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-3 w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-3.5 text-sm font-medium shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {submitting
                      ? "carregando..."
                      : mode === "entrar"
                      ? "entrar"
                      : "criar conta"}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs text-white/45">
                  {mode === "entrar" ? (
                    <>
                      novo aqui?{" "}
                      <button
                        onClick={() => setMode("cadastrar")}
                        className="text-white/85 underline-offset-2 hover:underline"
                      >
                        crie sua conta
                      </button>
                    </>
                  ) : (
                    <>
                      ao criar conta você concorda com os{" "}
                      <a className="text-white/70 underline-offset-2 hover:underline" href="#">
                        termos
                      </a>
                    </>
                  )}
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.15em] text-white/55">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-sm placeholder:text-white/35 transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/20"
            : "border-white/15 focus:border-violet-400/50 focus:ring-violet-500/20"
        }`}
      />
      {error && (
        <span className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-300">
          <AlertCircle className="h-3 w-3" />
          {error}
        </span>
      )}
    </label>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
