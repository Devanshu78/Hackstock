/**
 * Centralized cache key management
 * This ensures consistency across the application
 */

export const CACHE_KEYS = {
  // Components
  COMPONENTS_ALL: "components:all",
  COMPONENT_BY_ID: (id) => `component:${id}`,

  // Users/Students
  USER_BY_ID: (id) => `user:${id}`,
  USER_PROFILE: (id) => `user:${id}:profile`,
  USER_PROJECTS: (id) => `user:${id}:projects`,
  ALL_USERS: "users:all",

  // Projects
  PROJECT_BY_ID: (id) => `project:${id}`,
  PROJECTS_ALL: "projects:all",
  PROJECTS_BY_USER: (userId) => `projects:user:${userId}`,
  PROJECTS_BY_TEACHER: (teacherId) => `projects:teacher:${teacherId}`,

  // Events
  EVENT_ACTIVE: "event:active",
  EVENT_ALL: "events:all",
  EVENT_BY_ID: (id) => `event:${id}`,

  // Bidding & Winners
  WINNERS_ALL: "winners:all",
  WINNERS_BY_USER: (userId) => `winners:user:${userId}`,
  BIDDING_RESULTS: "bidding:results",

  // Results
  RESULTS_ALL: "results:all",
  RESULT_BY_ENROLLMENT: (enrollment) => `result:enrollment:${enrollment}`,

  // Aggregates
  AGGREGATES: "aggregates:all",

  // Teachers
  TEACHER_BY_ID: (id) => `teacher:${id}`,
  TEACHER_PROJECTS: (id) => `teacher:${id}:projects`,
};

/**
 * Cache TTL (Time To Live) in seconds
 */
export const CACHE_TTL = {
  SHORT: 60, // 1 minute - for frequently changing data
  MEDIUM: 300, // 5 minutes - for moderately changing data
  LONG: 1800, // 30 minutes - for rarely changing data
  VERY_LONG: 3600, // 1 hour - for static data
  DAY: 86400, // 24 hours - for very static data
};

/**
 * Cache invalidation patterns
 */
export const CACHE_PATTERNS = {
  ALL_COMPONENTS: "component*",
  ALL_USERS: "user*",
  ALL_PROJECTS: "project*",
  ALL_EVENTS: "event*",
  ALL_WINNERS: "winner*",
  ALL_RESULTS: "result*",
  USER_SPECIFIC: (userId) => `*user:${userId}*`,
  PROJECT_SPECIFIC: (projectId) => `*project:${projectId}*`,
};

export default { CACHE_KEYS, CACHE_TTL, CACHE_PATTERNS };

