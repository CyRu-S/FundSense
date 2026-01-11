import { useRef, useEffect } from 'react';

const ClickSpark = ({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<{ x: number, y: number, angle: number, startTime: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        // Robust sizing using ResizeObserver to handle all layout changes/scrollbars
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === canvas) {
                    const dpr = window.devicePixelRatio || 1;
                    // entry.contentRect gives accurate inner dimensions in CSS pixels
                    const { width, height } = entry.contentRect;

                    // Set actual buffer size to high-DPI
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;

                    // Reset transform to identity then scale for DPR
                    // This means all drawing commands can use logical CSS pixels
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.scale(dpr, dpr);
                }
            }
        });

        observer.observe(canvas);

        const easeFunc = (t: number) => {
            switch (easing) {
                case "linear": return t;
                case "ease-in": return t * t;
                case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default: return t * (2 - t);
            }
        };

        const createSpark = (x: number, y: number) => {
            const now = performance.now();
            for (let i = 0; i < sparkCount; i++) {
                const angle = (2 * Math.PI * i) / sparkCount;
                sparksRef.current.push({ x, y, angle, startTime: now });
            }
        };

        const handleClick = (e: MouseEvent) => {
            // Get position relative to the viewport keying off the bounding rect
            // This accounts for any offset of the canvas element itself
            const rect = canvas.getBoundingClientRect();

            // We want logical coordinates for drawing (since we scaled the context)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            createSpark(x, y);
        };

        // Attach listener to window so we catch clicks everywhere, 
        // but we map them relative to our canvas overlay
        window.addEventListener('click', handleClick);

        const draw = (time: number) => {
            const dpr = window.devicePixelRatio || 1;

            // Clear the entire canvas. 
            // Since we possess a transform (scale dpr, dpr), clearing (0,0, width, height) 
            // only clears the top-left corner if we use physical dimensions.
            // We should clear using logical dimensions (CSS pixels).
            // canvas.width is physical, so logical width is canvas.width / dpr
            const logicalWidth = canvas.width / dpr;
            const logicalHeight = canvas.height / dpr;

            ctx.clearRect(0, 0, logicalWidth, logicalHeight);

            const sparks = sparksRef.current;

            for (let i = sparks.length - 1; i >= 0; i--) {
                const spark = sparks[i];
                const elapsed = time - spark.startTime;

                if (elapsed >= duration) {
                    sparks.splice(i, 1);
                    continue;
                }

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                display: 'block'
            }}
        />
    );
};

export default ClickSpark;
