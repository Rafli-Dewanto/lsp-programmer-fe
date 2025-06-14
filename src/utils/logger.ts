type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "none";

const levelPriority: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  none: 5,
};

class Logger {
  private level: LogLevel;

  constructor() {
    // Automatically set log level based on env
    this.level = process.env.NODE_ENV === "production" ? "error" : "debug";
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return levelPriority[level] >= levelPriority[this.level];
  }

  trace(...args: unknown[]) {
    if (this.shouldLog("trace")) console.trace("[TRACE]", ...args);
  }

  debug(...args: unknown[]) {
    if (this.shouldLog("debug")) console.debug("[DEBUG]", ...args);
  }

  info(...args: unknown[]) {
    if (this.shouldLog("info")) console.info("[INFO]", ...args);
  }

  warn(...args: unknown[]) {
    if (this.shouldLog("warn")) console.warn("[WARN]", ...args);
  }

  error(...args: unknown[]) {
    if (this.shouldLog("error")) console.error("[ERROR]", ...args);
  }
}

export const logger = new Logger();
