/**
 * Framer Motion feature bundle, isolated in its own module so `LazyMotion`
 * can load it as a separate async chunk. This keeps the ~30KB of animation
 * features off the initial/critical bundle — pages render immediately with
 * the tiny `m` component, and animations arm once this chunk arrives.
 *
 * `domMax` (not `domAnimation`) because the UI relies on shared-layout
 * animations (`layoutId` nav/tab pills).
 */
import { domMax } from "framer-motion";

export default domMax;
