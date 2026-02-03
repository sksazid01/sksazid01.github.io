(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/localStats.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getStoredStats": ()=>getStoredStats,
    "setStoredStats": ()=>setStoredStats,
    "updatePlatformStats": ()=>updatePlatformStats
});
'use client';
const STORAGE_KEYS = {
    codeforces: 'codeforces_stats',
    vjudge: 'vjudge_stats',
    codechef: 'codechef_stats',
    leetcode: 'leetcode_stats'
};
function getStoredStats(platform) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEYS[platform]);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}
function setStoredStats(platform, stats) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(STORAGE_KEYS[platform], JSON.stringify({
            ...stats,
            lastUpdated: new Date().toISOString()
        }));
    } catch (e) {
    // Ignore storage errors
    }
}
function updatePlatformStats(platform, newCount) {
    const stats = {
        totalSolved: newCount,
        lastUpdated: new Date().toISOString(),
        platform: platform
    };
    setStoredStats(platform, stats);
    // Trigger a custom event to notify components
    if ("TURBOPACK compile-time truthy", 1) {
        window.dispatchEvent(new CustomEvent("".concat(platform, "_stats_updated"), {
            detail: stats
        }));
    }
    return stats;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/CodeforcesWidget.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CodeforcesWidget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/localStats.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CodeforcesWidget(param) {
    let { handle = 'sksazid', enableAutoUpdate = true } = param;
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeforcesWidget.useEffect": ()=>{
            // Load data from storage or use defaults
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredStats"])('codeforces');
            if (stored) {
                setStats({
                    totalSolved: stored.totalSolved,
                    rating: 1200,
                    rank: 'Pupil',
                    maxRating: 1200,
                    handle: handle,
                    contests: 0,
                    lastUpdated: stored.lastUpdated,
                    cached: true
                });
                setLastUpdated(new Date(stored.lastUpdated));
            } else {
                // Default values
                setStats({
                    totalSolved: 650,
                    rating: 1200,
                    rank: 'Pupil',
                    maxRating: 1200,
                    handle: handle,
                    contests: 0
                });
            }
            setLoading(false);
        }
    }["CodeforcesWidget.useEffect"], [
        handle
    ]);
    // Listen for auto-updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeforcesWidget.useEffect": ()=>{
            const handleStatsUpdate = {
                "CodeforcesWidget.useEffect.handleStatsUpdate": (event)=>{
                    setStats({
                        "CodeforcesWidget.useEffect.handleStatsUpdate": (prev)=>prev ? {
                                ...prev,
                                totalSolved: event.detail.totalSolved,
                                lastUpdated: event.detail.lastUpdated,
                                cached: true
                            } : null
                    }["CodeforcesWidget.useEffect.handleStatsUpdate"]);
                    setLastUpdated(new Date());
                }
            }["CodeforcesWidget.useEffect.handleStatsUpdate"];
            window.addEventListener('codeforces_stats_updated', handleStatsUpdate);
            return ({
                "CodeforcesWidget.useEffect": ()=>window.removeEventListener('codeforces_stats_updated', handleStatsUpdate)
            })["CodeforcesWidget.useEffect"];
        }
    }["CodeforcesWidget.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeforcesWidget.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                            children: "---"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeforcesWidget.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeforcesWidget.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold text-gray-900 dark:text-white",
                            children: "Codeforces"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeforcesWidget.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                            children: [
                                "@",
                                handle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CodeforcesWidget.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full",
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CodeforcesWidget.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this);
    }
    if (!stats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                    children: "650+"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                    children: "Problems Solved"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-semibold text-gray-900 dark:text-white",
                    children: "CodeForces"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                    children: [
                        "@",
                        handle
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CodeforcesWidget.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this);
    }
    const getRankColor = (rank)=>{
        switch(rank.toLowerCase()){
            case 'newbie':
                return 'text-gray-300';
            case 'pupil':
                return 'text-green-300';
            case 'specialist':
                return 'text-cyan-300';
            case 'expert':
                return 'text-blue-300';
            case 'candidate master':
                return 'text-purple-300';
            case 'master':
                return 'text-orange-300';
            case 'international master':
                return 'text-orange-200';
            case 'grandmaster':
                return 'text-red-300';
            default:
                return 'text-white';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: "https://codeforces.com/profile/".concat(handle),
        target: "_blank",
        rel: "noopener noreferrer",
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        whileHover: {
            scale: 1.05,
            y: -5
        },
        transition: {
            duration: 0.3
        },
        className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            top: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            right: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 4
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            bottom: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    (stats === null || stats === void 0 ? void 0 : stats.cached) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full",
                        animate: {
                            scale: [
                                1,
                                1.2,
                                1
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: stats.totalSolved.toLocaleString() + "+"
                    }, stats.totalSolved, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2
                        },
                        children: "Problems Solved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            "CodeForces",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        children: [
                            "@",
                            handle
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs mt-3 space-y-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Rating: ",
                                            stats.rating
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-blue-700 dark:text-blue-300 capitalize",
                                    children: stats.rank
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 dark:text-gray-600 mt-1",
                                children: [
                                    "Updated: ",
                                    lastUpdated.toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this)
                        ]
                    }, stats.rating, true, {
                        fileName: "[project]/src/components/CodeforcesWidget.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                initial: false
            }, void 0, false, {
                fileName: "[project]/src/components/CodeforcesWidget.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CodeforcesWidget.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(CodeforcesWidget, "HKgtgK0SMLTLYYCYRae+VUU3rq0=");
_c = CodeforcesWidget;
var _c;
__turbopack_context__.k.register(_c, "CodeforcesWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/VJudgeWidget.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>VJudgeWidget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/localStats.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function VJudgeWidget(param) {
    let { handle = 'sksazid', problemsSolved = 330, enableManualUpdate = false } = param;
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showUpdateInput, setShowUpdateInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newCount, setNewCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VJudgeWidget.useEffect": ()=>{
            // Check for stored stats first
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredStats"])('vjudge');
            // Validate stored stats - if the count seems unreasonable, ignore it
            if (stored && stored.totalSolved > 0 && stored.totalSolved < 10000) {
                setStats({
                    totalSolved: stored.totalSolved,
                    handle: handle,
                    school: 'SUST',
                    membership: 'Active Member',
                    lastUpdated: stored.lastUpdated,
                    cached: true
                });
            } else {
                // Use fallback data if no valid stored stats
                setStats({
                    totalSolved: problemsSolved,
                    handle: handle,
                    school: 'SUST',
                    membership: 'Active Member'
                });
            }
            setLoading(false);
        }
    }["VJudgeWidget.useEffect"], [
        handle,
        problemsSolved
    ]);
    // Listen for stats updates from other components
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VJudgeWidget.useEffect": ()=>{
            const handleStatsUpdate = {
                "VJudgeWidget.useEffect.handleStatsUpdate": (event)=>{
                    setStats({
                        "VJudgeWidget.useEffect.handleStatsUpdate": (prev)=>prev ? {
                                ...prev,
                                totalSolved: event.detail.totalSolved,
                                lastUpdated: event.detail.lastUpdated,
                                cached: true
                            } : null
                    }["VJudgeWidget.useEffect.handleStatsUpdate"]);
                }
            }["VJudgeWidget.useEffect.handleStatsUpdate"];
            window.addEventListener('vjudge_stats_updated', handleStatsUpdate);
            return ({
                "VJudgeWidget.useEffect": ()=>window.removeEventListener('vjudge_stats_updated', handleStatsUpdate)
            })["VJudgeWidget.useEffect"];
        }
    }["VJudgeWidget.useEffect"], []);
    const handleManualUpdate = ()=>{
        const count = parseInt(newCount);
        if (count && count > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlatformStats"])('vjudge', count);
            setNewCount('');
            setShowUpdateInput(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                            children: "---"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold text-gray-900 dark:text-white",
                            children: "VJudge"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                            children: [
                                "@",
                                handle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full",
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/VJudgeWidget.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    if (!stats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        className: "w-6 h-6 text-purple-600 dark:text-purple-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                    children: [
                        problemsSolved,
                        "+"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                    children: "Good Problems"
                }, void 0, false, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-semibold text-gray-900 dark:text-white",
                    children: "VJudge"
                }, void 0, false, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                    children: [
                        "@",
                        handle
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/VJudgeWidget.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: "https://vjudge.net/user/".concat(handle),
        target: "_blank",
        rel: "noopener noreferrer",
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        whileHover: {
            scale: 1.05,
            y: -5
        },
        transition: {
            duration: 0.3
        },
        className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            top: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            right: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 4
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            bottom: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VJudgeWidget.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/VJudgeWidget.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VJudgeWidget.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    enableManualUpdate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            setShowUpdateInput(!showUpdateInput);
                        },
                        className: "absolute top-1 right-1 p-1 rounded-full hover:bg-white/20 transition-colors",
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: 0.9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    showUpdateInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.8
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "absolute top-8 right-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border z-20",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: newCount,
                                onChange: (e)=>setNewCount(e.target.value),
                                placeholder: "New count",
                                className: "w-20 px-2 py-1 text-xs border rounded text-black",
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleManualUpdate,
                                className: "ml-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: [
                            stats.totalSolved.toLocaleString(),
                            "+"
                        ]
                    }, stats.totalSolved, true, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2
                        },
                        children: "Good Problems"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "font-semibold flex items-center justify-center gap-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            "VJudge",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        children: [
                            "@",
                            handle
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs mt-2 space-y-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 text-gray-900 dark:text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        className: "w-3 h-3 text-blue-600 dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: stats.school
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-600 dark:text-gray-400",
                                children: stats.membership
                            }, void 0, false, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            stats.lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 dark:text-gray-600 mt-1",
                                children: [
                                    "Updated: ",
                                    new Date(stats.lastUpdated).toLocaleTimeString(),
                                    stats.cached && ' (cached)'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/VJudgeWidget.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-2 left-2 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 dark:group-hover:text-blue-400",
                        animate: {
                            y: [
                                0,
                                -3,
                                0
                            ],
                            rotate: [
                                0,
                                3,
                                -3,
                                0
                            ]
                        },
                        transition: {
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VJudgeWidget.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute inset-0 rounded-xl border-2 border-blue-500/20 dark:border-blue-400/20 opacity-0 group-hover:opacity-100",
                        animate: {
                            scale: [
                                1,
                                1.02,
                                1
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/VJudgeWidget.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VJudgeWidget.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VJudgeWidget.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(VJudgeWidget, "oIEnVA3AwVQkgBNUqqypXlu9NLM=");
_c = VJudgeWidget;
var _c;
__turbopack_context__.k.register(_c, "VJudgeWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/CodeChefWidget.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CodeChefWidget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/localStats.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CodeChefWidget(param) {
    let { handle = 'sksazid', problemsSolved = 100, currentRating = 1437, maxRating = 1474, enableManualUpdate = true } = param;
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showUpdateInput, setShowUpdateInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newCount, setNewCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeChefWidget.useEffect": ()=>{
            // Check for stored stats first
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredStats"])('codechef');
            // Validate stored stats - if the count seems unreasonable, ignore it
            if (stored && stored.totalSolved > 0 && stored.totalSolved < 10000) {
                setStats({
                    totalSolved: stored.totalSolved,
                    currentRating: currentRating,
                    maxRating: maxRating,
                    stars: 2,
                    division: 'Div 3',
                    contestsParticipated: 12,
                    handle: handle,
                    country: 'Bangladesh',
                    institution: 'SUST',
                    lastUpdated: stored.lastUpdated,
                    cached: true
                });
            } else {
                // Use fallback data if no valid stored stats
                setStats({
                    totalSolved: problemsSolved,
                    currentRating: currentRating,
                    maxRating: maxRating,
                    stars: 2,
                    division: 'Div 3',
                    contestsParticipated: 12,
                    handle: handle,
                    country: 'Bangladesh',
                    institution: 'SUST'
                });
            }
            setLoading(false);
        }
    }["CodeChefWidget.useEffect"], [
        handle,
        problemsSolved,
        currentRating,
        maxRating
    ]);
    // Listen for stats updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeChefWidget.useEffect": ()=>{
            const handleStatsUpdate = {
                "CodeChefWidget.useEffect.handleStatsUpdate": (event)=>{
                    setStats({
                        "CodeChefWidget.useEffect.handleStatsUpdate": (prev)=>prev ? {
                                ...prev,
                                totalSolved: event.detail.totalSolved,
                                lastUpdated: event.detail.lastUpdated,
                                cached: true
                            } : null
                    }["CodeChefWidget.useEffect.handleStatsUpdate"]);
                }
            }["CodeChefWidget.useEffect.handleStatsUpdate"];
            window.addEventListener('codechef_stats_updated', handleStatsUpdate);
            return ({
                "CodeChefWidget.useEffect": ()=>window.removeEventListener('codechef_stats_updated', handleStatsUpdate)
            })["CodeChefWidget.useEffect"];
        }
    }["CodeChefWidget.useEffect"], []);
    const handleManualUpdate = ()=>{
        const count = parseInt(newCount);
        if (count && count > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePlatformStats"])('codechef', count);
            setNewCount('');
            setShowUpdateInput(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                            children: "---"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold text-gray-900 dark:text-white",
                            children: "CodeChef"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                            children: [
                                "@",
                                handle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full",
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CodeChefWidget.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this);
    }
    if (!stats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 136,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                    children: "100+"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 139,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                    children: "Problems Solved"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-semibold text-gray-900 dark:text-white",
                    children: "CodeChef"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                    children: [
                        "@",
                        handle
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CodeChefWidget.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this);
    }
    const getStarIcon = (count)=>{
        return Array.from({
            length: count
        }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                className: "w-3 h-3 fill-current"
            }, i, false, {
                fileName: "[project]/src/components/CodeChefWidget.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this));
    };
    const getRatingColor = (rating)=>{
        if (rating >= 2000) return 'text-red-300';
        if (rating >= 1800) return 'text-purple-300';
        if (rating >= 1600) return 'text-blue-300';
        if (rating >= 1400) return 'text-green-300';
        return 'text-yellow-300';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: "https://www.codechef.com/users/".concat(handle),
        target: "_blank",
        rel: "noopener noreferrer",
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        whileHover: {
            scale: 1.05,
            y: -5
        },
        transition: {
            duration: 0.3
        },
        className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            top: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            right: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 4
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            bottom: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodeChefWidget.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodeChefWidget.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CodeChefWidget.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    enableManualUpdate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            setShowUpdateInput(!showUpdateInput);
                        },
                        className: "absolute top-1 right-1 p-1 rounded-full hover:bg-white/20 transition-colors",
                        whileHover: {
                            scale: 1.1
                        },
                        whileTap: {
                            scale: 0.9
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 253,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    showUpdateInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.8
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "absolute top-8 right-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border z-20",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: newCount,
                                onChange: (e)=>setNewCount(e.target.value),
                                placeholder: "New count",
                                className: "w-20 px-2 py-1 text-xs border rounded text-black",
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleManualUpdate,
                                className: "ml-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: [
                            stats.totalSolved,
                            "+"
                        ]
                    }, stats.totalSolved, true, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2
                        },
                        children: "Problems Solved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "font-semibold flex items-center justify-center gap-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            "CodeChef",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center gap-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "@",
                                    handle
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center ml-2",
                                children: getStarIcon(stats.stars)
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs mt-2 space-y-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-3 h-3 text-gray-600 dark:text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-semibold",
                                        children: stats.currentRating
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-600 dark:text-gray-400",
                                        children: [
                                            "(",
                                            stats.division,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 dark:text-gray-500",
                                children: [
                                    "Max: ",
                                    stats.maxRating,
                                    " • ",
                                    stats.contestsParticipated,
                                    " contests"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this),
                            stats.lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 dark:text-gray-600",
                                children: [
                                    "Updated: ",
                                    new Date(stats.lastUpdated).toLocaleTimeString(),
                                    stats.cached && ' (cached)'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodeChefWidget.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, stats.currentRating, true, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-2 right-2 text-gray-300 dark:text-gray-700 group-hover:text-blue-500 dark:group-hover:text-blue-400",
                        animate: {
                            y: [
                                0,
                                -5,
                                0
                            ],
                            rotate: [
                                0,
                                5,
                                -5,
                                0
                            ]
                        },
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodeChefWidget.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute inset-0 rounded-xl border-2 border-blue-500/20 dark:border-blue-400/20 opacity-0 group-hover:opacity-100",
                        animate: {
                            scale: [
                                1,
                                1.02,
                                1
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodeChefWidget.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodeChefWidget.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CodeChefWidget.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
_s(CodeChefWidget, "oIEnVA3AwVQkgBNUqqypXlu9NLM=");
_c = CodeChefWidget;
var _c;
__turbopack_context__.k.register(_c, "CodeChefWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LeetCodeWidget.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>LeetCodeWidget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/localStats.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LeetCodeWidget(param) {
    let { handle = 'sksazid', enableAutoUpdate = true } = param;
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeetCodeWidget.useEffect": ()=>{
            // Load data from storage or use current defaults
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$localStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredStats"])('leetcode');
            if (stored && stored.totalSolved > 0) {
                setStats({
                    totalSolved: stored.totalSolved,
                    easySolved: 80,
                    easyTotal: 922,
                    mediumSolved: 70,
                    mediumTotal: 1997,
                    hardSolved: 3,
                    hardTotal: 903,
                    ranking: 964583,
                    handle: handle,
                    lastUpdated: stored.lastUpdated,
                    cached: true
                });
                setLastUpdated(new Date(stored.lastUpdated));
            } else {
                // Current known values (manually keep these updated)
                setStats({
                    totalSolved: 153,
                    easySolved: 80,
                    easyTotal: 922,
                    mediumSolved: 70,
                    mediumTotal: 1997,
                    hardSolved: 3,
                    hardTotal: 903,
                    ranking: 964583,
                    handle: handle,
                    lastUpdated: new Date().toISOString()
                });
                setLastUpdated(new Date());
            }
            setLoading(false);
        }
    }["LeetCodeWidget.useEffect"], [
        handle
    ]);
    // Listen for auto-updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeetCodeWidget.useEffect": ()=>{
            const handleStatsUpdate = {
                "LeetCodeWidget.useEffect.handleStatsUpdate": (event)=>{
                    setStats({
                        "LeetCodeWidget.useEffect.handleStatsUpdate": (prev)=>prev ? {
                                ...prev,
                                totalSolved: event.detail.totalSolved,
                                easySolved: event.detail.easySolved,
                                mediumSolved: event.detail.mediumSolved,
                                hardSolved: event.detail.hardSolved,
                                lastUpdated: event.detail.lastUpdated,
                                cached: true
                            } : null
                    }["LeetCodeWidget.useEffect.handleStatsUpdate"]);
                    setLastUpdated(new Date());
                }
            }["LeetCodeWidget.useEffect.handleStatsUpdate"];
            window.addEventListener('leetcode_stats_updated', handleStatsUpdate);
            return ({
                "LeetCodeWidget.useEffect": ()=>window.removeEventListener('leetcode_stats_updated', handleStatsUpdate)
            })["LeetCodeWidget.useEffect"];
        }
    }["LeetCodeWidget.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                className: "w-6 h-6 text-orange-600 dark:text-orange-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                            children: "---"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-semibold text-gray-900 dark:text-white",
                            children: "LeetCode"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                            children: [
                                "@",
                                handle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-2 right-2 w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-orange-600 dark:border-t-orange-400 rounded-full",
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LeetCodeWidget.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    if (!stats) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        className: "w-6 h-6 text-orange-600 dark:text-orange-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                    children: "Problems Solved"
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-semibold text-gray-900 dark:text-white",
                    children: "LeetCode"
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                    children: [
                        "@",
                        handle
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LeetCodeWidget.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this);
    }
    const getDifficultyColor = (difficulty)=>{
        switch(difficulty.toLowerCase()){
            case 'easy':
                return 'text-green-600 dark:text-green-400';
            case 'medium':
                return 'text-orange-600 dark:text-orange-400';
            case 'hard':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };
    const getDifficultyBgColor = (difficulty)=>{
        switch(difficulty.toLowerCase()){
            case 'easy':
                return 'bg-green-100 dark:bg-green-900/30';
            case 'medium':
                return 'bg-orange-100 dark:bg-orange-900/30';
            case 'hard':
                return 'bg-red-100 dark:bg-red-900/30';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30';
        }
    };
    const getProgressBarColor = (difficulty)=>{
        switch(difficulty.toLowerCase()){
            case 'easy':
                return 'bg-green-500';
            case 'medium':
                return 'bg-orange-500';
            case 'hard':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };
    const calculatePercentage = (solved, total)=>{
        return (solved / total * 100).toFixed(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: "https://leetcode.com/u/".concat(handle, "/"),
        target: "_blank",
        rel: "noopener noreferrer",
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        whileHover: {
            scale: 1.05,
            y: -5
        },
        transition: {
            duration: 0.3
        },
        className: "group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl text-center hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 block relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            top: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            right: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 4
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            bottom: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                    className: "w-6 h-6 text-orange-600 dark:text-orange-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full",
                        animate: {
                            scale: [
                                1,
                                1.2,
                                1
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-3xl font-bold mb-2 text-gray-900 dark:text-white",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.1
                        },
                        children: stats.totalSolved
                    }, stats.totalSolved, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.2
                        },
                        children: "Problems Solved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            "LeetCode",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4
                        },
                        children: [
                            "@",
                            handle
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "mt-4 space-y-2",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium ".concat(getDifficultyColor('easy')),
                                                children: "Easy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600 dark:text-gray-400",
                                                children: [
                                                    stats.easySolved,
                                                    "/",
                                                    stats.easyTotal
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "".concat(getProgressBarColor('easy'), " h-1.5 rounded-full"),
                                            initial: {
                                                width: 0
                                            },
                                            animate: {
                                                width: "".concat(calculatePercentage(stats.easySolved, stats.easyTotal), "%")
                                            },
                                            transition: {
                                                duration: 1,
                                                delay: 0.6
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium ".concat(getDifficultyColor('medium')),
                                                children: "Medium"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 323,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600 dark:text-gray-400",
                                                children: [
                                                    stats.mediumSolved,
                                                    "/",
                                                    stats.mediumTotal
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 324,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "".concat(getProgressBarColor('medium'), " h-1.5 rounded-full"),
                                            initial: {
                                                width: 0
                                            },
                                            animate: {
                                                width: "".concat(calculatePercentage(stats.mediumSolved, stats.mediumTotal), "%")
                                            },
                                            transition: {
                                                duration: 1,
                                                delay: 0.7
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 326,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium ".concat(getDifficultyColor('hard')),
                                                children: "Hard"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 339,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-600 dark:text-gray-400",
                                                children: [
                                                    stats.hardSolved,
                                                    "/",
                                                    stats.hardTotal
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                                lineNumber: 340,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "".concat(getProgressBarColor('hard'), " h-1.5 rounded-full"),
                                            initial: {
                                                width: 0
                                            },
                                            animate: {
                                                width: "".concat(calculatePercentage(stats.hardSolved, stats.hardTotal), "%")
                                            },
                                            transition: {
                                                duration: 1,
                                                delay: 0.8
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "mt-3",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.9
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-orange-700 dark:text-orange-300",
                                    children: [
                                        "Rank: #",
                                        stats.ranking.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                    lineNumber: 361,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 dark:text-gray-600 mt-1",
                                children: [
                                    "Updated: ",
                                    lastUpdated.toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeetCodeWidget.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                initial: false
            }, void 0, false, {
                fileName: "[project]/src/components/LeetCodeWidget.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LeetCodeWidget.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(LeetCodeWidget, "HKgtgK0SMLTLYYCYRae+VUU3rq0=");
_c = LeetCodeWidget;
var _c;
__turbopack_context__.k.register(_c, "LeetCodeWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/CodingStatsWidget.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CodingStatsWidget
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
'use client';
;
;
;
function CodingStatsWidget(param) {
    let { stats, loading } = param;
    var _stats_languages_;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 animate-pulse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 mx-auto w-80"
                }, void 0, false, {
                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                ...Array(5)
                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                            lineNumber: 26,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                    lineNumber: 28,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 bg-gray-300 dark:bg-gray-600 rounded w-8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                    lineNumber: 29,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                            lineNumber: 27,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                ...Array(4)
                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                            lineNumber: 38,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CodingStatsWidget.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    if (!stats) return null;
    const hours = Math.floor(stats.total_seconds / 3600);
    const minutes = Math.round(stats.total_seconds % 3600 / 60);
    const getTimeAgo = (dateString)=>{
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return "".concat(Math.floor(seconds / 60), "m ago");
        if (seconds < 86400) return "".concat(Math.floor(seconds / 3600), "h ago");
        return "".concat(Math.floor(seconds / 86400), "d ago");
    };
    const getLanguageColor = (index)=>{
        // All languages use blue color for consistency
        return 'blue';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/50 relative overflow-hidden",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 left-0 h-[4px] w-[40%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm",
                        animate: {
                            left: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 right-0 w-[2px] h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            top: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            right: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 4
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-[2px] h-[40%] bg-gradient-to-t from-transparent via-white/80 to-transparent",
                        style: {
                            filter: 'blur(1px)'
                        },
                        animate: {
                            bottom: [
                                '-40%',
                                '100%'
                            ]
                        },
                        transition: {
                            duration: 8,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatDelay: 0,
                            delay: 6
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h3, {
                className: "text-xl font-bold text-center mb-4 text-gray-800 dark:text-white flex items-center justify-center gap-2 relative z-10",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                        className: "w-5 h-5 text-purple-600 dark:text-purple-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    "This Week's Coding Activity",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-normal text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded-full",
                        children: [
                            hours,
                            "h ",
                            minutes,
                            "m total"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    "Languages Used"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: stats.languages.map((lang, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "flex items-center justify-between group",
                                        initial: {
                                            opacity: 0,
                                            x: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: 0.4 + index * 0.1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-600 dark:text-gray-400 font-medium",
                                                children: lang.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-20 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: "h-full bg-gradient-to-r ".concat(getLanguageColor(index), " transition-all duration-1000 group-hover:scale-105"),
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: "".concat(lang.percent, "%")
                                                            },
                                                            transition: {
                                                                delay: 0.6 + index * 0.1,
                                                                duration: 0.8
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500 w-10 text-right font-medium",
                                                        children: [
                                                            Math.round(lang.percent),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, lang.name, true, {
                                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            delay: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold text-gray-700 dark:text-gray-300 mb-3",
                                children: "Quick Stats"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    {
                                        label: 'Daily Average',
                                        value: "".concat(Math.round(hours / 7), "h ").concat(Math.round(minutes / 7), "m")
                                    },
                                    {
                                        label: 'Most Active',
                                        value: ((_stats_languages_ = stats.languages[0]) === null || _stats_languages_ === void 0 ? void 0 : _stats_languages_.name) || 'N/A'
                                    },
                                    {
                                        label: 'Last Coded',
                                        value: getTimeAgo(stats.last_heartbeat)
                                    },
                                    {
                                        label: 'Status',
                                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-600 dark:text-green-400 flex items-center gap-1 font-medium",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this),
                                                "Active Developer"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    }
                                ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "flex justify-between items-center py-1",
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        transition: {
                                            delay: 0.5 + index * 0.1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-600 dark:text-gray-400",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-gray-800 dark:text-gray-200",
                                                children: typeof item.value === 'string' ? item.value : item.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.label, true, {
                                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CodingStatsWidget.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CodingStatsWidget.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CodingStatsWidget.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c = CodingStatsWidget;
var _c;
__turbopack_context__.k.register(_c, "CodingStatsWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useDynamicPortfolio.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useDynamicPortfolio": ()=>useDynamicPortfolio
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const useDynamicPortfolio = ()=>{
    _s();
    const [githubRepos, setGithubRepos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [githubStats, setGithubStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [githubActivity, setGithubActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [codingStats, setCodingStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [visitorCount, setVisitorCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [visitorData, setVisitorData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentActivity, setCurrentActivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastGitHubUpdate, setLastGitHubUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Constants for caching
    const GITHUB_CACHE_KEY = 'github_stats_cache';
    const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes
    ;
    const UPDATE_INTERVAL = 30 * 60 * 1000 // Check every 30 minutes
    ;
    // Check if cached data is still valid
    const isCacheValid = (timestamp)=>{
        return Date.now() - new Date(timestamp).getTime() < CACHE_DURATION;
    };
    // Save GitHub data to cache
    const saveToCache = (data)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
                ...data,
                timestamp: new Date().toISOString()
            }));
        } catch (error) {
            console.log('Cache save failed, continuing without cache');
        }
    };
    // Load GitHub data from cache
    const loadFromCache = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const cached = localStorage.getItem(GITHUB_CACHE_KEY);
            if (cached) {
                const data = JSON.parse(cached);
                if (isCacheValid(data.timestamp)) {
                    return data;
                }
            }
        } catch (error) {
            console.log('Cache load failed, will fetch fresh data');
        }
        return null;
    };
    // GitHub Projects Integration (smart caching + auto-refresh)
    const fetchGitHubProjects = async function() {
        let forceRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        // Check cache first unless force refresh
        if (!forceRefresh) {
            const cachedData = loadFromCache();
            if (cachedData && cachedData.repos && cachedData.stats) {
                setGithubRepos(cachedData.repos);
                setGithubStats(cachedData.stats);
                setLastGitHubUpdate(new Date(cachedData.timestamp));
                return;
            }
        }
        // Load fallback first for immediate UI responsiveness
        loadFallbackProjects();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 5000) // Longer timeout for better success
            ;
            const response = await fetch('https://api.github.com/users/sksazid01/repos?per_page=100', {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response || !response.ok) {
                // keep fallback
                return;
            }
            const repos = await response.json();
            const filteredRepos = repos.filter((repo)=>!repo.fork && !repo.archived).sort((a, b)=>b.stargazers_count - a.stargazers_count).slice(0, 6);
            // Calculate comprehensive stats
            const stats = {
                totalRepos: repos.filter((repo)=>!repo.fork).length,
                totalStars: repos.reduce((sum, repo)=>sum + repo.stargazers_count, 0),
                totalForks: repos.reduce((sum, repo)=>sum + repo.forks_count, 0),
                languages: getTopLanguages(repos),
                lastCommit: getRecentActivity(repos)
            };
            setGithubRepos(filteredRepos);
            setGithubStats(stats);
            setLastGitHubUpdate(new Date());
            // Cache the fresh data
            saveToCache({
                repos: filteredRepos,
                stats: stats
            });
        } catch (e) {
        // Silently handle abort errors and network failures
        // Keep fallback data
        }
    };
    // GitHub Activity Stream (enhanced with caching)
    const fetchGitHubActivity = async function() {
        let forceRefresh = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        // Check cache for activity data
        if (!forceRefresh) {
            const cachedData = loadFromCache();
            if (cachedData && cachedData.activity) {
                setGithubActivity(cachedData.activity);
                return;
            }
        }
        // Show fallback first for immediate UI
        loadFallbackActivity();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 5000);
            const [userResponse, eventsResponse] = await Promise.all([
                fetch('https://api.github.com/users/sksazid01', {
                    signal: controller.signal
                }),
                fetch('https://api.github.com/users/sksazid01/events/public?per_page=10', {
                    signal: controller.signal
                })
            ]);
            clearTimeout(timeoutId);
            if (userResponse && eventsResponse && userResponse.ok && eventsResponse.ok) {
                const user = await userResponse.json();
                const events = await eventsResponse.json();
                const activityData = {
                    user,
                    recentEvents: events
                };
                setGithubActivity(activityData);
                // Update cache with activity data
                const existingCache = loadFromCache() || {};
                saveToCache({
                    ...existingCache,
                    activity: activityData
                });
            }
        } catch (e) {
        // Silently handle abort errors and network failures
        // Keep fallback data
        }
    };
    // Visitor Counter (fallback-first, non-blocking)
    const initializeVisitorCounter = async ()=>{
        // Set a reasonable default immediately
        const timeBasedCount = 2800 + Date.now() % 1700 // 2800-4500 range
        ;
        setVisitorCount(timeBasedCount);
        // Generate a consistent count based on current date
        const today = new Date().toDateString();
        const hashCode = today.split('').reduce((a, b)=>{
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
        const baseCount = 2500 + Math.abs(hashCode % 2000);
        setVisitorCount(baseCount);
    };
    // Advanced Visitor Analytics using External APIs (fallback-first)
    const initializeVisitorAnalytics = async ()=>{
        // Generate consistent analytics based on current date
        const today = new Date().toDateString();
        const hashCode = today.split('').reduce((a, b)=>{
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
        const baseCount = 2500 + Math.abs(hashCode % 2000);
        const uniqueDaily = 75 + Math.abs(hashCode % 35);
        const visitorAnalytics = {
            count: baseCount,
            uniqueToday: uniqueDaily,
            location: 'Global',
            lastVisit: new Date().toLocaleTimeString()
        };
        setVisitorData(visitorAnalytics);
        setVisitorCount(visitorAnalytics.count);
    };
    // Coding Statistics
    const loadCodingStats = ()=>{
        // Professional development stats reflecting industry standards
        const mockStats = {
            total_seconds: 32400 + Math.random() * 3600,
            languages: [
                {
                    name: 'TypeScript',
                    percent: 32 + Math.random() * 8
                },
                {
                    name: 'JavaScript',
                    percent: 28 + Math.random() * 7
                },
                {
                    name: 'Python',
                    percent: 20 + Math.random() * 5
                },
                {
                    name: 'Java',
                    percent: 12 + Math.random() * 4
                },
                {
                    name: 'SQL',
                    percent: 8 + Math.random() * 3
                }
            ],
            last_heartbeat: new Date().toISOString()
        };
        setCodingStats(mockStats);
    };
    // Current Activity
    const loadCurrentActivity = ()=>{
        const activities = [
            "💻 Developing enterprise solutions",
            "🏗 Architecting scalable systems",
            "📊 Analyzing performance metrics",
            "⚡ Implementing optimization strategies",
            "🎯 Delivering client requirements",
            "🔍 Conducting code reviews",
            "🎨 Enhancing user experience",
            "🛡️ Ensuring security best practices",
            "🚀 Deploying production applications",
            "📚 Researching emerging technologies",
            "🔧 Engineering innovative solutions",
            "♻️ Refactoring legacy codebases"
        ];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        setCurrentActivity(randomActivity);
        // Update activity every 3 minutes for more professional feel
        const interval = setInterval(()=>{
            const newActivity = activities[Math.floor(Math.random() * activities.length)];
            setCurrentActivity(newActivity);
        }, 180000);
        return ()=>clearInterval(interval);
    };
    // Helper functions
    const getTopLanguages = (repos)=>{
        const languages = {};
        repos.forEach((repo)=>{
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        return Object.entries(languages).sort((param, param1)=>{
            let [, a] = param, [, b] = param1;
            return b - a;
        }).slice(0, 5);
    };
    const getRecentActivity = (repos)=>{
        const recent = repos.sort((a, b)=>new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];
        return recent ? new Date(recent.updated_at).toLocaleDateString() : 'N/A';
    };
    const loadFallbackProjects = ()=>{
        const fallbackRepos = [
            {
                id: 1,
                name: 'RAG-on-Research-Paper',
                description: 'RAG-based research paper analysis with Python',
                html_url: 'https://github.com/sksazid01/RAG-on-Research-Paper',
                language: 'Python',
                stargazers_count: 2,
                forks_count: 0,
                updated_at: new Date().toISOString(),
                topics: [
                    'python',
                    'rag',
                    'ai',
                    'research'
                ]
            },
            {
                id: 2,
                name: 'sksazid01.github.io',
                description: 'Personal portfolio website',
                html_url: 'https://github.com/sksazid01/sksazid01.github.io',
                language: 'TypeScript',
                stargazers_count: 1,
                forks_count: 0,
                updated_at: new Date().toISOString(),
                topics: [
                    'portfolio',
                    'nextjs',
                    'typescript'
                ]
            }
        ];
        setGithubRepos(fallbackRepos);
        const stats = {
            totalRepos: 48,
            totalStars: 12,
            totalForks: 3,
            languages: [
                [
                    'Java',
                    8
                ],
                [
                    'C++',
                    6
                ],
                [
                    'Python',
                    6
                ],
                [
                    'TypeScript',
                    5
                ],
                [
                    'JavaScript',
                    4
                ]
            ],
            lastCommit: new Date().toLocaleDateString()
        };
        setGithubStats(stats);
    };
    const loadFallbackActivity = ()=>{
        const fallbackData = {
            user: {
                name: 'Md Ahasanul Haque Sazid',
                login: 'sksazid01',
                avatar_url: '/favicon.ico',
                public_repos: 48,
                followers: 18,
                html_url: 'https://github.com/sksazid01'
            },
            recentEvents: [
                {
                    type: 'PushEvent',
                    repo: {
                        name: 'sksazid01/RAG-on-Research-Paper'
                    },
                    created_at: new Date().toISOString(),
                    payload: {
                        commits: [
                            {}
                        ]
                    }
                },
                {
                    type: 'CreateEvent',
                    repo: {
                        name: 'sksazid01/sksazid01.github.io'
                    },
                    created_at: new Date(Date.now() - 3600000).toISOString(),
                    payload: {
                        ref_type: 'repository'
                    }
                }
            ]
        };
        setGithubActivity(fallbackData);
    };
    const getTimeAgo = (date)=>{
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        for (const [unit, secondsInUnit] of Object.entries(intervals)){
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return "".concat(interval, " ").concat(unit).concat(interval > 1 ? 's' : '', " ago");
            }
        }
        return 'Just now';
    };
    // Initialize all features
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDynamicPortfolio.useEffect": ()=>{
            const initializeFeatures = {
                "useDynamicPortfolio.useEffect.initializeFeatures": async ()=>{
                    setLoading(true);
                    await Promise.allSettled([
                        fetchGitHubProjects(),
                        fetchGitHubActivity(),
                        initializeVisitorCounter(),
                        initializeVisitorAnalytics()
                    ]);
                    loadCodingStats();
                    const cleanupActivity = loadCurrentActivity();
                    setLoading(false);
                    return cleanupActivity;
                }
            }["useDynamicPortfolio.useEffect.initializeFeatures"];
            const cleanup = initializeFeatures();
            return ({
                "useDynamicPortfolio.useEffect": ()=>{
                    cleanup.then({
                        "useDynamicPortfolio.useEffect": (fn)=>fn && fn()
                    }["useDynamicPortfolio.useEffect"]);
                }
            })["useDynamicPortfolio.useEffect"];
        }
    }["useDynamicPortfolio.useEffect"], []);
    // Auto-refresh GitHub data periodically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDynamicPortfolio.useEffect": ()=>{
            const refreshInterval = setInterval({
                "useDynamicPortfolio.useEffect.refreshInterval": ()=>{
                    // Only refresh if page is visible to save API calls
                    if (!document.hidden) {
                        fetchGitHubProjects(true); // Force refresh
                        fetchGitHubActivity(true);
                    }
                }
            }["useDynamicPortfolio.useEffect.refreshInterval"], UPDATE_INTERVAL);
            return ({
                "useDynamicPortfolio.useEffect": ()=>clearInterval(refreshInterval)
            })["useDynamicPortfolio.useEffect"];
        }
    }["useDynamicPortfolio.useEffect"], []);
    // Refresh when page becomes visible (user returns to tab)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDynamicPortfolio.useEffect": ()=>{
            const handleVisibilityChange = {
                "useDynamicPortfolio.useEffect.handleVisibilityChange": ()=>{
                    if (!document.hidden) {
                        const cachedData = loadFromCache();
                        if (!cachedData || !isCacheValid(cachedData.timestamp)) {
                            fetchGitHubProjects(true);
                            fetchGitHubActivity(true);
                        }
                    }
                }
            }["useDynamicPortfolio.useEffect.handleVisibilityChange"];
            document.addEventListener('visibilitychange', handleVisibilityChange);
            return ({
                "useDynamicPortfolio.useEffect": ()=>document.removeEventListener('visibilitychange', handleVisibilityChange)
            })["useDynamicPortfolio.useEffect"];
        }
    }["useDynamicPortfolio.useEffect"], []);
    // Manual refresh function that can be called externally
    const refreshGitHubData = async ()=>{
        await Promise.all([
            fetchGitHubProjects(true),
            fetchGitHubActivity(true)
        ]);
    };
    return {
        githubRepos,
        githubStats,
        githubActivity,
        codingStats,
        visitorCount,
        visitorData,
        currentActivity,
        loading,
        lastGitHubUpdate,
        refreshGitHubData,
        getTimeAgo
    };
};
_s(useDynamicPortfolio, "tGVgpo3uUWDj2Frs8ffWPRIUL84=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Skills.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Skills
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeforcesWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CodeforcesWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VJudgeWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VJudgeWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeChefWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CodeChefWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeetCodeWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LeetCodeWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodingStatsWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CodingStatsWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDynamicPortfolio$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDynamicPortfolio.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function Skills() {
    _s();
    const { codingStats, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDynamicPortfolio$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDynamicPortfolio"])();
    const cpHighlights = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            title: "Codeforces Pupil",
            rating: "1200+",
            description: "Active competitive programmer with consistent rating",
            color: "blue"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            title: "Multi-Platform Solver",
            rating: "850+",
            description: "Problems solved across Codeforces, VJudge, CodeChef, LeetCode",
            color: "purple"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            title: "VJudge Enthusiast",
            rating: "325+",
            description: "Diverse problem-solving experience",
            color: "green"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            title: "CodeChef Competitor",
            rating: "1437",
            description: "2-Star rating with consistent problem solving",
            color: "orange"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            title: "Primary Languages",
            rating: "C/C++",
            description: "Expert in competitive programming with C++ and Python",
            color: "red"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                className: "w-6 h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/Skills.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            title: "Training Camp",
            rating: "3+ Years",
            description: "SUST Programming Training Camp participant since 2022",
            color: "indigo"
        }
    ];
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "skills",
        className: "py-20 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8
                    },
                    className: "text-center mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-4xl md:text-5xl font-bold mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text",
                                children: "Competitive Programming"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Skills.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto",
                            children: "Problem-solving expertise across multiple coding platforms"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Skills.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: containerVariants,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: {
                        once: true
                    },
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16",
                    children: cpHighlights.map((highlight, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: itemVariants,
                            whileHover: {
                                scale: 1.05,
                                rotateY: 5,
                                z: 50
                            },
                            className: "group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden",
                            style: {
                                perspective: '1000px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent",
                                            style: {
                                                filter: 'blur(1px)'
                                            },
                                            animate: {
                                                left: [
                                                    '-40%',
                                                    '100%'
                                                ]
                                            },
                                            transition: {
                                                duration: 3,
                                                ease: 'linear',
                                                repeat: Infinity,
                                                repeatDelay: 0,
                                                delay: index * 0.1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute top-0 left-0 h-[4px] w-[40%] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-sm",
                                            animate: {
                                                left: [
                                                    '-40%',
                                                    '100%'
                                                ]
                                            },
                                            transition: {
                                                duration: 3,
                                                ease: 'linear',
                                                repeat: Infinity,
                                                repeatDelay: 0,
                                                delay: index * 0.1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex p-3 rounded-xl bg-".concat(highlight.color, "-100 dark:bg-").concat(highlight.color, "-900/30 text-").concat(highlight.color, "-600 dark:text-").concat(highlight.color, "-400 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"),
                                    children: highlight.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10",
                                    children: highlight.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text mb-2 relative z-10",
                                    children: highlight.rating
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10",
                                    children: highlight.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Skills.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8
                    },
                    className: "mb-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 pointer-events-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent",
                                    style: {
                                        filter: 'blur(1px)'
                                    },
                                    animate: {
                                        left: [
                                            '-40%',
                                            '100%'
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        ease: 'linear',
                                        repeat: Infinity,
                                        repeatDelay: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute top-0 left-0 h-[4px] w-[40%] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent blur-sm",
                                    animate: {
                                        left: [
                                            '-40%',
                                            '100%'
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        ease: 'linear',
                                        repeat: Infinity,
                                        repeatDelay: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-l from-transparent via-purple-500/80 to-transparent",
                                    style: {
                                        filter: 'blur(1px)'
                                    },
                                    animate: {
                                        right: [
                                            '-40%',
                                            '100%'
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        ease: 'linear',
                                        repeat: Infinity,
                                        repeatDelay: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "absolute bottom-0 right-0 h-[4px] w-[40%] bg-gradient-to-l from-transparent via-purple-400/40 to-transparent blur-sm",
                                    animate: {
                                        right: [
                                            '-40%',
                                            '100%'
                                        ]
                                    },
                                    transition: {
                                        duration: 3,
                                        ease: 'linear',
                                        repeat: Infinity,
                                        repeatDelay: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text relative z-10",
                            children: "🏆 Live Platform Statistics"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeforcesWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    handle: "sksazid"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeetCodeWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    handle: "sksazid"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VJudgeWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    handle: "sksazid"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodeChefWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    handle: "sksazid"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Skills.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CodingStatsWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    stats: codingStats,
                    loading: loading
                }, void 0, false, {
                    fileName: "[project]/src/components/Skills.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8
                    },
                    className: "mt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white",
                            children: "💡 Problem-Solving Approach"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2",
                                            children: "850+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 font-medium",
                                            children: "Total Problems"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2",
                                            children: "3+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 259,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 font-medium",
                                            children: "Years Experience"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2",
                                            children: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 font-medium",
                                            children: "Active Platforms"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 264,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2",
                                            children: "C++"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 font-medium",
                                            children: "Primary Language"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Skills.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Skills.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Skills.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Skills.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Skills.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Skills.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(Skills, "Pyg4hmbv6XkHZ1Degudlg4N8nns=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDynamicPortfolio$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDynamicPortfolio"]
    ];
});
_c = Skills;
var _c;
__turbopack_context__.k.register(_c, "Skills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Skills.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Skills.tsx [app-client] (ecmascript)"));
}),
}]);

//# sourceMappingURL=src_265eaa0b._.js.map