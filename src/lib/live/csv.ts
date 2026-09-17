/**
 * Export CSV côté client : séparateur « ; » et BOM UTF-8 pour qu'Excel (FR)
 * ouvre le fichier directement avec les accents corrects.
 */

const escapeCell = (value: unknown): string => {
  const s = value === null || value === undefined ? "" : String(value);
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers, ...rows].map((r) => r.map(escapeCell).join(";"));
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
