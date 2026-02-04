// lib/utils.ts
// Utility Functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  };

  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format date to Turkish locale
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = 
    format === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric' }
      : format === 'time'
      ? { hour: '2-digit', minute: '2-digit' }
      : { day: 'numeric', month: 'short', year: 'numeric' };

  return new Intl.DateTimeFormat('tr-TR', options).format(d);
}

/**
 * Format relative time (2 saat önce, 3 gün önce)
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'şimdi';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHour < 24) return `${diffHour} saat önce`;
  if (diffDay < 7) return `${diffDay} gün önce`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} hafta önce`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)} ay önce`;
  return `${Math.floor(diffDay / 365)} yıl önce`;
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Generate random ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}_${timestamp}${randomStr}` : `${timestamp}${randomStr}`;
}

/**
 * Format number with thousand separators (Turkish style)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Turkish phone number
 */
export function isValidPhone(phone: string): boolean {
  // Turkish mobile: 5XX XXX XX XX or +90 5XX XXX XX XX
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^(\+90|0)?5\d{9}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+90')) {
    const num = cleaned.slice(3);
    return `+90 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 8)} ${num.slice(8)}`;
  }
  if (cleaned.startsWith('0')) {
    const num = cleaned.slice(1);
    return `0 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 8)} ${num.slice(8)}`;
  }
  return phone;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if user has role
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  const roleHierarchy: Record<string, number> = {
    user: 1,
    creator: 2,
    moderator: 3,
    admin: 4,
  };

  const userLevel = roleHierarchy[userRole] || 0;
  const minRequiredLevel = Math.min(...requiredRoles.map(r => roleHierarchy[r] || 0));
  
  return userLevel >= minRequiredLevel;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * Check if file is image
 */
export function isImage(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
}
