"use client";

import { type Ref, useCallback, useEffect, useImperativeHandle, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CipherTextReveal                                                   */
/* ------------------------------------------------------------------ */

interface CipherTextRevealProps {
  text: string;
  /** ms between reveal ticks [Optional, default: 50] */
  speed?: number;
  /** Scrambled chars running ahead of the revealed text [Optional, default: 2] */
  cipherCount?: number;
  /** Glyph pool for the scramble [Optional] */
  characters?: string;
  className?: string;
  /** Class for the still-scrambled portion [Optional] */
  cipherClassName?: string;
  /** Start on mount [Optional, default: true] */
  autoStart?: boolean;
  delay?: number;
  onComplete?: () => void;
  ref?: Ref<CipherTextRevealHandle>;
}

export interface CipherTextRevealHandle {
  start: () => void;
  reset: () => void;
}

/**
 * Text that decodes itself: characters reveal left to right while a short
 * window of cipher glyphs churns just ahead of the reveal edge, like a lock
 * finding its combination. Exposes start/reset through a ref handle and
 * keeps the full text in an sr-only span for screen readers.
 * @param {string} text - Final text [Required]
 * @param {number} cipherCount - Churning glyphs ahead of the edge [Optional, default: 2]
 */
export function CipherTextReveal({
  text,
  speed = 50,
  cipherCount = 2,
  characters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  cipherClassName = "",
  autoStart = true,
  delay = 0,
  onComplete,
  ref,
}: CipherTextRevealProps) {
  const [display, setDisplay] = useState("");
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(0);
  const [tailTick, setTailTick] = useState(0);

  const start = useCallback(() => {
    setRunning(true);
    setVisible(0);
    setTailTick(0);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setVisible(0);
    setTailTick(0);
    setDisplay("");
  }, []);

  useImperativeHandle(ref, () => ({ start, reset }), [start, reset]);

  useEffect(() => {
    if (!autoStart) return;
    if (delay > 0) {
      const t = setTimeout(start, delay);
      return () => clearTimeout(t);
    }
    start();
  }, [autoStart, delay, start]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      if (visible < text.length) {
        setVisible((v) => v + 1);
      } else if (tailTick < cipherCount) {
        setTailTick((t) => t + 1);
      } else {
        clearInterval(interval);
        setRunning(false);
        onComplete?.();
      }

      const remaining = Math.max(0, text.length - visible);
      const churn = Math.min(remaining, cipherCount);
      const cipher = Array.from(
        { length: churn },
        () => characters[Math.floor(Math.random() * characters.length)],
      ).join("");
      setDisplay(text.slice(0, visible) + cipher);
    }, speed);
    return () => clearInterval(interval);
  }, [running, text, visible, tailTick, cipherCount, characters, speed, onComplete]);

  const revealed = display.slice(0, visible);
  const cipher = display.slice(visible);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="inline-block whitespace-pre-wrap" aria-hidden="true">
        <span className={className}>{revealed}</span>
        <span className={cipherClassName}>{cipher}</span>
      </span>
    </>
  );
}
