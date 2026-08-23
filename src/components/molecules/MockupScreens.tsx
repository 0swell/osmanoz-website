/**
 * Örnek işletme ekranları — kod ile çizilir, görsel dosya indirilmez.
 * Gerçek müşteri işi gibi sunulmaz; bunlar örnek çalışmadır (CLAUDE.md §4.6).
 */

type Tema = { bg: string; ink: string; accent: string; soft: string };

const temalar: Record<string, Tema> = {
  kafe: { bg: "#faf6f0", ink: "#3b2a1e", accent: "#a9683a", soft: "#f0e4d6" },
  kuafor: { bg: "#f7f4fa", ink: "#2f2436", accent: "#7c4d8f", soft: "#ebe3f1" },
  // Spor salonu — koyu ve enerjik ton; kafe/kuaförden belirgin ayrılsın.
  spor: { bg: "#f2f4f8", ink: "#1c2430", accent: "#2f5fd0", soft: "#dde5f5" },
};

/* ---------- Masaüstü ekranı ---------- */
export function EkranKafe() {
  const t = temalar.kafe;
  return <Masaustu t={t} ad="Kahve Durağı" slogan="Burdur merkezde taze kahve" menu={["Menü", "Hakkımızda", "İletişim"]} kartlar={["Filtre Kahve", "Türk Kahvesi", "Tatlılar"]} />;
}

export function EkranKuafor() {
  const t = temalar.kuafor;
  return <Masaustu t={t} ad="Studio Saç" slogan="Randevunuzu online alın" menu={["Hizmetler", "Randevu", "İletişim"]} kartlar={["Saç Kesim", "Boya", "Bakım"]} />;
}

export function EkranSpor() {
  const t = temalar.spor;
  return <Masaustu t={t} ad="Form Spor Salonu" slogan="Üyeliğini uygulamadan takip et" menu={["Üyelik", "Ders Programı", "İletişim"]} kartlar={["Aylık Üyelik", "Ders Programı", "Kalan Gün"]} />;
}

function Masaustu({
  t,
  ad,
  slogan,
  menu,
  kartlar,
}: {
  t: Tema;
  ad: string;
  slogan: string;
  menu: string[];
  kartlar: string[];
}) {
  return (
    <div
      className="flex size-full flex-col p-[3%] text-[0.5rem] leading-tight"
      style={{ background: t.bg, color: t.ink }}
    >
      {/* Üst çubuk */}
      <div className="flex items-center justify-between">
        <span className="font-semibold" style={{ fontSize: "0.62rem" }}>
          {ad}
        </span>
        <div className="flex gap-2 opacity-70">
          {menu.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="mt-[4%] flex flex-1 gap-[3%]">
        <div className="flex flex-[1.2] flex-col justify-center">
          <p className="font-semibold" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>
            {slogan}
          </p>
          <span
            className="mt-[6%] w-fit rounded px-2 py-1 font-medium"
            style={{ background: t.accent, color: "#fff", fontSize: "0.45rem" }}
          >
            WhatsApp
          </span>
        </div>
        <div
          className="flex-1 rounded"
          style={{ background: t.soft }}
          aria-hidden
        />
      </div>

      {/* Kartlar */}
      <div className="mt-[3%] grid grid-cols-3 gap-[2%]">
        {kartlar.map((k) => (
          <div
            key={k}
            className="rounded p-[6%]"
            style={{ background: "#fff", border: `1px solid ${t.soft}` }}
          >
            <div
              className="mb-1 h-3 w-full rounded"
              style={{ background: t.soft }}
              aria-hidden
            />
            <span style={{ fontSize: "0.4rem" }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Telefon ekranı ---------- */
export function TelefonKafe() {
  return <Telefon t={temalar.kafe} ad="Kahve Durağı" satirlar={["Filtre Kahve", "Latte", "Cheesecake"]} />;
}
export function TelefonKuafor() {
  return <Telefon t={temalar.kuafor} ad="Studio Saç" satirlar={["10:00 Müsait", "11:30 Dolu", "14:00 Müsait"]} />;
}
export function TelefonSpor() {
  return <Telefon t={temalar.spor} ad="Form Spor Salonu" satirlar={["Üyelik: 18 gün kaldı", "Bugün: Fonksiyonel", "Yarın: Pilates"]} />;
}

function Telefon({
  t,
  ad,
  satirlar,
}: {
  t: Tema;
  ad: string;
  satirlar: string[];
}) {
  return (
    <div
      className="flex size-full flex-col p-[7%]"
      style={{ background: t.bg, color: t.ink, fontSize: "0.38rem" }}
    >
      <span className="font-semibold" style={{ fontSize: "0.45rem" }}>
        {ad}
      </span>
      <div className="mt-[8%] space-y-[6%]">
        {satirlar.map((s) => (
          <div
            key={s}
            className="flex items-center gap-[6%] rounded p-[7%]"
            style={{ background: "#fff", border: `1px solid ${t.soft}` }}
          >
            <span
              className="size-2 shrink-0 rounded"
              style={{ background: t.soft }}
              aria-hidden
            />
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div
        className="mt-auto rounded py-[7%] text-center font-medium"
        style={{ background: t.accent, color: "#fff" }}
      >
        Ara
      </div>
    </div>
  );
}
