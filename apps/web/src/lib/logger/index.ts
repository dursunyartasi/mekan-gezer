// lib/logger/index.ts
// Simple in-memory logger for debugging

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
export type LogCategory = 'auth' | 'api' | 'database' | 'general';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  category: LogCategory;
  message: string;
  details?: any;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 500; // Keep last 500 logs

  log(level: LogLevel, category: LogCategory, message: string, details?: any, error?: Error) {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      level,
      category,
      message,
      details,
      stack: error?.stack,
    };

    this.logs.unshift(entry); // Add to beginning

    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Also console log
    const consoleMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    consoleMethod(`[${category.toUpperCase()}] ${message}`, details || '');

    if (error?.stack) {
      console.error(error.stack);
    }
  }

  error(category: LogCategory, message: string, details?: any, error?: Error) {
    this.log('error', category, message, details, error);
  }

  warn(category: LogCategory, message: string, details?: any) {
    this.log('warn', category, message, details);
  }

  info(category: LogCategory, message: string, details?: any) {
    this.log('info', category, message, details);
  }

  debug(category: LogCategory, message: string, details?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', category, message, details);
    }
  }

  getLogs(filters?: {
    level?: LogLevel;
    category?: LogCategory;
    limit?: number;
  }): LogEntry[] {
    let filtered = this.logs;

    if (filters?.level) {
      filtered = filtered.filter(log => log.level === filters.level);
    }

    if (filters?.category) {
      filtered = filtered.filter(log => log.category === filters.category);
    }

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  clearLogs() {
    this.logs = [];
  }
}

// Singleton instance
export const logger = new Logger();
