export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

export function trackToolUsage(toolSlug: string, action: "upload" | "process_success" | "download", details: Record<string, any> = {}) {
  trackEvent("tool_interaction", {
    tool_slug: toolSlug,
    action_type: action,
    ...details,
  });
}
