"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { sendContact, type ContactState } from "@/actions/contact";
import { Button } from "@/components/atoms/Button";
import type { Dil } from "@/i18n/diller";
import { yol } from "@/i18n/diller";
import { s } from "@/i18n/sozluk";

const baslangic: ContactState = { ok: false, message: "" };

/**
 * Alan kenarlığı için ayrı `--field-border` kullanılır: hem `border` hem
 * `border-strong` tonu 3:1'in altında kalıyordu ve alanlar görünmüyordu
 * (WCAG 1.4.11 arayüz bileşeni sınırı). Yer tutucu da `ink-soft` —
 * önceki `ink-muted/70` beyaz üzerinde 2.74:1'di.
 */
const alanSinifi =
  "w-full rounded-(--radius) border border-field-border bg-surface px-3.5 py-3 text-base " +
  "text-ink placeholder:text-ink-soft transition-colors duration-200 " +
  "focus:border-accent";

export function ContactForm({ dil }: { dil: Dil }) {
  const [state, formAction, pending] = useActionState(sendContact, baslangic);
  const t = s(dil).form;

  useEffect(() => {
    if (!state.message) return;
    if (state.ok) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  // Gönderim başarısız olursa kullanıcının yazdıkları kaybolmasın:
  // sunucudan dönen değerler alanlara geri yazılır.
  const g = state.gonderilen;

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Sunucu tarafı hata mesajları ziyaretçinin dilinde dönsün */}
      <input type="hidden" name="dil" value={dil} />
      {/* Honeypot — ekranda görünmez, ekran okuyucudan da gizli */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="ad" className="mb-1.5 block text-sm font-medium">
          {t.ad} <span className="text-danger">*</span>
        </label>
        <input
          id="ad"
          name="ad"
          required
          autoComplete="name"
          defaultValue={g?.ad}
          className={alanSinifi}
          aria-invalid={Boolean(state.errors?.ad)}
          aria-describedby={state.errors?.ad ? "ad-hata" : undefined}
        />
        {state.errors?.ad && (
          <p id="ad-hata" className="mt-1.5 text-sm text-danger">
            {state.errors.ad}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telefon" className="mb-1.5 block text-sm font-medium">
          {t.telefon} <span className="text-danger">*</span>
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.telefonOrnek}
          defaultValue={g?.telefon}
          className={alanSinifi}
          aria-invalid={Boolean(state.errors?.telefon)}
          aria-describedby={state.errors?.telefon ? "telefon-hata" : undefined}
        />
        {state.errors?.telefon && (
          <p id="telefon-hata" className="mt-1.5 text-sm text-danger">
            {state.errors.telefon}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="eposta" className="mb-1.5 block text-sm font-medium">
          {t.eposta}{" "}
          <span className="font-normal text-ink-muted">{t.epostaIstege}</span>
        </label>
        <input
          id="eposta"
          name="eposta"
          type="email"
          autoComplete="email"
          defaultValue={g?.eposta}
          className={alanSinifi}
        />
      </div>

      <div>
        <label htmlFor="mesaj" className="mb-1.5 block text-sm font-medium">
          {t.mesaj} <span className="text-danger">*</span>
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={5}
          placeholder={t.mesajOrnek}
          defaultValue={g?.mesaj}
          className={alanSinifi + " resize-y"}
          aria-invalid={Boolean(state.errors?.mesaj)}
          aria-describedby={state.errors?.mesaj ? "mesaj-hata" : undefined}
        />
        {state.errors?.mesaj && (
          <p id="mesaj-hata" className="mt-1.5 text-sm text-danger">
            {state.errors.mesaj}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={pending}
        className="w-full"
      >
        <Send className="size-4" aria-hidden />
        {pending ? t.gonderiliyor : t.gonder}
      </Button>

      <p className="text-xs text-ink-muted">
        {t.kvkkOnce}{" "}
        <Link
          href={yol("gizlilik", dil)}
          className="underline decoration-border-strong underline-offset-2 hover:text-accent hover:decoration-accent"
        >
          {t.kvkkLink}
        </Link>
        .
      </p>
    </form>
  );
}
