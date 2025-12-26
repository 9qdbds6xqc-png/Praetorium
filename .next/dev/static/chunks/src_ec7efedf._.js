(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/analytics/GoogleAnalytics.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GoogleAnalytics",
    ()=>GoogleAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2f$third$2d$parties$2f$dist$2f$google$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@next/third-parties/dist/google/index.js [app-client] (ecmascript)");
"use client";
;
;
function GoogleAnalytics() {
    const measurementId = ("TURBOPACK compile-time value", "G-KR84C797S0");
    // Don't render if measurement ID is not configured
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2f$third$2d$parties$2f$dist$2f$google$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAnalytics"], {
        gaId: measurementId
    }, void 0, false, {
        fileName: "[project]/src/components/analytics/GoogleAnalytics.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_c = GoogleAnalytics;
var _c;
__turbopack_context__.k.register(_c, "GoogleAnalytics");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Google Analytics 4 utility functions
 * Provides type-safe event tracking and GA4 initialization
 */ __turbopack_context__.s([
    "getGA4MeasurementId",
    ()=>getGA4MeasurementId,
    "isGA4Available",
    ()=>isGA4Available,
    "trackButtonClick",
    ()=>trackButtonClick,
    "trackDownload",
    ()=>trackDownload,
    "trackEngagement",
    ()=>trackEngagement,
    "trackError",
    ()=>trackError,
    "trackEvent",
    ()=>trackEvent,
    "trackFormSubmission",
    ()=>trackFormSubmission,
    "trackPageView",
    ()=>trackPageView,
    "trackPurchase",
    ()=>trackPurchase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const isGA4Available = ()=>{
    return ("TURBOPACK compile-time value", "object") !== "undefined" && typeof window.gtag === "function";
};
const getGA4MeasurementId = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return ("TURBOPACK compile-time value", "G-KR84C797S0") || null;
};
const trackPageView = (url)=>{
    if (!isGA4Available()) return;
    const measurementId = getGA4MeasurementId();
    if (!measurementId) return;
    window.gtag?.("config", measurementId, {
        page_path: url
    });
};
const trackEvent = (eventName, eventParams)=>{
    if (!isGA4Available()) return;
    const measurementId = getGA4MeasurementId();
    if (!measurementId) return;
    window.gtag?.("event", eventName, {
        ...eventParams
    });
};
const trackFormSubmission = (formName, formId)=>{
    trackEvent("form_submit", {
        form_name: formName,
        form_id: formId
    });
};
const trackButtonClick = (buttonName, buttonId, location)=>{
    trackEvent("button_click", {
        button_name: buttonName,
        button_id: buttonId,
        location: location || window.location.pathname
    });
};
const trackDownload = (fileName, fileType)=>{
    trackEvent("file_download", {
        file_name: fileName,
        file_type: fileType
    });
};
const trackError = (errorMessage, errorType)=>{
    trackEvent("exception", {
        description: errorMessage,
        fatal: false,
        error_type: errorType
    });
};
const trackEngagement = (engagementType, value)=>{
    trackEvent("user_engagement", {
        engagement_type: engagementType,
        value: value
    });
};
const trackPurchase = (transactionId, value, currency = "USD", items)=>{
    trackEvent("purchase", {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/usePageView.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageView",
    ()=>usePageView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analytics.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function usePageView() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePageView.useEffect": ()=>{
            if (pathname) {
                // Track page view with current pathname
                // Query parameters are included automatically by GA4
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPageView"])(pathname);
            }
        }
    }["usePageView.useEffect"], [
        pathname
    ]);
}
_s(usePageView, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/analytics/PageViewTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageViewTracker",
    ()=>PageViewTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePageView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePageView.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function PageViewTracker() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePageView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageView"])();
    return null;
}
_s(PageViewTracker, "KiMXu6rpTKz6f9xvaoMcGXkbpfY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePageView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageView"]
    ];
});
_c = PageViewTracker;
var _c;
__turbopack_context__.k.register(_c, "PageViewTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_ec7efedf._.js.map