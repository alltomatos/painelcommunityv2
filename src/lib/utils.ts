import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Gera um ID incremental simples (mock)
let idCounter = 1000;
export function generateId() {
  return ++idCounter;
}

// Funções mock para manipulação de plugins (array local)
export function addPlugin(plugins, plugin) {
  return [...plugins, { ...plugin, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
}

export function updatePlugin(plugins, id, data) {
  return plugins.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p));
}

export function removePlugin(plugins, id) {
  return plugins.filter((p) => p.id !== id);
}

export function getPluginById(plugins, id) {
  return plugins.find((p) => p.id === id);
}
