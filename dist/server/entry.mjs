import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DjoCj8lf.mjs';
import { manifest } from './manifest_9D3ZxCQo.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/profile.astro.mjs');
const _page3 = () => import('./pages/api/projects.astro.mjs');
const _page4 = () => import('./pages/api/reset.astro.mjs');
const _page5 = () => import('./pages/api/upload.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/profile.ts", _page2],
    ["src/pages/api/projects.ts", _page3],
    ["src/pages/api/reset.ts", _page4],
    ["src/pages/api/upload.ts", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///F:/Portofolio-NextJS-Acernity/dist/client/",
    "server": "file:///F:/Portofolio-NextJS-Acernity/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
