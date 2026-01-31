(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/CursorTrail.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>CursorTrail
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CursorTrail() {
    _s();
    const [cursors, setCursors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isEnabled, setIsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CursorTrail.useEffect": ()=>{
            // Check if user prefers reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                setIsEnabled(false);
                return;
            }
            let animationFrame;
            let cursorId = 0;
            const handleMouseMove = {
                "CursorTrail.useEffect.handleMouseMove": (e)=>{
                    if (!isEnabled) return;
                    setCursors({
                        "CursorTrail.useEffect.handleMouseMove": (prev)=>{
                            const newCursor = {
                                x: e.clientX,
                                y: e.clientY,
                                id: cursorId++
                            };
                            // Keep only the last 8 cursor positions
                            const updated = [
                                newCursor,
                                ...prev
                            ].slice(0, 8);
                            return updated;
                        }
                    }["CursorTrail.useEffect.handleMouseMove"]);
                }
            }["CursorTrail.useEffect.handleMouseMove"];
            const cleanupOldCursors = {
                "CursorTrail.useEffect.cleanupOldCursors": ()=>{
                    setCursors({
                        "CursorTrail.useEffect.cleanupOldCursors": (prev)=>prev.filter({
                                "CursorTrail.useEffect.cleanupOldCursors": (_, index)=>index < 8
                            }["CursorTrail.useEffect.cleanupOldCursors"])
                    }["CursorTrail.useEffect.cleanupOldCursors"]);
                    animationFrame = requestAnimationFrame(cleanupOldCursors);
                }
            }["CursorTrail.useEffect.cleanupOldCursors"];
            document.addEventListener('mousemove', handleMouseMove);
            animationFrame = requestAnimationFrame(cleanupOldCursors);
            return ({
                "CursorTrail.useEffect": ()=>{
                    document.removeEventListener('mousemove', handleMouseMove);
                    cancelAnimationFrame(animationFrame);
                }
            })["CursorTrail.useEffect"];
        }
    }["CursorTrail.useEffect"], [
        isEnabled
    ]);
    if (!isEnabled) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 pointer-events-none z-50",
        children: cursors.map((cursor, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-60",
                initial: {
                    x: cursor.x - 8,
                    y: cursor.y - 8,
                    scale: 1,
                    opacity: 0.6
                },
                animate: {
                    scale: 0,
                    opacity: 0
                },
                transition: {
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "easeOut"
                },
                style: {
                    left: 0,
                    top: 0,
                    transform: "translate(".concat(cursor.x - 8, "px, ").concat(cursor.y - 8, "px)")
                }
            }, cursor.id, false, {
                fileName: "[project]/src/components/CursorTrail.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/CursorTrail.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(CursorTrail, "9Y6VBd7S/9AiC7rXcfjgYJcRhhI=");
_c = CursorTrail;
var _c;
__turbopack_context__.k.register(_c, "CursorTrail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/CursorTrail.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/CursorTrail.tsx [app-client] (ecmascript)"));
}),
}]);

//# sourceMappingURL=src_components_CursorTrail_tsx_68c50920._.js.map