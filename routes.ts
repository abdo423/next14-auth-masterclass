/**
 * An array of public route paths for the application.
 *
 * This array contains the paths that are accessible without authentication.
 *
 * @constant
 * @type {string[]}
 */
export const publicRoutes = ["/","/auth/verify-email"];

/**
 * An array of auth route paths for the application.
 *
 * This array contains the paths that require authentication.
 *
 * @constant
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register","/auth/error","/auth/reset","/auth/new-password"];

/**
 * The prefix for API authentication routes.
 *
 * This constant defines the base path for all authentication-related API routes.
 *
 * @constant
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login.
 *
 * This constant defines the path to which the user is redirected after a successful login.
 *
 * @constant
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
