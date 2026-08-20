import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_DWnod6f9.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_AVDWTY-5.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///F:/Portofolio-NextJS-Acernity/","cacheDir":"file:///F:/Portofolio-NextJS-Acernity/node_modules/.astro/","outDir":"file:///F:/Portofolio-NextJS-Acernity/dist/","srcDir":"file:///F:/Portofolio-NextJS-Acernity/src/","publicDir":"file:///F:/Portofolio-NextJS-Acernity/public/","buildClientDir":"file:///F:/Portofolio-NextJS-Acernity/dist/client/","buildServerDir":"file:///F:/Portofolio-NextJS-Acernity/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DY38K5cH.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/profile","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/profile\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/profile.ts","pathname":"/api/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/projects","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/projects\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/projects.ts","pathname":"/api/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/reset","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/reset\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"reset","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/reset.ts","pathname":"/api/reset","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.ts","pathname":"/api/upload","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.DY38K5cH.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["F:/Portofolio-NextJS-Acernity/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["F:/Portofolio-NextJS-Acernity/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/profile@_@ts":"pages/api/profile.astro.mjs","\u0000@astro-page:src/pages/api/projects@_@ts":"pages/api/projects.astro.mjs","\u0000@astro-page:src/pages/api/reset@_@ts":"pages/api/reset.astro.mjs","\u0000@astro-page:src/pages/api/upload@_@ts":"pages/api/upload.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_9D3ZxCQo.mjs","F:/Portofolio-NextJS-Acernity/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DZhS6_G8.mjs","F:/Portofolio-NextJS-Acernity/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","F:/Portofolio-NextJS-Acernity/src/components/about":"_astro/about.DvMw70lk.js","F:/Portofolio-NextJS-Acernity/src/components/admin-dashboard":"_astro/admin-dashboard.BIW5KLy5.js","F:/Portofolio-NextJS-Acernity/src/components/contact":"_astro/contact.BWW7ix_M.js","F:/Portofolio-NextJS-Acernity/src/components/dock":"_astro/dock.LZb3S0-a.js","F:/Portofolio-NextJS-Acernity/src/components/footer":"_astro/footer.Bq_kCuNf.js","F:/Portofolio-NextJS-Acernity/src/components/index":"_astro/index.BLMrNFNR.js","F:/Portofolio-NextJS-Acernity/src/components/nav":"_astro/nav.C5Ti67o4.js","F:/Portofolio-NextJS-Acernity/src/components/particles":"_astro/particles.bQnfth4A.js","F:/Portofolio-NextJS-Acernity/src/components/projects":"_astro/projects.DGWi-kp0.js","F:/Portofolio-NextJS-Acernity/src/components/recent-project":"_astro/recent-project.DkRJ9JIY.js","F:/Portofolio-NextJS-Acernity/src/components/smooth-scroll":"_astro/smooth-scroll.CCsVr2Sa.js","@astrojs/react/client.js":"_astro/client.ziLa1EaD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/admin.DY38K5cH.css","/abaoutvirgi.png","/absensi.png","/apkgudang.png","/CV_Adi_Alam_Sami_Aji_1.pdf","/image.jpg","/iotlampu.png","/laundry.png","/ponpes.png","/profile.jpg","/sensoriot.png","/_astro/about.DvMw70lk.js","/_astro/admin-dashboard.BIW5KLy5.js","/_astro/client.ziLa1EaD.js","/_astro/contact.BWW7ix_M.js","/_astro/createLucideIcon.DdIBJXgU.js","/_astro/dock.LZb3S0-a.js","/_astro/footer.Bq_kCuNf.js","/_astro/index.AaUKDBlf.js","/_astro/index.Be8-SsDq.js","/_astro/index.BLMrNFNR.js","/_astro/index.D2DkWEZf.js","/_astro/index.DbZdu7Ib.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/nav.C5Ti67o4.js","/_astro/particles.bQnfth4A.js","/_astro/portfolio-store.5-laVujQ.js","/_astro/projects.DGWi-kp0.js","/_astro/proxy.DUU0Vy54.js","/_astro/recent-project.DkRJ9JIY.js","/_astro/smooth-scroll.CCsVr2Sa.js","/_astro/tooltip.CIbp7-h0.js","/_astro/utils.Dmw8z0uq.js","/_astro/utils.z_6t8hgT.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"JshFUgjO1cfuS/L2tJDckLCxzv9hs3+0LFAWvu3CakQ=","sessionConfig":{"driver":"fs-lite","options":{"base":"F:\\Portofolio-NextJS-Acernity\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
