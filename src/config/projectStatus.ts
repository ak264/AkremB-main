// Project status configuration
export interface ProjectStatusConfig {
  id: string;
  label: string;
  emoji: string;
  color: string;
  darkColor: string;
  category: 'planning' | 'in-progress' | 'completed';
}

export interface StatusCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  darkColor: string;
}

// Status categories
export const statusCategories: Record<string, StatusCategory> = {
  planning: {
    id: 'planning',
    label: 'Planning',
    emoji: '🩵',
    color: '#B3DDF2',  // Light blue
    darkColor: '#7FBFE0'
  },
  'in-progress': {
    id: 'in-progress',
    label: 'In Progress',
    emoji: '🟠',
    color: '#FFB366',  // Warm orange
    darkColor: '#FF9933'
  },
  completed: {
    id: 'completed',
    label: 'Completed',
    emoji: '💚',
    color: '#B7E2C3',  // Light green
    darkColor: '#8ED1A2'
  }
};

// Project statuses
export const projectStatuses: ProjectStatusConfig[] = [
  // Planning
  {
    id: 'daydream',
    label: 'Daydream',
    emoji: '💭',
    color: '#B3DDF2',
    darkColor: '#7FBFE0',
    category: 'planning'
  },
  {
    id: 'thoughts-brewing',
    label: 'Thoughts Brewing',
    emoji: '☕️',
    color: '#B3DDF2',
    darkColor: '#7FBFE0',
    category: 'planning'
  },
  {
    id: 'strategizing',
    label: 'Strategizing',
    emoji: '♟️',
    color: '#B3DDF2',
    darkColor: '#7FBFE0',
    category: 'planning'
  },
  
  // In Progress
  {
    id: 'actively-building',
    label: 'Actively Building',
    emoji: '🏃🏽‍♂️',
    color: '#FFB366',
    darkColor: '#FF9933',
    category: 'in-progress'
  },
  {
    id: 'back-burner',
    label: 'Back Burner',
    emoji: '🍲',
    color: '#FFB366',
    darkColor: '#FF9933',
    category: 'in-progress'
  },
  {
    id: 'proudly-shipped',
    label: 'Proudly Shipped',
    emoji: '📦🚀',
    color: '#FFB366',
    darkColor: '#FF9933',
    category: 'in-progress'
  },
  
  // Completed
  {
    id: 'on-ice',
    label: 'On Ice',
    emoji: '❄️',
    color: '#B7E2C3',
    darkColor: '#8ED1A2',
    category: 'completed'
  },
  {
    id: 'sunsetted',
    label: 'Sunsetted',
    emoji: '🌅',
    color: '#B7E2C3',
    darkColor: '#8ED1A2',
    category: 'completed'
  },
  {
    id: 'closed-chapter',
    label: 'Closed Chapter',
    emoji: '📕',
    color: '#B7E2C3',
    darkColor: '#8ED1A2',
    category: 'completed'
  }
];

// Lookup function to get status by ID
export function getStatusById(id: string): ProjectStatusConfig | undefined {
  return projectStatuses.find(status => status.id === id);
}

// Lookup function to get status category by ID
export function getCategoryById(id: string): StatusCategory | undefined {
  return statusCategories[id];
}

// Get all statuses in a category
export function getStatusesByCategory(categoryId: string): ProjectStatusConfig[] {
  return projectStatuses.filter(status => status.category === categoryId);
}

// Legacy status mapping (for backwards compatibility)
export const legacyStatusMapping: Record<string, string> = {
  'planned': 'strategizing',
  'in-progress': 'actively-building',
  'completed': 'closed-chapter'
};
