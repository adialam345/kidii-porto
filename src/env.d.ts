/// <reference types="astro/client" />

declare module 'tailwindcss/lib/util/flattenColorPalette' {
  const flattenColorPalette: (colors: Record<string, any>) => Record<string, string>;
  export default flattenColorPalette;
}
