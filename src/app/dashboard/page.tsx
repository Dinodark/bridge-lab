"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardPasswordModal from "@/components/dashboard/DashboardPasswordModal";

type DashboardData = {
  counts: Record<string, number>;
  topContent: { path: string; likes: number; downloads: number; copies: number; views: number; total: number }[];
  visitors: { ip: string; country: string; city: string; language: string; referrer: string; referrer_search_query: string; path: string; timestamp: string }[];
  events: { type: string; path: string; target_id: string; target_type: string; ip: string; country: string; language: string; timestamp: string }[];
};

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/analytics");
      if (res.status === 401) {
        setUnlocked(false);
        setModalOpen(true);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuthSuccess = useCallback(async () => {
    setUnlocked(true);
    setModalOpen(false);
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (unlocked) fetchData();
  }, [unlocked, fetchData]);

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
        <DashboardPasswordModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
        {!modalOpen && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded-xl font-medium"
            style={{ background: "var(--color-cta1)", color: "#fff" }}
          >
            Войти в дашборд
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <div className="content-container pt-8">
        <h1 className="text-2xl font-bold mb-6">Аналитика OneBridge</h1>

        {loading && !data && <p style={{ color: "var(--color-muted)" }}>Загрузка...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {data && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { key: "page_view", label: "Просмотры" },
                { key: "like", label: "Лайки" },
                { key: "download", label: "Скачивания" },
                { key: "copy", label: "Копирования" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="rounded-xl border p-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="text-2xl font-bold" style={{ color: "var(--color-cta1)" }}>
                    {data.counts[key] ?? 0}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Top content */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Топ контента</h2>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "var(--color-border)" }}>
                      <th className="text-left p-3">Путь / объект</th>
                      <th className="text-right p-3">Просмотры</th>
                      <th className="text-right p-3">Лайки</th>
                      <th className="text-right p-3">Скачивания</th>
                      <th className="text-right p-3">Копирования</th>
                      <th className="text-right p-3">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topContent.slice(0, 15).map((row, i) => (
                      <tr key={i} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                        <td className="p-3 font-mono text-xs">{row.path}</td>
                        <td className="p-3 text-right">{row.views}</td>
                        <td className="p-3 text-right">{row.likes}</td>
                        <td className="p-3 text-right">{row.downloads}</td>
                        <td className="p-3 text-right">{row.copies}</td>
                        <td className="p-3 text-right font-medium">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Visitors */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Посетители</h2>
              <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr style={{ background: "var(--color-border)" }}>
                      <th className="text-left p-3">IP</th>
                      <th className="text-left p-3">Страна</th>
                      <th className="text-left p-3">Город</th>
                      <th className="text-left p-3">Язык</th>
                      <th className="text-left p-3">Поисковый запрос</th>
                      <th className="text-left p-3">Путь</th>
                      <th className="text-left p-3">Время</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.visitors.slice(0, 50).map((v, i) => (
                      <tr key={i} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                        <td className="p-3 font-mono text-xs">{v.ip}</td>
                        <td className="p-3">{v.country || "—"}</td>
                        <td className="p-3">{v.city || "—"}</td>
                        <td className="p-3">{v.language || "—"}</td>
                        <td className="p-3 max-w-[120px] truncate" title={v.referrer_search_query ?? ""}>
                          {v.referrer_search_query || "—"}
                        </td>
                        <td className="p-3 font-mono text-xs max-w-[100px] truncate">{v.path}</td>
                        <td className="p-3 text-xs" style={{ color: "var(--color-muted)" }}>
                          {v.timestamp ? new Date(v.timestamp).toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recent events */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Последние события</h2>
              <div className="rounded-xl border overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr style={{ background: "var(--color-border)" }}>
                      <th className="text-left p-3">Тип</th>
                      <th className="text-left p-3">Путь</th>
                      <th className="text-left p-3">Объект</th>
                      <th className="text-left p-3">IP</th>
                      <th className="text-left p-3">Страна</th>
                      <th className="text-left p-3">Язык</th>
                      <th className="text-left p-3">Время</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.events.slice(0, 30).map((e, i) => (
                      <tr key={i} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                        <td className="p-3">
                          <span
                            className="px-2 py-0.5 rounded text-xs"
                            style={{ background: "var(--color-bg-active)", color: "var(--color-cta1)" }}
                          >
                            {e.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs">{e.path}</td>
                        <td className="p-3 text-xs">{e.target_id || e.target_type || "—"}</td>
                        <td className="p-3 font-mono text-xs">{e.ip}</td>
                        <td className="p-3">{e.country || "—"}</td>
                        <td className="p-3">{e.language || "—"}</td>
                        <td className="p-3 text-xs" style={{ color: "var(--color-muted)" }}>
                          {e.timestamp ? new Date(e.timestamp).toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
