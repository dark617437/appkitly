export interface ZipEntry {
  name: string;
  data: Blob;
}

/** Bundles files into a ZIP archive in the browser. PNGs are stored, not re-compressed. */
export async function createZip(entries: ZipEntry[]): Promise<Blob> {
  const { zip } = await import("fflate");
  const files: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const entry of entries) {
    files[entry.name] = [new Uint8Array(await entry.data.arrayBuffer()), { level: 0 }];
  }
  const archive = await new Promise<Uint8Array>((resolve, reject) => {
    zip(files, (error, data) => (error ? reject(error) : resolve(data)));
  });
  return new Blob([archive as Uint8Array<ArrayBuffer>], { type: "application/zip" });
}
