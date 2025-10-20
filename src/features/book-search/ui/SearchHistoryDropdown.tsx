"use client";

import { useRef, useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";

interface SearchHistoryDropdownProps {
  history: Array<{ id: string; query: string; timestamp: number }>;
  onSelectQuery: (query: string) => void;
  onRemoveQuery: (id: string) => void;
  onClearHistory: () => void;
  isOpen: boolean;
  onClose: () => void;
  focusedIndex?: number;
  onFocusChange?: (index: number) => void;
  className?: string;
}

export function SearchHistoryDropdown({
  history,
  onSelectQuery,
  onRemoveQuery,
  isOpen,
  onClose,
  focusedIndex = -1,
  onFocusChange,
  className,
}: SearchHistoryDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen || history.length === 0) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "w-[470px]",
        "absolute top-full left-[50%] translate-x-[-50%] rounded-none translate-y-[-10px] right-0 z-50  bg-[#F2F4F6] shadow-lg",
        className
      )}
      role="listbox"
      aria-label="검색 기록 목록"
    >
      <div className="p-2">
        <div className="space-y-1 h-full">
          {history.map((item, index) => {
            const isFocused = index === focusedIndex;
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-between group  px-2 py-1.5 cursor-pointer transition-colors",
                  isFocused
                    ? "bg-brand-primary/10 ring-1 ring-brand-primary"
                    : "hover:bg-gray-100"
                )}
                onClick={() => onSelectQuery(item.query)}
                onMouseEnter={() => onFocusChange?.(index)}
                // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                role="option"
                tabIndex={-1}
                aria-label={`"${item.query}" 검색어 선택`}
                aria-selected={isFocused}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectQuery(item.query);
                  }
                }}
              >
                <div className="flex pl-6 items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm text-[#8D94A0] truncate">
                    {item.query}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveQuery(item.id);
                  }}
                  className="h-6 w-6 p-0"
                  aria-label={`"${item.query}" 검색어 삭제`}
                  title={`"${item.query}" 검색어 삭제`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
