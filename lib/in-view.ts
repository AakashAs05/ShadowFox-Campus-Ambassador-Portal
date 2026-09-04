/**
 * Shared "has this scrolled into view yet" controller.
 *
 * IntersectionObserver only reports *changes* in intersection, so a fast scroll
 * can carry an element from below the fold to above it between two sampled
 * frames and never fire — leaving reveal animations stuck at opacity 0 and
 * counters stuck at zero. This sweeps every pending node on each scroll frame
 * instead, which cannot miss, and unbinds itself once nothing is left.
 */

interface Pending {
  node: HTMLElement;
  run: () => void;
}

const pending = new Set<Pending>();
let frame = 0;
let bound = false;

function sweep() {
  frame = 0;
  const limit = window.innerHeight;

  pending.forEach((entry) => {
    if (!entry.node.isConnected) {
      pending.delete(entry);
      return;
    }
    // Top edge has reached the viewport (or already passed above it).
    if (entry.node.getBoundingClientRect().top < limit) {
      pending.delete(entry);
      entry.run();
    }
  });

  if (pending.size === 0) unbind();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(sweep);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

function unbind() {
  if (!bound) return;
  bound = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/** Runs `run` once `node` reaches the viewport. Returns an unsubscribe fn. */
export function whenInView(node: HTMLElement, run: () => void): () => void {
  const entry: Pending = { node, run };
  pending.add(entry);
  bind();
  schedule();

  return () => {
    pending.delete(entry);
    if (pending.size === 0) unbind();
  };
}
