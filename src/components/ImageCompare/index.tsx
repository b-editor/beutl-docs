import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

type ImageCompareProps = {
  /** Image shown on the left side (typically "before"). */
  before: string;
  /** Image shown on the right side (typically "after"). */
  after: string;
  /** Alt text for the before image. */
  beforeAlt?: string;
  /** Alt text for the after image. */
  afterAlt?: string;
  /** Label drawn over the before side. Pass `null` to hide. */
  beforeLabel?: ReactNode;
  /** Label drawn over the after side. Pass `null` to hide. */
  afterLabel?: ReactNode;
  /** Initial divider position as a percentage (0–100). */
  initialPosition?: number;
  /** Aspect ratio of the frame, e.g. "16 / 9". Defaults to the natural image ratio. */
  aspectRatio?: string;
  /** Caption rendered below the comparison. */
  caption?: ReactNode;
  /** Extra class name on the wrapper. */
  className?: string;
  /** Extra inline style on the wrapper. */
  style?: CSSProperties;
};

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

export default function ImageCompare({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  aspectRatio,
  caption,
  className,
  style,
}: ImageCompareProps) {
  const beforeSrc = useBaseUrl(before);
  const afterSrc = useBaseUrl(after);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(() => clamp(initialPosition));
  const sliderId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next));
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      draggingRef.current = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  const stopDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setPosition((prev) => clamp(prev - step));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setPosition((prev) => clamp(prev + step));
        break;
      case 'Home':
        event.preventDefault();
        setPosition(0);
        break;
      case 'End':
        event.preventDefault();
        setPosition(100);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const cancel = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointerup', cancel);
    window.addEventListener('pointercancel', cancel);
    return () => {
      window.removeEventListener('pointerup', cancel);
      window.removeEventListener('pointercancel', cancel);
    };
  }, []);

  const cssVars: CSSProperties = {
    ...style,
    ['--ic-position' as string]: `${position}%`,
    ...(aspectRatio ? { aspectRatio } : null),
  };

  return (
    <figure className={clsx(styles.figure, className)}>
      <div
        ref={containerRef}
        className={styles.frame}
        style={cssVars}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          className={styles.image}
          draggable={false}
          loading="lazy"
        />
        <div className={styles.beforeClip}>
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className={styles.image}
            draggable={false}
            loading="lazy"
          />
        </div>

        {beforeLabel ? (
          <span className={clsx(styles.label, styles.labelBefore)}>
            {beforeLabel}
          </span>
        ) : null}
        {afterLabel ? (
          <span className={clsx(styles.label, styles.labelAfter)}>
            {afterLabel}
          </span>
        ) : null}

        <div
          className={styles.divider}
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-controls={sliderId}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.handle} aria-hidden>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path
                fill="currentColor"
                d="M8 6 3 12l5 6V6Zm8 0v12l5-6-5-6Z"
              />
            </svg>
          </span>
        </div>

        <span id={sliderId} className={styles.srOnly}>
          {`Comparison position: ${Math.round(position)}%`}
        </span>
      </div>

      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
