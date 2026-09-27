/**
 * Runs before first paint to apply the saved (or system) theme, so pages never
 * flash the wrong colors. Keep in sync with ThemeToggle's storage key.
 */
const script = `(function(){try{var k="theme",d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");var a=function(){var s=localStorage.getItem(k);d.classList.toggle("dark",s?s==="dark":m.matches)};a();m.addEventListener("change",function(){if(!localStorage.getItem(k))a()})}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
