import * as XLSX from "xlsx";
export default function toXlsx({
  fileName,
  data,
}: {
  fileName?: string;
  data: Record<string, string | number | undefined>[];
}) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  return XLSX.writeFile(workbook, `${fileName ?? "result"}.xlsx`);
}
