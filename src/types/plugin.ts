export interface PluginFeature {
  id: string;
  name: string;
  description: string;
  type: 'component' | 'service' | 'hook' | 'route';
  entryPoint: string;
}

export interface PluginPermission {
  id: string;
  name: string;
  description: string;
  type: 'read' | 'write' | 'execute' | 'admin';
  resource: string;
}

export interface PluginRoute {
  path: string;
  component: string;
  name: string;
  meta: {
    requiresAuth: boolean;
    permissions: string[];
    layout: string;
  };
}

export interface PluginHooks {
  onInstall?: string;
  onActivate?: string;
  onDeactivate?: string;
  onUninstall?: string;
}

export interface PluginSetting {
  key: string;
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  default: any;
  required: boolean;
  options?: { label: string; value: any }[];
}

export interface Plugin {
  id: number;
  pluginId: string;
  name: string;
  slug: string;
  version: string;
  description: string;
  author: string;
  homepage?: string;
  
  category: 'extension' | 'integration' | 'theme' | 'report' | 'tool' | 'widget';
  tags: string[];
  icon: string;
  iconUrl?: string;
  
  minimumCoreVersion: string;
  dependencies: string[];
  conflicts: string[];
  
  license: 'free' | 'premium';
  price?: number;
  currency: string;
  
  features: PluginFeature[];
  permissions: PluginPermission[];
  routes: PluginRoute[];
  hooks: PluginHooks;
  settings: PluginSetting[];
  
  downloads: number;
  rating?: number;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  
  fileUrl?: string;
  fileSize?: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface PluginFormData {
  pluginId: string;
  name: string;
  slug: string;
  version: string;
  description: string;
  author: string;
  homepage: string;
  
  category: Plugin['category'];
  tags: string[];
  icon: string;
  iconUrl: string;
  
  minimumCoreVersion: string;
  dependencies: string[];
  conflicts: string[];
  
  license: 'free' | 'premium';
  price: string;
  currency: string;
  
  features: PluginFeature[];
  permissions: PluginPermission[];
  routes: PluginRoute[];
  hooks: PluginHooks;
  settings: PluginSetting[];
  
  file?: File;
}

export interface PluginVersion {
  id: number;
  pluginId: number;
  version: string;
  changelog: string;
  fileUrl: string;
  fileSize: number;
  downloads: number;
  status: 'active' | 'deprecated' | 'beta';
  createdAt: string;
}

export interface PluginStats {
  totalDownloads: number;
  monthlyDownloads: number;
  rating: number;
  reviewCount: number;
  activeInstallations: number;
  downloadHistory: { date: string; count: number }[];
  revenueHistory?: { date: string; amount: number }[];
}