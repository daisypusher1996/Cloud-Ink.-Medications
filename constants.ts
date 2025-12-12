

import { DashboardData } from './types';

// Supabase Configuration
export const SUPABASE_URL = 'https://fcsoloyqwnsmvgeiwsju.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjc29sb3lxd25zbXZnZWl3c2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNDM3OTQsImV4cCI6MjA4MDkxOTc5NH0.gJ3wyCS53Vb155JwIqeHxN2SBmcYNJT4-zb3ZJsWhlA';

// Empty initial state to satisfy types
export const EMPTY_DASHBOARD_DATA: DashboardData = {
  stats: [],
  orderTrends: [],
  inventoryLevels: [],
  clusterAnalysis: [],
  associationData: [],
  facts: [],
  recentOrders: [],
  lowStockItems: [],
  rawMedications: [],
  averages: {
    avgPrice: 0,
    avgStock: 0
  },
  inventoryHealth: [],
  scatterData: [],
  leadTimeData: [],
  distributionData: [],
  insights: []
};