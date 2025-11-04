import { nextTick } from 'vue';
import type { RouterScrollBehavior, RouteLocationNormalized } from 'vue-router';

const scrollBehavior: RouterScrollBehavior = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  savedPosition: { left: number; top: number } | null
) => {
  // If there's a hash, scroll to that element
  if (to.hash) {
    await nextTick(); // Ensure the DOM is updated before scrolling
    const element = document.querySelector(to.hash);
    if (element) {
      return { el: to.hash, behavior: 'smooth' };
    }
  }

  // Otherwise, return the top of the page
  return { top: 0 };
};

export default scrollBehavior;
