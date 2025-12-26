module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/analytics/GoogleAnalytics.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GoogleAnalytics",
    ()=>GoogleAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2f$third$2d$parties$2f$dist$2f$google$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@next/third-parties/dist/google/index.js [app-ssr] (ecmascript)");
"use client";
;
;
function GoogleAnalytics() {
    const measurementId = ("TURBOPACK compile-time value", "G-KR84C797S0");
    // Don't render if measurement ID is not configured
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2f$third$2d$parties$2f$dist$2f$google$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GoogleAnalytics"], {
        gaId: measurementId
    }, void 0, false, {
        fileName: "[project]/src/components/analytics/GoogleAnalytics.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/analytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const isGA4Available = ()=>{
    return ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof window.gtag === "function";
};
const getGA4MeasurementId = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const trackPageView = (url)=>{
    if (!isGA4Available()) return;
    //TURBOPACK unreachable
    ;
    const measurementId = undefined;
};
const trackEvent = (eventName, eventParams)=>{
    if (!isGA4Available()) return;
    //TURBOPACK unreachable
    ;
    const measurementId = undefined;
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
}),
"[project]/src/hooks/usePageView.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageView",
    ()=>usePageView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analytics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function usePageView() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pathname) {
            // Track page view with current pathname
            // Query parameters are included automatically by GA4
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackPageView"])(pathname);
        }
    }, [
        pathname
    ]);
}
}),
"[project]/src/components/analytics/PageViewTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageViewTracker",
    ()=>PageViewTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePageView$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePageView.ts [app-ssr] (ecmascript)");
"use client";
;
function PageViewTracker() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePageView$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePageView"])();
    return null;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a83e165a._.js.map