// Minimal typings for upng-js 2.1 (the published @types target a newer API).
declare module "upng-js" {
  interface UPNG {
    /**
     * Encodes RGBA frames as PNG. `colors` = 0 is lossless; 1–256 quantizes to a palette.
     * `forbidPalette` keeps lossless output in RGB(A) even when it has ≤ 256 colors.
     */
    encode(
      frames: ArrayBuffer[],
      width: number,
      height: number,
      colors: number,
      delays?: number[],
      forbidPalette?: boolean,
    ): ArrayBuffer;
  }
  const UPNG: UPNG;
  export default UPNG;
}
