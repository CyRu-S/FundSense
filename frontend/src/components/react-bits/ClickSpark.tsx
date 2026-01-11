
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
    const canvasRef = useRef(null);
    const sparksRef = useRef([]); // Stores spark objects

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial sizing

        const easeFunc = (t) => {
            switch (easing) {
                case "linear": return t;
                case "ease-in": return t * t;
                case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default: return t * (2 - t); // ease-out
            }
        };

        const createSpark = (x, y) => {
            const now = performance.now();
            for (let i = 0; i < sparkCount; i++) {
                const angle = (2 * Math.PI * i) / sparkCount;
                sparksRef.current.push({
                    x,
                    y,
                    angle,
                    startTime: now,
                });
            }
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createSpark(x, y);
        };

        // Add click listener to the parent/window or canvas based on needs.
        // Here we attach to window to capture all clicks
        window.addEventListener('click', handleClick);

        const draw = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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

                // Calculate positions
                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                // Draw spark
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
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none', // Critical: allows clicks to pass through to underlying elements
                zIndex: 9999, // Ensure it's on top visually
            }}
        />
    );
};

export default ClickSpark;
