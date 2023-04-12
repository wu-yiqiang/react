// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iIqsn":[function(require,module,exports) {
var o = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/atlas/react/extension-qiniu-pic/src/background.ts",
    "bundleId": "a20dd8eef44a92a3",
    "envHash": "210281caf8d4160d",
    "verbose": "false",
    "secure": false,
    "serverPort": 62330
};
module.bundle.HMR_BUNDLE_ID = o.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: o.verbose
    }
};
var T = module.bundle.Module;
function k(e) {
    T.call(this, e), this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData = void 0;
}
module.bundle.Module = k;
var n = globalThis.chrome || globalThis.browser || null;
async function g(e = !1) {
    e && n.runtime.sendMessage({
        __plasmo_full_reload__: !0
    }), globalThis.location !== void 0 && "reload" in globalThis.location && globalThis.location.reload();
}
function f() {
    return o.host || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function h() {
    return o.port || location.port;
}
var u = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var y = typeof globalThis.process < "u" ? globalThis.process.env : {};
var H = new Set(u), b = (e)=>H.has(e), N = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, s])=>(e[t] = s, e), {});
var A = b("--dry-run"), C = b("--verbose") || y.VERBOSE === "true";
var _ = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), R = (...e)=>_("\uD83D\uDD35 INFO", ...e), d = (...e)=>_("\uD83D\uDFE0 WARN", ...e);
function v(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function E(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = f(), s = h(), i = o.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws";
    n?.runtime?.lastError && location.reload();
    let l = `${i}://${t}`, c = new WebSocket(`${l}:${s}/`), m = new WebSocket(`${l}:${Number(s) + 1}/`);
    m.onmessage = async function(p) {
        if (JSON.parse(p.data).type === "build_ready") {
            await e?.([], !0);
            return;
        }
    }, m.onerror = v, c.onmessage = async function(p) {
        let a = JSON.parse(p.data);
        if (a.type === "update" && (a.assets.some((r)=>r.type === "json") ? await g(!0) : typeof e == "function" && await e(a.assets)), a.type === "error") for (let r of a.diagnostics.ansi){
            let w = r.codeframe ? r.codeframe : r.stack;
            d("[plasmo/parcel-runtime]: " + r.message + `
` + w + `

` + r.hints.join(`
`));
        }
    }, c.onerror = v, c.onopen = function() {
        R(`[plasmo/parcel-runtime]: Connected to HMR server for ${o.entryFilePath}`);
    }, c.onclose = function() {
        d(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${o.entryFilePath}`);
    };
}
var M = module.bundle.parent;
(!M || !M.isParcelRequire) && E();
async function L(e) {
    return e.__plasmo_full_reload__ && n.runtime.reload(), !0;
}
n.runtime.onMessage.addListener(L);
n.runtime.onConnect.addListener(function(e) {
    e.name.startsWith("__plasmo_runtime_") && e.onMessage.addListener(L);
});
if (n.runtime.getManifest().manifest_version === 3) {
    let e = n.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    addEventListener("fetch", function(t) {
        let s = t.request.url;
        if (s.startsWith(e)) {
            let i = new URL(decodeURIComponent(s.slice(e.length)));
            i.hostname === o.host && i.port === `${o.port}` ? t.respondWith(fetch(i).then((l)=>new Response(l.body, {
                    headers: {
                        "Content-Type": l.headers.get("Content-Type")
                    }
                }))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}

},{}],"cOfSa":[function(require,module,exports) {

},{}]},["iIqsn","cOfSa"], "cOfSa", "parcelRequire7eee")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksSUFBRTtJQUFDLG1CQUFrQixLQUFLO0lBQUMsZ0JBQWUsSUFBSTtJQUFDLFdBQVUsS0FBSztJQUFDLFFBQU87SUFBWSxRQUFPO0lBQUssaUJBQWdCO0lBQTJELFlBQVc7SUFBbUIsV0FBVTtJQUFtQixXQUFVO0lBQVEsVUFBUyxLQUFLO0lBQUMsY0FBYTtBQUFLO0FBQUUsT0FBTyxNQUFNLENBQUMsYUFBYSxHQUFDLEVBQUUsUUFBUTtBQUFDLFdBQVcsT0FBTyxHQUFDO0lBQUMsTUFBSyxFQUFFO0lBQUMsS0FBSTtRQUFDLFNBQVEsRUFBRSxPQUFPO0lBQUE7QUFBQztBQUFFLElBQUksSUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQztJQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFHLElBQUksQ0FBQyxHQUFHLEdBQUM7UUFBQyxNQUFLLE9BQU8sTUFBTSxDQUFDLE9BQU87UUFBQyxrQkFBaUIsRUFBRTtRQUFDLG1CQUFrQixFQUFFO1FBQUMsUUFBTyxTQUFTLENBQUMsRUFBQztZQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBRyxXQUFVLENBQUM7UUFBRTtRQUFFLFNBQVEsU0FBUyxDQUFDLEVBQUM7WUFBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQUU7SUFBQyxHQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7QUFBQTtBQUFDLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBQztBQUFFLElBQUksSUFBRSxXQUFXLE1BQU0sSUFBRSxXQUFXLE9BQU8sSUFBRSxJQUFJO0FBQUMsZUFBZSxFQUFFLElBQUUsQ0FBQyxDQUFDLEVBQUM7SUFBQyxLQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUFDLHdCQUF1QixDQUFDO0lBQUMsSUFBRyxXQUFXLFFBQVEsS0FBRyxLQUFLLEtBQUcsWUFBVyxXQUFXLFFBQVEsSUFBRSxXQUFXLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFBQTtBQUFDLFNBQVMsSUFBRztJQUFDLE9BQU8sRUFBRSxJQUFJLElBQUcsQ0FBQSxTQUFTLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBVSxJQUFFLFNBQVMsUUFBUSxHQUFDLFdBQVcsQUFBRDtBQUFFO0FBQUMsU0FBUyxJQUFHO0lBQUMsT0FBTyxFQUFFLElBQUksSUFBRSxTQUFTLElBQUk7QUFBQTtBQUFDLElBQUksSUFBRSxPQUFPLFdBQVcsT0FBTyxHQUFDLE1BQUksV0FBVyxPQUFPLENBQUMsSUFBSSxHQUFDLEVBQUU7QUFBQyxJQUFJLElBQUUsT0FBTyxXQUFXLE9BQU8sR0FBQyxNQUFJLFdBQVcsT0FBTyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUM7QUFBQyxJQUFJLElBQUUsSUFBSSxJQUFJLElBQUcsSUFBRSxDQUFBLElBQUcsRUFBRSxHQUFHLENBQUMsSUFBRyxJQUFFLEVBQUUsTUFBTSxDQUFDLENBQUEsSUFBRyxFQUFFLFVBQVUsQ0FBQyxTQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsSUFBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBSSxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUMsR0FBRSxDQUFDLEFBQUQsR0FBRyxDQUFDO0FBQUcsSUFBSSxJQUFFLEVBQUUsY0FBYSxJQUFFLEVBQUUsZ0JBQWMsRUFBRSxPQUFPLEtBQUc7QUFBTyxJQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFHLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBRyxRQUFPO0FBQUcsSUFBSSxJQUFFLENBQUMsR0FBRyxJQUFJLFFBQVEsS0FBSyxDQUFDLHFCQUFrQixNQUFNLENBQUMsSUFBRyxRQUFPLElBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLHdCQUFvQixJQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSx3QkFBb0I7QUFBRyxTQUFTLEVBQUUsQ0FBQyxFQUFDO0lBQUMsT0FBTyxFQUFFLE9BQU8sSUFBRSxZQUFVLEVBQUUsOEJBQTRCLEVBQUUsT0FBTztBQUFDO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQztJQUFDLElBQUcsT0FBTyxXQUFXLFNBQVMsR0FBQyxLQUFJO0lBQU8sSUFBSSxJQUFFLEtBQUksSUFBRSxLQUFJLElBQUUsRUFBRSxNQUFNLElBQUUsU0FBUyxRQUFRLEtBQUcsWUFBVSxDQUFDLDhCQUE4QixJQUFJLENBQUMsS0FBRyxRQUFNLElBQUk7SUFBQyxHQUFHLFNBQVMsYUFBVyxTQUFTLE1BQU07SUFBRyxJQUFJLElBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFDLElBQUUsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFFLElBQUUsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEtBQUcsRUFBRSxDQUFDLENBQUM7SUFBRSxFQUFFLFNBQVMsR0FBQyxlQUFlLENBQUMsRUFBQztRQUFDLElBQUcsS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxLQUFHLGVBQWM7WUFBQyxNQUFNLElBQUksRUFBRSxFQUFDLENBQUM7WUFBRztRQUFNLENBQUM7SUFBQSxHQUFFLEVBQUUsT0FBTyxHQUFDLEdBQUUsRUFBRSxTQUFTLEdBQUMsZUFBZSxDQUFDLEVBQUM7UUFBQyxJQUFJLElBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxJQUFJO1FBQUUsSUFBRyxFQUFFLElBQUksS0FBRyxZQUFXLENBQUEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsSUFBRyxFQUFFLElBQUksS0FBRyxVQUFRLE1BQU0sRUFBRSxDQUFDLEtBQUcsT0FBTyxLQUFHLGNBQVksTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLEFBQUQsR0FBRyxFQUFFLElBQUksS0FBRyxPQUFPLEVBQUMsS0FBSSxJQUFJLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQUMsSUFBSSxJQUFFLEVBQUUsU0FBUyxHQUFDLEVBQUUsU0FBUyxHQUFDLEVBQUUsS0FBSztZQUFDLEVBQUUsOEJBQTRCLEVBQUUsT0FBTyxHQUFDLENBQUM7QUFDMXhFLENBQUMsR0FBQyxJQUFFLENBQUM7O0FBRUwsQ0FBQyxHQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hCLENBQUM7UUFBRTtJQUFDLEdBQUUsRUFBRSxPQUFPLEdBQUMsR0FBRSxFQUFFLE1BQU0sR0FBQyxXQUFVO1FBQUMsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFBQyxHQUFFLEVBQUUsT0FBTyxHQUFDLFdBQVU7UUFBQyxFQUFFLENBQUMsb0VBQW9FLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUFDLENBQUM7QUFBQTtBQUFDLElBQUksSUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNO0FBQUUsQ0FBQSxDQUFDLEtBQUcsQ0FBQyxFQUFFLGVBQWUsQUFBRCxLQUFJO0FBQUksZUFBZSxFQUFFLENBQUMsRUFBQztJQUFDLE9BQU8sRUFBRSxzQkFBc0IsSUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDO0FBQUE7QUFBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0FBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQztJQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBc0IsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDO0FBQUU7QUFBRyxJQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsS0FBRyxHQUFFO0lBQUMsSUFBSSxJQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUE4QixpQkFBaUIsU0FBUSxTQUFTLENBQUMsRUFBQztRQUFDLElBQUksSUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHO1FBQUMsSUFBRyxFQUFFLFVBQVUsQ0FBQyxJQUFHO1lBQUMsSUFBSSxJQUFFLElBQUksSUFBSSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNO1lBQUksRUFBRSxRQUFRLEtBQUcsRUFBRSxJQUFJLElBQUUsRUFBRSxJQUFJLEtBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUEsSUFBRyxJQUFJLFNBQVMsRUFBRSxJQUFJLEVBQUM7b0JBQUMsU0FBUTt3QkFBQyxnQkFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQWU7Z0JBQUMsT0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLFNBQVMsY0FBYTtnQkFBQyxRQUFPO2dCQUFJLFlBQVc7WUFBUyxHQUFHO1FBQUEsQ0FBQztJQUFBO0FBQUUsQ0FBQyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzLy5wbnBtL3JlZ2lzdHJ5Lm5wbW1pcnJvci5jb20rQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMTMuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS02ODA5ZWZjMGVmZjg4NGExLmpzIiwic3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG89e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIi9Vc2Vycy9hdGxhcy9yZWFjdC9leHRlbnNpb24tcWluaXUtcGljL3NyYy9iYWNrZ3JvdW5kLnRzXCIsXCJidW5kbGVJZFwiOlwiYTIwZGQ4ZWVmNDRhOTJhM1wiLFwiZW52SGFzaFwiOlwiMjEwMjgxY2FmOGQ0MTYwZFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjYyMzMwfTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9by5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm8udmVyYm9zZX19O3ZhciBUPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIGsoZSl7VC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1rO3ZhciBuPWdsb2JhbFRoaXMuY2hyb21lfHxnbG9iYWxUaGlzLmJyb3dzZXJ8fG51bGw7YXN5bmMgZnVuY3Rpb24gZyhlPSExKXtlJiZuLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe19fcGxhc21vX2Z1bGxfcmVsb2FkX186ITB9KSxnbG9iYWxUaGlzLmxvY2F0aW9uIT09dm9pZCAwJiZcInJlbG9hZFwiaW4gZ2xvYmFsVGhpcy5sb2NhdGlvbiYmZ2xvYmFsVGhpcy5sb2NhdGlvbi5yZWxvYWQoKX1mdW5jdGlvbiBmKCl7cmV0dXJuIG8uaG9zdHx8KGxvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpPT09MD9sb2NhdGlvbi5ob3N0bmFtZTpcImxvY2FsaG9zdFwiKX1mdW5jdGlvbiBoKCl7cmV0dXJuIG8ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgdT10eXBlb2YgZ2xvYmFsVGhpcy5wcm9jZXNzPFwidVwiP2dsb2JhbFRoaXMucHJvY2Vzcy5hcmd2OltdO3ZhciB5PXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgSD1uZXcgU2V0KHUpLGI9ZT0+SC5oYXMoZSksTj11LmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LHNdKT0+KGVbdF09cyxlKSx7fSk7dmFyIEE9YihcIi0tZHJ5LXJ1blwiKSxDPWIoXCItLXZlcmJvc2VcIil8fHkuVkVSQk9TRT09PVwidHJ1ZVwiO3ZhciBfPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB4PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksUj0oLi4uZSk9Pl8oXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxkPSguLi5lKT0+XyhcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpO2Z1bmN0aW9uIHYoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeChcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIEUoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1mKCkscz1oKCksaT1vLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIjtuPy5ydW50aW1lPy5sYXN0RXJyb3ImJmxvY2F0aW9uLnJlbG9hZCgpO2xldCBsPWAke2l9Oi8vJHt0fWAsYz1uZXcgV2ViU29ja2V0KGAke2x9OiR7c30vYCksbT1uZXcgV2ViU29ja2V0KGAke2x9OiR7TnVtYmVyKHMpKzF9L2ApO20ub25tZXNzYWdlPWFzeW5jIGZ1bmN0aW9uKHApe2lmKEpTT04ucGFyc2UocC5kYXRhKS50eXBlPT09XCJidWlsZF9yZWFkeVwiKXthd2FpdCBlPy4oW10sITApO3JldHVybn19LG0ub25lcnJvcj12LGMub25tZXNzYWdlPWFzeW5jIGZ1bmN0aW9uKHApe2xldCBhPUpTT04ucGFyc2UocC5kYXRhKTtpZihhLnR5cGU9PT1cInVwZGF0ZVwiJiYoYS5hc3NldHMuc29tZShyPT5yLnR5cGU9PT1cImpzb25cIik/YXdhaXQgZyghMCk6dHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmYXdhaXQgZShhLmFzc2V0cykpLGEudHlwZT09PVwiZXJyb3JcIilmb3IobGV0IHIgb2YgYS5kaWFnbm9zdGljcy5hbnNpKXtsZXQgdz1yLmNvZGVmcmFtZT9yLmNvZGVmcmFtZTpyLnN0YWNrO2QoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrci5tZXNzYWdlK2BcbmArdytgXG5cbmArci5oaW50cy5qb2luKGBcbmApKX19LGMub25lcnJvcj12LGMub25vcGVuPWZ1bmN0aW9uKCl7UihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke28uZW50cnlGaWxlUGF0aH1gKX0sYy5vbmNsb3NlPWZ1bmN0aW9uKCl7ZChgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke28uZW50cnlGaWxlUGF0aH1gKX19dmFyIE09bW9kdWxlLmJ1bmRsZS5wYXJlbnQ7KCFNfHwhTS5pc1BhcmNlbFJlcXVpcmUpJiZFKCk7YXN5bmMgZnVuY3Rpb24gTChlKXtyZXR1cm4gZS5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiZuLnJ1bnRpbWUucmVsb2FkKCksITB9bi5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihMKTtuLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uKGUpe2UubmFtZS5zdGFydHNXaXRoKFwiX19wbGFzbW9fcnVudGltZV9cIikmJmUub25NZXNzYWdlLmFkZExpc3RlbmVyKEwpfSk7aWYobi5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbj09PTMpe2xldCBlPW4ucnVudGltZS5nZXRVUkwoXCIvX19wbGFzbW9faG1yX3Byb3h5X18/dXJsPVwiKTthZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIixmdW5jdGlvbih0KXtsZXQgcz10LnJlcXVlc3QudXJsO2lmKHMuc3RhcnRzV2l0aChlKSl7bGV0IGk9bmV3IFVSTChkZWNvZGVVUklDb21wb25lbnQocy5zbGljZShlLmxlbmd0aCkpKTtpLmhvc3RuYW1lPT09by5ob3N0JiZpLnBvcnQ9PT1gJHtvLnBvcnR9YD90LnJlc3BvbmRXaXRoKGZldGNoKGkpLnRoZW4obD0+bmV3IFJlc3BvbnNlKGwuYm9keSx7aGVhZGVyczp7XCJDb250ZW50LVR5cGVcIjpsLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpfX0pKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1cbiIsIiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJiYWNrZ3JvdW5kLmY0NGE5MmEzLmpzLm1hcCJ9
