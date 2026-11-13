"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type EmailCtx = {
  email: string;
  setEmail: (v: string) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  goToForm: () => void;
};

const Ctx = createContext<EmailCtx | null>(null);

/** Shares the email typed in the hero with the full waitlist form. */
export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const goToForm = useCallback(() => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>("#wl-email")
        ?.focus({ preventScroll: true });
    }, 700);
  }, []);

  return (
    <Ctx.Provider value={{ email, setEmail, formRef, goToForm }}>
      {children}
    </Ctx.Provider>
  );
}

export function useEmail() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEmail must be used inside <EmailProvider>");
  return ctx;
}
