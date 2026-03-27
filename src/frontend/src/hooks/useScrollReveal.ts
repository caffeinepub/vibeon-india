import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const classes = ["reveal", "reveal-left", "reveal-right"];
    const elements: Element[] = [];
    for (const cls of classes) {
      for (const el of document.querySelectorAll(`.${cls}`)) {
        elements.push(el);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}
