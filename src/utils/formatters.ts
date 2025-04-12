
/**
 * Formats industry names from kebab-case to Title Case
 */
export function formatIndustryName(industry: string): string {
  return industry
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a date to a human-readable string
 */
export function formatDate(date: Date): string {
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Gets a display name for subscription plan
 */
export function formatPlanDisplay(subscriptionPlan: string): string {
  switch (subscriptionPlan) {
    case 'trial':
      return 'Free Trial';
    case 'basic':
      return '$50 Plan';
    case 'premium':
      return '$100 Plan';
    case 'professional':
      return '$80 Plan';
    default:
      return subscriptionPlan;
  }
}
