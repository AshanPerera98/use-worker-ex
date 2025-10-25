import { useEffect } from "react";
import Stats from "stats.js";

const useFPSMonitor = () => {
  useEffect(() => {
    const stats = new Stats();

    stats.dom.style.position = "fixed";
    stats.dom.style.right = "10px";
    stats.dom.style.top = "10px";
    stats.dom.style.left = "auto";
    stats.dom.style.zIndex = "9999";
    stats.dom.style.transform = "scale(2)";
    stats.dom.style.transformOrigin = "top right";

    document.body.appendChild(stats.dom);

    let frameId: number;

    const animate = () => {
      stats.begin();
      stats.end();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.removeChild(stats.dom);
    };
  }, []);
};

export default useFPSMonitor;
