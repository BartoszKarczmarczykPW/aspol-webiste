"use client";

import { useEffect } from "react";

export default function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K - Focus on search (if FAQ search exists)
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      // Esc - Close modals, clear search, unfocus inputs
      if (event.key === 'Escape') {
        // Blur active element
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName !== 'BODY') {
          activeElement.blur();
        }

        // Clear search inputs
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement;
        if (searchInput && searchInput.value) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }

      // Ctrl/Cmd + H - Go to home/top
      if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Ctrl/Cmd + B - Go to bottom
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }

      // Alt + 1-6 - Navigate to sections
      if (event.altKey && !event.ctrlKey && !event.metaKey) {
        const sectionMap: { [key: string]: string } = {
          '1': '#about',
          '2': '#events',
          '3': '#team',
          '4': '#faq',
          '5': '#newsletter',
          '6': '#contact',
        };

        const section = sectionMap[event.key];
        if (section) {
          event.preventDefault();
          const element = document.querySelector(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null; // This component doesn't render anything
}
