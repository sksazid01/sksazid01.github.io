(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/StarryBackground.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>StarryBackground
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ThemeProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function StarryBackground() {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const starsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shootingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const nextShootTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const burstTimeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const enableFollow = true // attraction (non-destructive)
    ;
    // mouse move listener (normalized 0..1)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarryBackground.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const handleMouse = {
                "StarryBackground.useEffect.handleMouse": (e)=>{
                    mouseRef.current.x = e.clientX / window.innerWidth;
                    mouseRef.current.y = e.clientY / window.innerHeight;
                }
            }["StarryBackground.useEffect.handleMouse"];
            window.addEventListener('mousemove', handleMouse);
            return ({
                "StarryBackground.useEffect": ()=>window.removeEventListener('mousemove', handleMouse)
            })["StarryBackground.useEffect"];
        }
    }["StarryBackground.useEffect"], [
        enableFollow
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarryBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const resizeCanvas = {
                "StarryBackground.useEffect.resizeCanvas": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["StarryBackground.useEffect.resizeCanvas"];
            const createStars = {
                "StarryBackground.useEffect.createStars": ()=>{
                    const stars = [];
                    const numStars = Math.floor(canvas.width * canvas.height / 12000);
                    for(let i = 0; i < numStars; i++){
                        // depth controls size, brightness, speed
                        const depth = Math.random() ** 1.5 // bias towards far layers
                        ;
                        // base speed scaled by depth (nearer = faster)
                        const baseSpeed = 0.08 + depth * 0.35 // ~0.08..0.43
                        ;
                        let vx = (Math.random() - 0.5) * baseSpeed;
                        let vy = (Math.random() - 0.5) * baseSpeed;
                        if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
                            vx = (Math.random() < 0.5 ? 1 : -1) * baseSpeed * 0.4;
                            vy = (Math.random() < 0.5 ? 1 : -1) * baseSpeed * 0.4;
                        }
                        const size = 0.6 + depth * 2.4 // nearer stars larger
                        ;
                        const opacity = 0.2 + depth * 0.8;
                        const twinkleSpeed = 0.008 + Math.random() * 0.02 + depth * 0.015;
                        stars.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            size,
                            opacity,
                            twinkleSpeed,
                            vx,
                            vy,
                            depth,
                            speedMul: 0.5 + depth * 1.2,
                            offsetX: 0,
                            offsetY: 0
                        });
                    }
                    starsRef.current = stars;
                }
            }["StarryBackground.useEffect.createStars"];
            const createParticles = {
                "StarryBackground.useEffect.createParticles": ()=>{
                    const particles = [];
                    const numParticles = Math.floor(canvas.width * canvas.height / 20000);
                    for(let i = 0; i < numParticles; i++){
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            size: Math.random() * 3 + 1,
                            speedX: (Math.random() - 0.5) * 0.5,
                            speedY: (Math.random() - 0.5) * 0.5,
                            opacity: Math.random() * 0.6 + 0.2
                        });
                    }
                    particlesRef.current = particles;
                }
            }["StarryBackground.useEffect.createParticles"];
            const MIN_DELAY = 2000 // 2s
            ;
            const MAX_DELAY = 6000 // 6s
            ;
            const INITIAL_BURST_COUNT = 3;
            const INITIAL_BURST_SPREAD = 450 // ms between initial burst stars
            ;
            const spawnShootingStar = {
                "StarryBackground.useEffect.spawnShootingStar": ()=>{
                    if (theme !== 'dark') return;
                    const fromLeft = Math.random() < 0.5;
                    const startX = fromLeft ? -50 : canvas.width + 50;
                    const startY = Math.random() * canvas.height * 0.5 // upper half mostly
                    ;
                    const angle = (Math.random() * 20 + 25) * (Math.PI / 180) // 25-45 degrees
                    ;
                    const speed = 6 + Math.random() * 4 // pixels per frame baseline
                    ;
                    const vx = (fromLeft ? 1 : -1) * Math.cos(angle) * speed;
                    const vy = Math.sin(angle) * speed * (Math.random() < 0.7 ? 1 : 0.6);
                    shootingRef.current.push({
                        x: startX,
                        y: startY,
                        vx,
                        vy,
                        life: 0,
                        maxLife: 900 + Math.random() * 500,
                        length: 80 + Math.random() * 120,
                        brightness: 0.7 + Math.random() * 0.3
                    });
                    scheduleNext();
                }
            }["StarryBackground.useEffect.spawnShootingStar"];
            const scheduleNext = {
                "StarryBackground.useEffect.scheduleNext": ()=>{
                    if (nextShootTimeout.current) window.clearTimeout(nextShootTimeout.current);
                    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
                    nextShootTimeout.current = window.setTimeout(spawnShootingStar, delay);
                }
            }["StarryBackground.useEffect.scheduleNext"];
            // Initial burst (staggered)
            if (theme === 'dark') {
                for(let i = 0; i < INITIAL_BURST_COUNT; i++){
                    const t = window.setTimeout({
                        "StarryBackground.useEffect.t": ()=>spawnShootingStar()
                    }["StarryBackground.useEffect.t"], i * (INITIAL_BURST_SPREAD / INITIAL_BURST_COUNT));
                    burstTimeoutsRef.current.push(t);
                }
            }
            scheduleNext();
            const ATTRACTION_RADIUS = 260;
            const ATTRACTION_STRENGTH = 0.35 // how strongly stars shift toward cursor inside radius
            ;
            const RETURN_EASING = 0.90 // 0-1; closer to 1 = slower return
            ;
            const MAX_OFFSET = 120 // clamp displacement
            ;
            const animate = {
                "StarryBackground.useEffect.animate": (time)=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    if (theme === 'dark') {
                        // Stars for dark mode
                        starsRef.current.forEach({
                            "StarryBackground.useEffect.animate": (star)=>{
                                // update position (depth scaled)
                                if ("TURBOPACK compile-time truthy", 1) {
                                    const cursorX = mouseRef.current.x * canvas.width;
                                    const cursorY = mouseRef.current.y * canvas.height;
                                    const dx = cursorX - star.x;
                                    const dy = cursorY - star.y;
                                    const dist = Math.hypot(dx, dy);
                                    if (dist < ATTRACTION_RADIUS) {
                                        const influence = (1 - dist / ATTRACTION_RADIUS) ** 2 // ease near edge
                                        ;
                                        const shiftX = dx * influence * ATTRACTION_STRENGTH * (0.3 + star.depth);
                                        const shiftY = dy * influence * ATTRACTION_STRENGTH * (0.3 + star.depth);
                                        star.offsetX = (star.offsetX || 0) + shiftX;
                                        star.offsetY = (star.offsetY || 0) + shiftY;
                                        // clamp
                                        const mag = Math.hypot(star.offsetX, star.offsetY);
                                        if (mag > MAX_OFFSET) {
                                            const k = MAX_OFFSET / mag;
                                            star.offsetX *= k;
                                            star.offsetY *= k;
                                        }
                                    } else {
                                        // ease back to origin
                                        star.offsetX = (star.offsetX || 0) * RETURN_EASING;
                                        star.offsetY = (star.offsetY || 0) * RETURN_EASING;
                                        if (Math.abs(star.offsetX) < 0.05) star.offsetX = 0;
                                        if (Math.abs(star.offsetY) < 0.05) star.offsetY = 0;
                                    }
                                }
                                // baseline drift remains
                                star.x += star.vx * star.speedMul;
                                star.y += star.vy * star.speedMul;
                                // wrap around edges for seamless infinite field
                                if (star.x > canvas.width) star.x = 0;
                                if (star.x < 0) star.x = canvas.width;
                                if (star.y > canvas.height) star.y = 0;
                                if (star.y < 0) star.y = canvas.height;
                                star.opacity += Math.sin(time * star.twinkleSpeed) * 0.01;
                                star.opacity = Math.max(0.1, Math.min(1, star.opacity));
                                ctx.beginPath();
                                // parallax offset based on mouse (subtle for far stars, stronger near)
                                const parallaxStrength = 30 * star.depth // max shift
                                ;
                                const px = star.x + (mouseRef.current.x - 0.5) * parallaxStrength + (star.offsetX || 0);
                                const py = star.y + (mouseRef.current.y - 0.5) * parallaxStrength + (star.offsetY || 0);
                                ctx.arc(px, py, star.size, 0, Math.PI * 2);
                                const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * 3);
                                gradient.addColorStop(0, "rgba(255, 255, 255, ".concat(star.opacity, ")"));
                                gradient.addColorStop(0.5, "rgba(147, 197, 253, ".concat(star.opacity * 0.5, ")"));
                                gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
                                ctx.fillStyle = gradient;
                                ctx.fill();
                            }
                        }["StarryBackground.useEffect.animate"]);
                        // Shooting stars
                        const now = performance.now();
                        shootingRef.current = shootingRef.current.filter({
                            "StarryBackground.useEffect.animate": (s)=>s.life < s.maxLife
                        }["StarryBackground.useEffect.animate"]);
                        shootingRef.current.forEach({
                            "StarryBackground.useEffect.animate": (s)=>{
                                // advance
                                s.x += s.vx;
                                s.y += s.vy;
                                s.life += 16.67; // approximate frame step
                                // fade in then out
                                const half = s.maxLife / 2;
                                const fade = s.life < half ? s.life / half : 1 - (s.life - half) / half;
                                const alpha = Math.max(0, fade) * s.brightness;
                                // tail direction opposite velocity
                                const tailX = s.x - s.vx * (s.length / 10);
                                const tailY = s.y - s.vy * (s.length / 10);
                                const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                                grad.addColorStop(0, "rgba(255,255,255,".concat(alpha, ")"));
                                grad.addColorStop(0.3, "rgba(180,220,255,".concat(alpha * 0.6, ")"));
                                grad.addColorStop(1, 'rgba(180,220,255,0)');
                                ctx.strokeStyle = grad;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(s.x, s.y);
                                ctx.lineTo(tailX, tailY);
                                ctx.stroke();
                                // head glow
                                const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
                                glow.addColorStop(0, "rgba(255,255,255,".concat(alpha, ")"));
                                glow.addColorStop(1, 'rgba(255,255,255,0)');
                                ctx.fillStyle = glow;
                                ctx.beginPath();
                                ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }["StarryBackground.useEffect.animate"]);
                    } else {
                        // Floating particles for light mode
                        particlesRef.current.forEach({
                            "StarryBackground.useEffect.animate": (particle)=>{
                                // Update position
                                particle.x += particle.speedX;
                                particle.y += particle.speedY;
                                // Wrap around screen
                                if (particle.x > canvas.width) particle.x = 0;
                                if (particle.x < 0) particle.x = canvas.width;
                                if (particle.y > canvas.height) particle.y = 0;
                                if (particle.y < 0) particle.y = canvas.height;
                                // Update opacity
                                particle.opacity += Math.sin(time * 0.001) * 0.01;
                                particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
                                ctx.beginPath();
                                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                                const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
                                gradient.addColorStop(0, "rgba(59, 130, 246, ".concat(particle.opacity, ")"));
                                gradient.addColorStop(0.5, "rgba(147, 197, 253, ".concat(particle.opacity * 0.5, ")"));
                                gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
                                ctx.fillStyle = gradient;
                                ctx.fill();
                            }
                        }["StarryBackground.useEffect.animate"]);
                    }
                    animationRef.current = requestAnimationFrame(animate);
                }
            }["StarryBackground.useEffect.animate"];
            resizeCanvas();
            createStars();
            createParticles();
            animate(0);
            const handleResize = {
                "StarryBackground.useEffect.handleResize": ()=>{
                    resizeCanvas();
                    createStars();
                    createParticles();
                }
            }["StarryBackground.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "StarryBackground.useEffect": ()=>{
                    window.removeEventListener('resize', handleResize);
                    if (nextShootTimeout.current) window.clearTimeout(nextShootTimeout.current);
                    burstTimeoutsRef.current.forEach({
                        "StarryBackground.useEffect": (id)=>window.clearTimeout(id)
                    }["StarryBackground.useEffect"]);
                    burstTimeoutsRef.current = [];
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                }
            })["StarryBackground.useEffect"];
        }
    }["StarryBackground.useEffect"], [
        theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].canvas, {
                ref: canvasRef,
                className: "fixed inset-0 pointer-events-none z-0",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: 2
                }
            }, void 0, false, {
                fileName: "[project]/src/components/StarryBackground.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none z-0",
                children: theme === 'dark' ? // Dark mode: Cosmic orbs
                [
                    ...Array(5)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10",
                        style: {
                            width: "".concat(80 + i * 20, "px"),
                            height: "".concat(80 + i * 20, "px"),
                            left: "".concat(10 + i * 15, "%"),
                            top: "".concat(20 + i * 15, "%")
                        },
                        animate: {
                            y: [
                                -20,
                                20,
                                -20
                            ],
                            rotate: [
                                0,
                                360
                            ],
                            scale: [
                                1,
                                1.1,
                                1
                            ]
                        },
                        transition: {
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }, "dark-".concat(i), false, {
                        fileName: "[project]/src/components/StarryBackground.tsx",
                        lineNumber: 357,
                        columnNumber: 13
                    }, this)) : // Light mode: Geometric shapes
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        [
                            ...Array(8)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute ".concat(i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-lg rotate-45' : 'rounded-full', " ").concat(i % 4 === 0 ? 'bg-gradient-to-br from-blue-100/30 to-cyan-100/30' : i % 4 === 1 ? 'bg-gradient-to-br from-purple-100/30 to-pink-100/30' : i % 4 === 2 ? 'bg-gradient-to-br from-green-100/30 to-emerald-100/30' : 'bg-gradient-to-br from-orange-100/30 to-yellow-100/30'),
                                style: {
                                    width: "".concat(40 + i * 15, "px"),
                                    height: "".concat(40 + i * 15, "px"),
                                    left: "".concat(5 + i * 11, "%"),
                                    top: "".concat(10 + i * 10, "%")
                                },
                                animate: {
                                    y: [
                                        -15,
                                        15,
                                        -15
                                    ],
                                    x: [
                                        -10,
                                        10,
                                        -10
                                    ],
                                    rotate: [
                                        0,
                                        180,
                                        360
                                    ],
                                    scale: [
                                        1,
                                        1.2,
                                        1
                                    ]
                                },
                                transition: {
                                    duration: 15 + i * 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.5
                                }
                            }, "light-".concat(i), false, {
                                fileName: "[project]/src/components/StarryBackground.tsx",
                                lineNumber: 382,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50/40 to-purple-50/40 blur-xl",
                            animate: {
                                scale: [
                                    1,
                                    1.3,
                                    1
                                ],
                                opacity: [
                                    0.3,
                                    0.6,
                                    0.3
                                ]
                            },
                            transition: {
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/StarryBackground.tsx",
                            lineNumber: 416,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-50/40 to-blue-50/40 blur-xl",
                            animate: {
                                scale: [
                                    1,
                                    1.4,
                                    1
                                ],
                                opacity: [
                                    0.2,
                                    0.5,
                                    0.2
                                ]
                            },
                            transition: {
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 2
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/StarryBackground.tsx",
                            lineNumber: 428,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/StarryBackground.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(StarryBackground, "I3lK7F24cJH0i0bGPrGS2nSfgdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = StarryBackground;
var _c;
__turbopack_context__.k.register(_c, "StarryBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StarryBackground.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/StarryBackground.tsx [app-client] (ecmascript)"));
}),
}]);

//# sourceMappingURL=src_components_StarryBackground_tsx_84125d22._.js.map