import React, { useEffect, useRef } from 'react';
import { TabData } from './types';
import useOutsideClick from './hooks/useOutsideClick';
import cx from '../../utils/cx';

type Props = {
    open: boolean;
    onClose: () => void;
    tabs: TabData[];
    onSelectTab: (index: number) => void;
    onSignIn?: () => void;
    onLogOut?: () => void;
};

export default function MobileMenu({ open, onClose, tabs, onSelectTab, onSignIn, onLogOut }: Props) {
    const panelRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(panelRef, () => {
        if (open) onClose();
    });

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!open) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
            if (e.key === 'Tab' && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      className={cx(
        'md:hidden bg-white border-t shadow-md',
        'absolute left-0 right-0 z-40'
      )}
    >
      <div className="px-4 py-4 space-y-3">
        <nav aria-label="Mobile tabs">
          {tabs.map((t, idx) => (
            <a
              key={t.id}
              href={t.href || '#'}
              onClick={(e) => {
                e.preventDefault();
                onSelectTab(idx);
                onClose();
              }}
              className="block px-2 py-3 rounded-md text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="pt-2 border-t">
          <button
            onClick={() => {
              onSignIn?.();
              onClose();
            }}
            className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>

          <button
            onClick={() => {
              onLogOut?.();
              onClose();
            }}
            className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

    
}