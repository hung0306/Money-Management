import { useEffect } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function useBootstrapTooltips() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);
}
