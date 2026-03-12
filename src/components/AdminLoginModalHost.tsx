"use client";

import { useCallback } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLoginModal from "./AdminLoginModal";

/** Renders AdminLoginModal inside LanguageProvider so useLanguage() works. */
export default function AdminLoginModalHost() {
  const { adminLoginOpen, setAdminLoginOpen, refresh } = useAdmin();

  const handleSuccess = useCallback(() => {
    setAdminLoginOpen(false);
    refresh();
  }, [setAdminLoginOpen, refresh]);

  return (
    <AdminLoginModal
      open={adminLoginOpen}
      onClose={() => setAdminLoginOpen(false)}
      onSuccess={handleSuccess}
    />
  );
}
