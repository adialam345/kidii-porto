import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_COgn_6fq.mjs';
export { renderers } from '../renderers.mjs';

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Panel | Portfolio CMS", "description": "Manage projects, profile, and portfolio content" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/admin-dashboard", "client:component-export": "AdminDashboard" })} </main> ` })}`;
}, "F:/Portofolio-NextJS-Acernity/src/pages/admin.astro", void 0);

const $$file = "F:/Portofolio-NextJS-Acernity/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
