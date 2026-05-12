"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  caption?: string;
}

export function AudioPlayer({ src, title, caption }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const node = audioRef.current;
    if (!node) return;
    const onTime = () => {
      setProgress(node.currentTime);
      setDuration(node.duration || 0);
    };
    node.addEventListener("timeupdate", onTime);
    node.addEventListener("loadedmetadata", onTime);
    node.addEventListener("ended", () => setPlaying(false));
    return () => {
      node.removeEventListener("timeupdate", onTime);
      node.removeEventListener("loadedmetadata", onTime);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        {title && (
          <div className="text-sm font-medium text-foreground mb-3">{title}</div>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="w-10 h-10 rounded-full bg-primary hover:bg-accent flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono text-muted-foreground w-10 text-right">
              {fmt(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={seek}
              className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <span className="text-xs font-mono text-muted-foreground w-10">
              {fmt(duration)}
            </span>
          </div>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
