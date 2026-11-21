"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    Camera,
    RefreshCw,
    Upload,
    X,
    Flashlight,
    AlertCircle,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import jsQR from "@/lib/jsQR";

interface QRScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (scannedCode: string) => void;
}

export default function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [torchSupported, setTorchSupported] = useState(false);
    const [torchOn, setTorchOn] = useState(false);
    const [scannedFeedback, setScannedFeedback] = useState<string | null>(null);

    const playBeep = useCallback((success = true) => {
        try {
            const AudioCtx =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (success) {
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
            } else {
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.15);
            }
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch {
            // Audio autoplay blocked or unsupported
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
        setTorchOn(false);
        setTorchSupported(false);
    }, []);

    const handleSuccessCode = useCallback(
        (code: string) => {
            const cleanCode = code.trim();
            if (!cleanCode) return;

            // Trigger vibration & audio
            try {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                    navigator.vibrate([40, 60, 40]);
                }
            } catch {
                // Ignore
            }
            playBeep(true);

            setScannedFeedback(cleanCode);
            stopCamera();

            setTimeout(() => {
                setScannedFeedback(null);
                onScan(cleanCode);
                onClose();
            }, 600);
        },
        [onClose, onScan, playBeep, stopCamera]
    );

    const startCamera = useCallback(async () => {
        setCameraError(null);
        setScannedFeedback(null);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setCameraError("Camera API is not supported in this browser environment. You can upload an image or select a sample pass.");
            return;
        }

        try {
            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: { ideal: facingMode },
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
                audio: false,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setCameraActive(true);

                // Check torch capabilities
                const track = stream.getVideoTracks()[0];
                if (track && typeof track.getCapabilities === "function") {
                    const capabilities = track.getCapabilities() as { torch?: boolean };
                    if (capabilities && capabilities.torch) {
                        setTorchSupported(true);
                    }
                }
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.error("Camera access failed:", error);
            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                setCameraError("Camera permission was denied. Please allow camera access in your browser or upload a QR image.");
            } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                setCameraError("No camera device was detected. You can upload a QR image or select a preset pass.");
            } else {
                setCameraError("Unable to access camera: " + (error.message || "Unknown error"));
            }
            setCameraActive(false);
        }
    }, [facingMode]);

    // Continuous scanning loop
    useEffect(() => {
        if (!cameraActive || !isOpen) return;

        let lastScanTime = 0;
        let isProcessing = false;

        const scanFrame = () => {
            if (!videoRef.current || !canvasRef.current || scannedFeedback) {
                animFrameRef.current = requestAnimationFrame(scanFrame);
                return;
            }

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });

            if (video.readyState === video.HAVE_ENOUGH_DATA && ctx && !isProcessing) {
                const now = Date.now();
                // Throttle decode to every 120ms to reduce CPU usage
                if (now - lastScanTime > 120) {
                    lastScanTime = now;
                    isProcessing = true;

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Check if native BarcodeDetector is available
                    if ("BarcodeDetector" in window) {
                        try {
                            const BarcodeDetectorClass = (window as unknown as {
                                BarcodeDetector: new (opts: { formats: string[] }) => {
                                    detect: (source: HTMLCanvasElement) => Promise<Array<{ rawValue: string }>>;
                                };
                            }).BarcodeDetector;

                            const detector = new BarcodeDetectorClass({ formats: ["qr_code"] });
                            detector
                                .detect(canvas)
                                .then((barcodes) => {
                                    if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
                                        handleSuccessCode(barcodes[0].rawValue);
                                    }
                                    isProcessing = false;
                                })
                                .catch(() => {
                                    // Fallback to jsQR
                                    runJsQr();
                                });
                            animFrameRef.current = requestAnimationFrame(scanFrame);
                            return;
                        } catch {
                            // Fallback to jsQR
                        }
                    }

                    const runJsQr = () => {
                        try {
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                            const qr = jsQR(imageData.data, imageData.width, imageData.height, {
                                inversionAttempts: "attemptBoth",
                            });
                            if (qr && qr.data) {
                                handleSuccessCode(qr.data);
                            }
                        } catch (e) {
                            console.error("jsQR scan error:", e);
                        } finally {
                            isProcessing = false;
                        }
                    };

                    runJsQr();
                }
            }

            animFrameRef.current = requestAnimationFrame(scanFrame);
        };

        animFrameRef.current = requestAnimationFrame(scanFrame);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, [cameraActive, isOpen, scannedFeedback, handleSuccessCode]);

    // Handle camera lifecycle when modal opens / closes
    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => {
            stopCamera();
        };
    }, [isOpen, startCamera, stopCamera]);

    const handleFlipCamera = () => {
        stopCamera();
        setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    };

    const handleToggleTorch = async () => {
        if (!streamRef.current || !torchSupported) return;
        const track = streamRef.current.getVideoTracks()[0];
        if (track) {
            try {
                const nextState = !torchOn;
                await (track as unknown as { applyConstraints: (c: unknown) => Promise<void> }).applyConstraints({
                    advanced: [{ torch: nextState }],
                });
                setTorchOn(nextState);
            } catch (err) {
                console.error("Torch toggle error:", err);
            }
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) return;

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const qr = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "attemptBoth",
                });

                if (qr && qr.data) {
                    handleSuccessCode(qr.data);
                } else {
                    setCameraError("No readable QR code found in this image. Please ensure the QR is sharp and clearly visible.");
                    playBeep(false);
                }
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2.5 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />

            {/* Modal Body */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 ring-1 ring-black/5">
                {/* Header */}
                <div className="px-3.5 py-2.5 sm:px-5 sm:py-3.5 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                            <Camera className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                                QR Pass Scanner
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium">
                                Point camera at pass or upload ticket image
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0 cursor-pointer"
                        aria-label="Close scanner"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                    {/* Viewfinder Area */}
                    <div className="relative aspect-square sm:aspect-4/3 w-full bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover ${cameraActive ? "opacity-100" : "opacity-0"}`}
                            playsInline
                            muted
                            autoPlay
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Scanner Reticle & Laser */}
                        {cameraActive && !scannedFeedback && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
                                <div className="relative w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-orange-500/60 rounded-2xl flex items-center justify-center">
                                    {/* Corners */}
                                    <span className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg" />
                                    <span className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg" />
                                    <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg" />
                                    <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg" />

                                    {/* Scanning Beam Animation */}
                                    <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_12px_rgba(249,115,22,0.9)] animate-pulse" />
                                </div>
                            </div>
                        )}

                        {/* Scanned Feedback Overlay */}
                        {scannedFeedback && (
                            <div className="absolute inset-0 bg-emerald-600/90 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center animate-in fade-in zoom-in-95 duration-200">
                                <CheckCircle2 className="w-12 h-12 mb-2 animate-bounce" />
                                <p className="font-extrabold text-sm uppercase tracking-wider">Pass Code Detected!</p>
                                <p className="text-xs font-mono bg-black/30 px-3 py-1 rounded-full mt-1.5">
                                    {scannedFeedback}
                                </p>
                                <p className="text-[11px] text-emerald-100 mt-2">Auto-verifying visitor pass...</p>
                            </div>
                        )}

                        {/* Camera Error or Fallback */}
                        {cameraError && !cameraActive && (
                            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center text-slate-300 p-6 text-center space-y-3">
                                <AlertCircle className="w-10 h-10 text-orange-500" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                                        Camera Inactive
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                                        {cameraError}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={startCamera}
                                        className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 cursor-pointer"
                                    >
                                        Try Camera Again
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-700 cursor-pointer"
                                    >
                                        Upload QR Image
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Floating Viewfinder Controls */}
                        {cameraActive && (
                            <div className="absolute top-3 right-3 flex items-center gap-2">
                                {torchSupported && (
                                    <button
                                        type="button"
                                        onClick={handleToggleTorch}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                            torchOn ? "bg-amber-400 text-slate-900" : "bg-black/60 text-white hover:bg-black/80"
                                        }`}
                                        title="Toggle Torch"
                                    >
                                        <Flashlight className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleFlipCamera}
                                    className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                                    title="Switch Camera (Front/Back)"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Quick Image Upload & Presets Strip */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                        >
                            <Upload className="w-3.5 h-3.5" /> Upload QR Image
                        </button>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">
                            <Sparkles className="w-3 h-3 text-orange-600 shrink-0" />
                            <span className="truncate">Sample Passes:</span>
                        </div>
                    </div>

                    {/* Preset Pass Selector Chips — Horizontal Scroll */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
                        {[
                            { code: "PASS-2026-8841", label: "VIP Pass", color: "bg-orange-50 text-orange-700 border-orange-200" },
                            { code: "PASS-2026-7719", label: "MCOM Reward", color: "bg-purple-50 text-purple-700 border-purple-200" },
                            { code: "PASS-2026-5530", label: "Standard Day", color: "bg-blue-50 text-blue-700 border-blue-200" },
                            { code: "GBX-88219-X22", label: "Season Pass", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                            { code: "PASS-2026-1029", label: "Expired Pass", color: "bg-red-50 text-red-700 border-red-200" },
                        ].map((preset) => (
                            <button
                                key={preset.code}
                                type="button"
                                onClick={() => handleSuccessCode(preset.code)}
                                className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold border transition-all hover:scale-102 cursor-pointer whitespace-nowrap ${preset.color}`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
