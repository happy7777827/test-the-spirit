// @ts-nocheck
import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from 'framer-motion';
import './OrbitImages.css';

function generateEllipsePath(cx, cy, rx, ry) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}
function generateCirclePath(cx, cy, r) { return generateEllipsePath(cx, cy, r, r); }

function OrbitItem({ item, index, totalItems, pathValue, itemSizeValue, rotationValue, progress, fill, scaleStrength, focalPoint = 50 }) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetPercentage = useTransform(progress, (p) => (((p + itemOffset) % 100) + 100) % 100);
  const offsetDistance = useTransform(offsetPercentage, (p) => `${p}%`);
  const itemScale = useTransform(() => {
    const rawPos = offsetPercentage.get();
    const strength = scaleStrength ? scaleStrength.get() : 0;
    let dist = Math.abs(rawPos - focalPoint);
    if (dist > 50) dist = 100 - dist;
    let targetScale = 1;
    if (dist < 20) {
      const ratio = dist / 20;
      const cosCurve = (Math.cos(ratio * Math.PI) + 1) / 2;
      targetScale = 0.4 + (cosCurve * 0.6);
    } else { targetScale = 0.4; }
    return 1 - strength * (1 - targetScale);
  });
  const offsetPath = useMotionTemplate`path("${pathValue}")`;

  return (
    <motion.div className="orbit-item" style={{
      width: itemSizeValue, height: itemSizeValue, offsetPath,
      offsetRotate: '0deg', offsetAnchor: 'center center', offsetDistance,
      scale: itemScale, zIndex: useTransform(itemScale, s => Math.round(s * 100)),
      pointerEvents: 'auto'
    }}>
      <motion.div style={{ transform: useTransform(rotationValue, r => `rotate(${-r}deg)`), width: '100%', height: '100%' }}>{item}</motion.div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [], altPrefix = 'Orbiting image', shape = 'ellipse', baseWidth = 1400,
  radiusX = 700, radiusY = 170, rotation = -8, duration = 40, itemSize = 64,
  direction = 'normal', fill = true, width = 100, height = 100, className = '',
  showPath = false, pathColor = 'rgba(0,0,0,0.1)', pathWidth = 2, easing = 'linear',
  paused = false, centerContent, responsive = false,
  progressOverride, radiusXOverride, radiusYOverride, itemSizeOverride, rotationOverride, translateXOverride, focusStrength,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const currentRadiusX = radiusXOverride || useMotionValue(radiusX);
  const currentRadiusY = radiusYOverride || useMotionValue(radiusY);
  const currentItemSize = itemSizeOverride || useMotionValue(itemSize);
  const currentRotation = rotationOverride || useMotionValue(rotation);
  const currentTranslateX = translateXOverride || useMotionValue(0);

  const pathValue = useTransform([currentRadiusX, currentRadiusY], ([rx, ry]) => {
    if (shape === 'circle') return generateCirclePath(designCenterX, designCenterY, rx);
    return generateEllipsePath(designCenterX, designCenterY, rx, ry);
  });

  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => { if (containerRef.current) setScale(containerRef.current.clientWidth / baseWidth); };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const internalProgress = useMotionValue(0);
  useEffect(() => {
    if (paused || progressOverride) return;
    const controls = animate(internalProgress, direction === 'reverse' ? -100 : 100, {
      duration, ease: easing, repeat: Infinity, repeatType: 'loop',
    });
    return () => controls.stop();
  }, [internalProgress, duration, easing, direction, paused, progressOverride]);

  const activeProgress = progressOverride || internalProgress;
  const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
  const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

  const items = images.map((src, index) => (
    <motion.img key={src} src={src} alt={`${altPrefix} ${index + 1}`} draggable={false} className="orbit-image"
      whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}
      style={{ cursor: "pointer", pointerEvents: "auto" }} />
  ));

  return (
    <div ref={containerRef} className={`orbit-container ${className}`}
      style={{ width: containerWidth, height: containerHeight, aspectRatio: responsive ? '1 / 1' : undefined }}
      aria-hidden="true">
      <div className={responsive ? 'orbit-scaling-container orbit-scaling-container--responsive' : 'orbit-scaling-container'}
        style={{ width: responsive ? baseWidth : '100%', height: responsive ? baseWidth : '100%',
          transform: responsive ? `translate(-50%, -50%) scale(${scale})` : undefined }}>
        <motion.div className="orbit-rotation-wrapper" style={{ rotate: currentRotation, x: currentTranslateX }}>
          {items.map((item, index) => (
            <OrbitItem key={index} item={item} index={index} totalItems={items.length}
              pathValue={pathValue} itemSizeValue={currentItemSize} rotationValue={currentRotation}
              progress={activeProgress} fill={fill} scaleStrength={focusStrength} focalPoint={50} />
          ))}
        </motion.div>
      </div>
      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}
