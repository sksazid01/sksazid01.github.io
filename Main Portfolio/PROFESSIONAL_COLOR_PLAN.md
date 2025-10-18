# Professional Color Scheme Update

## Problem
Current portfolio uses too many vibrant gradient backgrounds (red-orange, purple-pink, blue-cyan, etc.) that look unprofessional and overwhelming.

## Solution
Replace with clean, professional color scheme:

### Standard Professional Colors

**Light Mode:**
- Primary Background: White (#FFFFFF)
- Secondary Background: Light Gray (#F9FAFB, #F3F4F6)
- Card Background: White with subtle border
- Text: Dark Gray (#111827, #374151, #6B7280)
- Accent: Professional Blue (#2563EB, #3B82F6)
- Success: Professional Green (#059669, #10B981)
- Warning: Professional Orange (#EA580C, #F97316)

**Dark Mode:**
- Primary Background: Dark Navy (#0F172A, #1E293B)
- Secondary Background: Slightly lighter (#1E293B, #334155)
- Card Background: #1E293B with subtle border
- Text: Light Gray (#F1F5F9, #CBD5E1, #94A3B8)
- Accent: Light Blue (#60A5FA, #93C5FD)
- Success: Light Green (#34D399, #6EE7B7)
- Warning: Light Orange (#FB923C, #FDBA74)

### Card Design Standards

**Instead of:**
```tsx
bg-gradient-to-r from-red-500 to-orange-500
```

**Use:**
```tsx
bg-white dark:bg-gray-800 
border border-gray-200 dark:border-gray-700
```

**Instead of:**
```tsx
bg-gradient-to-r from-purple-500 to-pink-500
```

**Use:**
```tsx
bg-blue-600 dark:bg-blue-500 // Solid professional blue
```

### Components to Update

1. **CodingStatsWidget.tsx** - Remove purple-pink gradients
2. **CodeforcesWidget.tsx** - Remove red-orange gradients  
3. **CodeChefWidget.tsx** - Remove yellow-orange gradients
4. **VJudgeWidget.tsx** - Remove blue-purple gradients
5. **AchievementsSection.tsx** - Remove all card header gradients
6. **ProfessionalAchievements.tsx** - Remove achievement header gradients
7. **Contact.tsx** - Remove contact info card gradients

### Implementation Plan

For each widget/card:
1. Replace gradient background with solid white/gray
2. Add subtle border for definition
3. Use single accent color (blue) for highlights
4. Keep text readable with proper contrast
5. Use icons with subtle colors instead of gradients

