/**
 * İşletme yazılımı panel ekranları — kod ile çizilir, görsel dosyası indirilmez.
 * Gerçek müşteri ekranı gibi sunulmaz; örnek arayüzlerdir (CLAUDE.md §4.6).
 *
 * Renkler marka paletinden bağımsız, kendi içinde tutarlı bir "uygulama"
 * hissi verecek şekilde seçildi; sayfanın turuncusuyla yarışmaz.
 */

const P = {
  bg: "#f6f7f9",
  yuzey: "#ffffff",
  cizgi: "#e4e7ec",
  ink: "#1a1d24",
  soft: "#616874",
  mavi: "#2f5fd0",
  maviSoft: "#e6edfb",
  yesil: "#1f7a52",
  yesilSoft: "#e2f2ea",
  amber: "#a86412",
  amberSoft: "#fbf0dd",
  kirmizi: "#b3372a",
};

/* ---------------- Randevu takvimi ---------------- */
export function PanelRandevu() {
  const saatler = [
    { s: "09:00", ad: "Ayşe K.", durum: "onayli" },
    { s: "10:30", ad: "Mehmet T.", durum: "onayli" },
    { s: "11:15", ad: "", durum: "bos" },
    { s: "13:00", ad: "Zeynep A.", durum: "bekliyor" },
    { s: "14:30", ad: "", durum: "bos" },
  ];
  return (
    <PanelKabuk baslik="Randevular" altBaslik="Bugün · 3 randevu">
      <div className="flex flex-col gap-[3%]">
        {saatler.map((r) => (
          <div
            key={r.s}
            className="flex items-center gap-[3%] rounded px-[3%] py-[2.4%]"
            style={{
              background: r.durum === "bos" ? "transparent" : P.yuzey,
              border: `1px solid ${r.durum === "bos" ? P.cizgi : "transparent"}`,
              borderStyle: r.durum === "bos" ? "dashed" : "solid",
              boxShadow:
                r.durum === "bos" ? "none" : "0 1px 2px rgba(26,29,36,.06)",
            }}
          >
            <span style={{ color: P.soft, minWidth: "13%" }}>{r.s}</span>
            {r.durum === "bos" ? (
              <span style={{ color: P.soft, opacity: 0.7 }}>müsait</span>
            ) : (
              <>
                <span style={{ color: P.ink, flex: 1 }}>{r.ad}</span>
                <span
                  className="rounded-full px-[4%] py-[1%]"
                  style={{
                    background:
                      r.durum === "onayli" ? P.yesilSoft : P.amberSoft,
                    color: r.durum === "onayli" ? P.yesil : P.amber,
                    fontSize: "0.85em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.durum === "onayli" ? "onaylı" : "bekliyor"}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </PanelKabuk>
  );
}

/* ---------------- Stok listesi ---------------- */
export function PanelStok() {
  const urunler = [
    { ad: "Filtre kahve çekirdeği", adet: 24, kritik: false },
    { ad: "Süt (1 L)", adet: 6, kritik: true },
    { ad: "Karton bardak", adet: 180, kritik: false },
    { ad: "Şeker paketi", adet: 3, kritik: true },
  ];
  return (
    <PanelKabuk baslik="Stok" altBaslik="2 ürün kritik seviyede">
      <div className="flex flex-col gap-[2.5%]">
        {urunler.map((u) => (
          <div
            key={u.ad}
            className="flex items-center gap-[3%] rounded px-[3%] py-[2.4%]"
            style={{
              background: P.yuzey,
              border: `1px solid ${u.kritik ? P.amberSoft : P.cizgi}`,
            }}
          >
            <span
              className="size-[8%] shrink-0 rounded-full"
              style={{ background: u.kritik ? P.amber : P.yesil }}
              aria-hidden
            />
            <span style={{ color: P.ink, flex: 1 }}>{u.ad}</span>
            <span
              style={{
                color: u.kritik ? P.kirmizi : P.soft,
                fontWeight: u.kritik ? 600 : 400,
              }}
            >
              {u.adet}
            </span>
          </div>
        ))}
      </div>
    </PanelKabuk>
  );
}

/* ---------------- Gelir gider özeti ---------------- */
export function PanelRapor() {
  const aylar = [
    { ay: "Oca", v: 45 },
    { ay: "Şub", v: 62 },
    { ay: "Mar", v: 51 },
    { ay: "Nis", v: 78 },
    { ay: "May", v: 88 },
    { ay: "Haz", v: 71 },
  ];
  return (
    <PanelKabuk baslik="Gelir özeti" altBaslik="Son 6 ay">
      <div className="flex flex-1 items-end gap-[3.5%] pb-[3%]">
        {aylar.map((a, i) => (
          <div key={a.ay} className="flex flex-1 flex-col items-center gap-[8%]">
            <div
              className="w-full rounded-t"
              style={{
                height: `${a.v}%`,
                background: i === aylar.length - 2 ? P.mavi : P.maviSoft,
                minHeight: "6%",
              }}
              aria-hidden
            />
            <span style={{ color: P.soft }}>{a.ay}</span>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between rounded px-[3%] py-[2.4%]"
        style={{ background: P.yuzey, border: `1px solid ${P.cizgi}` }}
      >
        <span style={{ color: P.soft }}>Bu ay</span>
        <span style={{ color: P.yesil, fontWeight: 600 }}>▲ %18</span>
      </div>
    </PanelKabuk>
  );
}

/* ---------------- Ortak kabuk ---------------- */
function PanelKabuk({
  baslik,
  altBaslik,
  children,
}: {
  baslik: string;
  altBaslik: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex size-full flex-col gap-[4%] p-[5%] text-[0.52rem] leading-tight"
      style={{ background: P.bg, color: P.ink }}
    >
      <div>
        <p style={{ fontSize: "1.35em", fontWeight: 600 }}>{baslik}</p>
        <p style={{ color: P.soft }}>{altBaslik}</p>
      </div>
      {children}
    </div>
  );
}
