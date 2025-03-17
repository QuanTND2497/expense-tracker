import passport from "../passport";

// All transaction routes require authentication
export const authenticate = passport.authenticate('jwt', { session: false });