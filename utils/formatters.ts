// Format time for chat previews
export function formatTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isToday = date >= today;
  const isYesterday = date >= yesterday && date < today;
  
  if (isToday) {
    // Format as time if today (e.g., "3:45 PM")
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } else if (isYesterday) {
    // Show "Yesterday" if yesterday
    return 'Yesterday';
  } else {
    // Format as date if earlier (e.g., "5/23" or "May 23")
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

// Format time for message bubbles
export function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}