import { useState, useRef, useEffect } from "react";
import "./style.css";
import API_BASE from "./API";
import { FaSnapchatGhost } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

const HISTORY_KEY = "mediaDL:history";

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadError, setDownloadError] = useState("");
  const eventSourceRef = useRef(null);
  const [downloadedState, setDownloadedState] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const downloadResetRef = useRef(null);
  const errorResetRef = useRef(null);
  const copyResetRef = useRef(null);
  const [downloadSpeed, setDownloadSpeed] = useState("0 KB/s");
  const [estimatedTime, setEstimatedTime] = useState("");
  const progressIntervalRef = useRef(null);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isRealProgress, setIsRealProgress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const mediaTypeIcons = {
    Reel: "fa-solid fa-film",
    Video: "fa-solid fa-video",
    Photo: "fa-regular fa-image",
    Audio: "fa-solid fa-music",
    Shorts: "fa-solid fa-bolt",
    GIF: "fa-solid fa-images",
    Story: "fa-solid fa-book-open",
    Watch: "fa-solid fa-tv",
    Post: "fa-solid fa-file-lines",
    Spotlight: "fa-solid fa-star",
  };

  const platforms = {
    instagram: {
      name: "Instagram",
      color:
        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      bgColor: "#E1306C",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
      options: ["Reel", "Video", "Photo", "Audio"],
    },
    linkedin: {
      name: "LinkedIn",
      color: "#0A66C2",
      bgColor: "#0A66C2",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
      options: ["Post", "Video", "Photo", "Audio"],
    },
    facebook: {
      name: "Facebook",
      color: "#1877F2",
      bgColor: "#1877F2",
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
      options: ["Reel", "Video", "Photo", "Audio"],
    },
    youtube: {
      name: "YouTube",
      color: "#FF0000",
      bgColor: "#FF0000",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
      options: ["Video", "Shorts", "Photo", "Audio"],
    },
    twitter: {
      name: "Twitter / X",
      color: "#000000",
      bgColor: "#000000",
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
      options: ["Post", "Video", "Photo", "Audio"],
    },
    snapchat: {
      name: "Snapchat",
      color: "#FFFC00",
      bgColor: "#FFFC00",
      icon: <FaSnapchatGhost style={{ color: "black", fontSize: "24px" }} />,
      options: ["Story", "Spotlight", "Photo", "Audio"],
    },
  };

  // Prevent body scroll when history is open
  useEffect(() => {
    if (openHistory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openHistory]);

  // Start simulated progress
  const startSimulatedProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setSimulatedProgress(0);
    setIsRealProgress(false);

    // Start from 0%
    progressIntervalRef.current = setInterval(() => {
      setSimulatedProgress((prev) => {
        // Simulate download progress
        if (prev < 85) {
          // Slow down as we get closer to 85%
          const increment = prev < 30 ? 2 : prev < 60 ? 1.5 : 0.8;
          return Math.min(prev + increment, 85);
        }
        return prev;
      });
    }, 200);
  };

  // Update progress based on simulated or real value
  const updateDisplayProgress = () => {
    if (isRealProgress) {
      return progress;
    }
    return simulatedProgress;
  };

  const closeModal = () => {
    // Clear all intervals and refs
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    if (downloadResetRef.current) {
      clearTimeout(downloadResetRef.current);
      downloadResetRef.current = null;
    }

    if (errorResetRef.current) {
      clearTimeout(errorResetRef.current);
      errorResetRef.current = null;
    }

    setSelectedPlatform(null);
    setSelectedMediaType("");
    setMediaUrl("");
    setIsDownloading(false);
    setIsProcessing(false);
    setProgress(0);
    setSimulatedProgress(0);
    setDownloadError("");
    setDownloadSpeed("0 KB/s");
    setEstimatedTime("");
    setDownloadedState(false);
    setDownloadMessage("");
    setIsRealProgress(false);
  };

  useEffect(() => {
    if (!downloadError) return;

    if (errorResetRef.current) {
      clearTimeout(errorResetRef.current);
    }

    errorResetRef.current = setTimeout(() => {
      setDownloadError("");
      errorResetRef.current = null;
    }, 2000);

    return () => {
      if (errorResetRef.current) {
        clearTimeout(errorResetRef.current);
        errorResetRef.current = null;
      }
    };
  }, [downloadError]);

  const triggerBrowserDownload = (downloadUrl, filename = "media.mp4") => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = async () => {
    if (!mediaUrl || !selectedMediaType || isDownloading) return;

    // Reset states
    if (downloadResetRef.current) {
      clearTimeout(downloadResetRef.current);
      downloadResetRef.current = null;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setDownloadedState(false);
    setDownloadMessage("");
    setDownloadError("");
    setIsDownloading(true);
    setIsProcessing(true);
    setProgress(0);
    setSimulatedProgress(0);
    setDownloadSpeed("0 KB/s");
    setEstimatedTime("");
    setIsRealProgress(false);

    // Start simulated progress immediately
    startSimulatedProgress();

    try {
      let cleanUrl = mediaUrl.trim().replace(/^x+https?:\/\//, "https://");

      // Send request to backend
      const res = await fetch(`${API_BASE}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: cleanUrl,
          mediaType: selectedMediaType,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Download failed");
      }

      const { job_id, filename } = data;
      const safeFileUrl = `${API_BASE}/files/${encodeURIComponent(
        filename || "media"
      )}`;

      // Setup progress tracking
      const es = new EventSource(`${API_BASE}/progress/${job_id}`);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        console.log("Progress update:", payload);

        if (typeof payload.percent === "number" && payload.percent > 0) {
          // Switch to real progress when we get actual updates
          if (!isRealProgress) {
            setIsRealProgress(true);
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
          }

          setProgress(payload.percent);

          // Update download speed estimation
          if (payload.percent > 0) {
            const speed = Math.random() * 800 + 200; // Simulated speed
            setDownloadSpeed(`${speed.toFixed(0)} KB/s`);

            // Calculate estimated time
            const remainingPercent = 100 - payload.percent;
            if (remainingPercent > 0) {
              const secondsRemaining = (
                remainingPercent /
                (payload.percent / 60)
              ).toFixed(0);
              if (secondsRemaining > 60) {
                setEstimatedTime(`${Math.ceil(secondsRemaining / 60)}m`);
              } else {
                setEstimatedTime(`${secondsRemaining}s`);
              }
            }
          }
        }

        if (payload.status === "done") {
          // Clear simulated progress
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }

          // Set to 100%
          setProgress(100);
          setSimulatedProgress(100);
          setIsRealProgress(true);

          es.close();
          eventSourceRef.current = null;

          // Small delay before triggering download for better UX
          setTimeout(() => {
            // Trigger browser download
            triggerBrowserDownload(safeFileUrl, filename || "media");
            addToHistory(cleanUrl);

            setIsDownloading(false);
            setIsProcessing(false);
            setDownloadedState(true);
            setDownloadMessage("");

            downloadResetRef.current = setTimeout(() => {
              setDownloadedState(false);
              setDownloadMessage("");
            }, 3000);
          }, 500);
        }

        if (payload.status === "error") {
          // Clear simulated progress
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }

          es.close();
          eventSourceRef.current = null;
          setIsDownloading(false);
          setIsProcessing(false);
          setDownloadError(payload.error || "Download failed");
        }
      };

      es.onerror = () => {
        // Clear simulated progress
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }

        es.close();
        eventSourceRef.current = null;
        setIsDownloading(false);
        setIsProcessing(false);
        setDownloadError("Connection lost. Please try again.");
      };
    } catch (err) {
      // Clear simulated progress
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setIsDownloading(false);
      setIsProcessing(false);
      setDownloadError(err.message || "Download failed");
      console.error("Download error:", err);
    }
  };

  // Get current progress for display
  const displayProgress = updateDisplayProgress();

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(id);
      if (copyResetRef.current) {
        clearTimeout(copyResetRef.current);
      }
      copyResetRef.current = setTimeout(() => {
        setCopiedIndex(null);
        copyResetRef.current = null;
      }, 1200);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) {
        setHistory(saved);
      }
    } catch (err) {
      console.error("Failed to parse history:", err);
    }
  }, []);

  const addToHistory = (url) => {
    if (!url) return;

    const newItem = {
      title: url,
      desc: `${selectedPlatform || "Platform"} - ${selectedMediaType || "Media"}`,
      date: new Date().toLocaleDateString(),
      ts: Date.now(),
    };

    setHistory((prev) => {
      const deduped = prev.filter((item) => item.title !== url);
      const updated = [newItem, ...deduped].slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  // Handle history panel scroll
const handleHistoryScroll = (e) => {
  e.stopPropagation();

  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  const isAtTop = scrollTop === 0;
  const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

  // DO NOT preventDefault in passive listeners
};


  return (
    <div className="w-full grid-bg">
      {/* History icons */}
      <div className="relative">
        <span
          onClick={() => setOpenHistory(true)}
          className="absolute top-1 md:top-4 right-4 z-10 group cursor-pointer transition-all duration-200"
        >
          <div className="relative p-2 rounded-lg border-2 border-gray-600 hover:bg-gray-100 transition-colors duration-200">
            <img
              src="/Histrory.png"
              alt="History"
              className="md:w-8 md:h-8 w-6 h-6 transition-transform duration-200 group-hover:scale-110"
            />

            <span
              className="absolute right-full top-1/2 mr-2 -translate-y-1/2
        bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg
        opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap"
            >
              View History
            </span>
          </div>
        </span>
      </div>

      {/* History Panel with Backdrop */}
      {openHistory && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setOpenHistory(false)}
          />

          {/* History Panel */}
          <div className="fixed inset-0 z-30">
            <div
              className={`absolute top-0 right-0 h-full pt-24 w-80 bg-[#FAFAFA] text-gray-800 shadow-2xl
                transform transition-all duration-300 border-l border-gray-200 overflow-hidden
                ${openHistory ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="h-full flex flex-col">
                {/* Header with subtle shadow and better spacing */}
                <div className="p-6 border-b border-gray-300 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <img src="/Histrory.png" alt="History" className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">History</h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Previous conversations
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenHistory(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 
        transition-all duration-200 transform hover:rotate-90"
                  >
                    <i className="fa-solid fa-xmark text-lg"></i>
                  </button>
                </div>

                {/* Content Area */}
                <div
                  className="flex-1 overflow-y-auto p-4"
                  onWheel={handleHistoryScroll}
                >
                  {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-clock text-gray-400 text-2xl"></i>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No History Yet
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Your conversation history will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item) => {
                        const itemKey = `${item.title}-${item.ts || item.date || "item"}`;
                        const isCopied = copiedIndex === itemKey;
                        return (
                          <div
                            key={itemKey}
                            className="p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                          >
                            <div className="relative">
                              <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 truncate">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1 truncate">
                                    {item.desc}
                                  </p>
                                </div>

                                <div className="flex flex-col items-end gap-[8px]">
                                  <span className="text-xs text-gray-400 whitespace-nowrap">
                                    {item.date}
                                  </span>

                                  {/* Copy icon (SVG) – time ke niche */}
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(item.title, itemKey)}
                                    className={`transition ${
                                      isCopied ? "text-green-600" : "text-gray-700 hover:text-blue-500"
                                    }`}
                                    title={isCopied ? "Copied" : "Copy"}
                                    aria-label={isCopied ? "Copied" : "Copy"}
                                  >
                                    {isCopied ? (
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M7.629 13.314a1 1 0 0 1-1.414 0L3.7 10.8a1 1 0 1 1 1.415-1.414l1.807 1.807 7.962-7.962a1 1 0 0 1 1.414 1.414L7.629 13.314z" />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M12.668 10.667C12.668 9.95614 12.668 9.46258 12.6367 9.0791C12.6137 8.79732 12.5758 8.60761 12.5244 8.46387L12.4688 8.33399C12.3148 8.03193 12.0803 7.77885 11.793 7.60254L11.666 7.53125C11.508 7.45087 11.2963 7.39395 10.9209 7.36328C10.5374 7.33197 10.0439 7.33203 9.33301 7.33203H6.5C5.78896 7.33203 5.29563 7.33195 4.91211 7.36328C4.63016 7.38632 4.44065 7.42413 4.29688 7.47559L4.16699 7.53125C3.86488 7.68518 3.61186 7.9196 3.43555 8.20703L3.36524 8.33399C3.28478 8.49198 3.22795 8.70352 3.19727 9.0791C3.16595 9.46259 3.16504 9.95611 3.16504 10.667V13.5C3.16504 14.211 3.16593 14.7044 3.19727 15.0879C3.22797 15.4636 3.28473 15.675 3.36524 15.833L3.43555 15.959C3.61186 16.2466 3.86474 16.4807 4.16699 16.6348L4.29688 16.6914C4.44063 16.7428 4.63025 16.7797 4.91211 16.8027C5.29563 16.8341 5.78896 16.835 6.5 16.835H9.33301C10.0439 16.835 10.5374 16.8341 10.9209 16.8027C11.2965 16.772 11.508 16.7152 11.666 16.6348L11.793 16.5645C12.0804 16.3881 12.3148 16.1351 12.4688 15.833L12.5244 15.7031C12.5759 15.5594 12.6137 15.3698 12.6367 15.0879C12.6681 14.7044 12.668 14.211 12.668 13.5V10.667ZM13.998 12.665C14.4528 12.6634 14.8011 12.6602 15.0879 12.6367C15.4635 12.606 15.675 12.5492 15.833 12.4688L15.959 12.3975C16.2466 12.2211 16.4808 11.9682 16.6348 11.666L16.6914 11.5361C16.7428 11.3924 16.7797 11.2026 16.8027 10.9209C16.8341 10.5374 16.835 10.0439 16.835 9.33301V6.5C16.835 5.78896 16.8341 5.29563 16.8027 4.91211C16.7797 4.63025 16.7428 4.44063 16.6914 4.29688L16.6348 4.16699C16.4807 3.86474 16.2466 3.61186 15.959 3.43555L15.833 3.36524C15.675 3.28473 15.4636 3.22797 15.0879 3.19727C14.7044 3.16593 14.211 3.16504 13.5 3.16504H10.667C9.9561 3.16504 9.46259 3.16595 9.0791 3.19727C8.79739 3.22028 8.6076 3.2572 8.46387 3.30859L8.33399 3.36524C8.03176 3.51923 7.77886 3.75343 7.60254 4.04102L7.53125 4.16699C7.4508 4.32498 7.39397 4.53655 7.36328 4.91211C7.33985 5.19893 7.33562 5.54719 7.33399 6.00195H9.33301C10.022 6.00195 10.5791 6.00131 11.0293 6.03809C11.4873 6.07551 11.8937 6.15471 12.2705 6.34668L12.4883 6.46875C12.984 6.7728 13.3878 7.20854 13.6533 7.72949L13.7197 7.87207C13.8642 8.20859 13.9292 8.56974 13.9619 8.9707C13.9987 9.42092 13.998 9.97799 13.998 10.667V12.665ZM18.165 9.33301C18.165 10.022 18.1657 10.5791 18.1289 11.0293C18.0961 11.4302 18.0311 11.7914 17.8867 12.1279L17.8203 12.2705C17.5549 12.7914 17.1509 13.2272 16.6553 13.5313L16.4365 13.6533C16.0599 13.8452 15.6541 13.9245 15.1963 13.9619C14.8593 13.9895 14.4624 13.9935 13.9951 13.9951C13.9935 14.4624 13.9895 14.8593 13.9619 15.1963C13.9292 15.597 13.864 15.9576 13.7197 16.2939L13.6533 16.4365C13.3878 16.9576 12.9841 17.3941 12.4883 17.6982L12.2705 17.8203C11.8937 18.0123 11.4873 18.0915 11.0293 18.1289C10.5791 18.1657 10.022 18.165 9.33301 18.165H6.5C5.81091 18.165 5.25395 18.1657 4.80371 18.1289C4.40306 18.0962 4.04235 18.031 3.70606 17.8867L3.56348 17.8203C3.04244 17.5548 2.60585 17.151 2.30176 16.6553L2.17969 16.4365C1.98788 16.0599 1.90851 15.6541 1.87109 15.1963C1.83431 14.746 1.83496 14.1891 1.83496 13.5V10.667C1.83496 9.978 1.83432 9.42091 1.87109 8.9707C1.90851 8.5127 1.98772 8.10625 2.17969 7.72949L2.30176 7.51172C2.60586 7.0159 3.04236 6.6122 3.56348 6.34668L3.70606 6.28027C4.04237 6.136 4.40303 6.07083 4.80371 6.03809C5.14051 6.01057 5.53708 6.00551 6.00391 6.00391C6.00551 5.53708 6.01057 5.14051 6.03809 4.80371C6.0755 4.34588 6.15483 3.94012 6.34668 3.56348L6.46875 3.34473C6.77282 2.84912 7.20856 2.44514 7.72949 2.17969L7.87207 2.11328C8.20855 1.96886 8.56979 1.90385 8.9707 1.87109C9.42091 1.83432 9.978 1.83496 10.667 1.83496H13.5C14.1891 1.83496 14.746 1.83431 15.1963 1.87109C15.6541 1.90851 16.0599 1.98788 16.4365 2.17969L16.6553 2.30176C17.151 2.60585 17.5548 3.04244 17.8203 3.56348L17.8867 3.70606C18.031 4.04235 18.0962 4.40306 18.1289 4.80371C18.1657 5.25395 18.165 5.81091 18.165 6.5V9.33301Z"></path>
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-300 bg-white/80">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 
            rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-trash text-sm"></i>
                    Clear All History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-xl m-2">
            <h3 className="text-lg font-semibold mb-2">Clear History?</h3>
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  clearHistory();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16 mt-28">
        <span className="tag accent-orange text-white mb-6 inline-block">
          DASHBOARD
        </span>

        <h2
          className="md:text-7xl text-[46px] font-bold md:mb-6 mb-[8px] px-2"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="900"
        >
          Welcome to{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mediaDL
          </span>
        </h2>

        <p
          className="md:text-xl text-[18px] text-gray-600 max-w-2xl mx-auto px-4"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="900"
        >
          Manage your downloads, track progress, and access all mediaDL features
          in one place.
        </p>
      </div>

      <div className="rounded-3xl w-full max-w-7xl mx-auto px-6 mb-6">
        <div
          className="flex items-center gap-3 mb-12 justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="900"
        >
          <div className="md:w-14 md:h-14 w-12 h-12 accent-purple rounded-xl flex items-center justify-center">
            <svg
              className="md:w-8 md:h-8 w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
          <h3 className="md:text-4xl text-3xl font-bold">
            Supported Platforms
          </h3>
        </div>

        <div className="feature-grid">
          <div
            className="bento-card cursor-pointer transition-all duration-700 ease-out hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("instagram")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ background: platforms.instagram.color }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.instagram.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">Instagram</h4>
            <p className="text-gray-600">
              Download Reels, Stories, IGTV videos and photos in HD quality.
            </p>
          </div>

          <div
            className="bento-card cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("linkedin")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: platforms.linkedin.bgColor }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.linkedin.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">LinkedIn</h4>
            <p className="text-gray-600">
              Download LinkedIn videos and posts for offline viewing.
            </p>
          </div>

          <div
            className="bento-card cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("facebook")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: platforms.facebook.bgColor }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.facebook.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">Facebook</h4>
            <p className="text-gray-600">
              Save Facebook videos, Reels and Watch content easily.
            </p>
          </div>

          <div
            className="bento-card cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("youtube")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: platforms.youtube.bgColor }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.youtube.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">YouTube</h4>
            <p className="text-gray-600">
              Download YouTube videos and Shorts in multiple formats.
            </p>
          </div>

          <div
            className="bento-card cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("twitter")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: platforms.twitter.bgColor }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.twitter.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">Twitter / X</h4>
            <p className="text-gray-600">
              Download videos and GIFs from tweets in high quality.
            </p>
          </div>

          <div
            className="bento-card cursor-pointer hover:scale-105 transition-all duration-700 ease-out"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
            onClick={() => setSelectedPlatform("snapchat")}
          >
            <div
              className="w-14 h-14 mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: platforms.snapchat.bgColor }}
            >
              <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                {platforms.snapchat.icon}
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-2">Snapchat</h4>
            <p className="text-gray-600">
              Save Snapchat videos and stories in high quality.
            </p>
          </div>
        </div>
      </div>

      {selectedPlatform && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:w-9 md:h-9 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-red-500 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ background: platforms[selectedPlatform].color }}
              >
                <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24">
                  {platforms[selectedPlatform].icon}
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {platforms[selectedPlatform].name}
              </h3>
              <p className="text-gray-600 text-sm">
                Select media type and paste your link
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Paste {platforms[selectedPlatform].name} URL
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={`https://${selectedPlatform}.com/...`}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  disabled={isDownloading}
                />

                {mediaUrl && !isDownloading && (
                  <button
                    type="button"
                    onClick={() => setMediaUrl("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-xl"
                  >
                    <i className="fa-solid fa-x text-[17px]"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Select Media Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platforms[selectedPlatform].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedMediaType(option)}
                    disabled={isDownloading}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      selectedMediaType === option
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <i
                        className={`${
                          mediaTypeIcons[option] || "fa-solid fa-circle"
                        } text-[15px]`}
                      ></i>
                      <span>{option}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {downloadError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm animate-fadeIn">
                {downloadError}
              </div>
            )}

            {downloadMessage && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm animate-fadeIn">
                {downloadMessage}
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={!mediaUrl || !selectedMediaType || isDownloading}
              className={`relative w-full py-4 rounded-xl font-bold text-white transition-all duration-300 overflow-hidden ${
                mediaUrl && selectedMediaType && !isDownloading
                  ? "bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-300 cursor-not-allowed"
              } ${
                downloadedState
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 scale-[1.02]"
                  : ""
              }`}
            >
              {/* Progress bar background */}
              {(isDownloading || isProcessing) && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/50 via-orange-300/20 to-transparent transition-all duration-300"
                  style={{ width: `${displayProgress}%` }}
                />
              )}

              <div className="relative flex items-center justify-center gap-3">
                {downloadedState ? (
                  <>
                    <div className="">
                      <svg
                        className="w-6 h-6 text-white font-bold"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-lg font-bold">Download Complete!</span>
                  </>
                ) : isDownloading || isProcessing ? (
                  <>
                    <div className="relative">
                      <VscLoading className="animate-spin" />
                    </div>
                    <span className="font-medium">
                      {isRealProgress ? "Downloading" : "Processing"}{" "}
                      {Math.round(displayProgress)}%
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="text-lg">
                      Download {selectedMediaType || "Media"}
                    </span>
                  </>
                )}
              </div>
            </button>

            {/* Additional status info */}
            {(isDownloading || isProcessing) && (
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
}