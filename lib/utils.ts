export function FormatTanggalLokal(tanggalUTC: Date | string) {
  const dateObj = new Date(tanggalUTC);

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(dateObj);
}
