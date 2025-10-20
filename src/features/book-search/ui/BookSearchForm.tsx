"use client";

import { FormEvent, useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";

import { Input } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { useSearchHistory } from "../model/useSearchHistory";
import { SearchHistoryDropdown } from "./SearchHistoryDropdown";
import { AdvancedSearchPopup } from "./AdvancedSearchPopup";
import { AdvancedSearchParams } from "../model/useAdvancedSearch";

interface BookSearchFormProps {
  query: string;
  onSubmit: (query: string) => void;
  onAdvancedSearch?: (params: {
    query: string;
    target: "title" | "publisher" | "person";
  }) => void;
}

export function BookSearchForm({
  query,
  onSubmit,
  onAdvancedSearch,
}: BookSearchFormProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState(query);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const { history, addQuery, removeQuery, clearHistory, hasHistory } =
    useSearchHistory();

  const executeSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        return;
      }

      const trimmedQuery = searchQuery.trim();
      addQuery(trimmedQuery);
      onSubmit(trimmedQuery);
      setIsHistoryOpen(false);
      setFocusedIndex(-1);
    },
    [addQuery, onSubmit]
  );

  const handleSelectQuery = useCallback(
    (selectedQuery: string) => {
      setInputValue(selectedQuery);
      setIsHistoryOpen(false);
      setFocusedIndex(-1);
      addQuery(selectedQuery);
      onSubmit(selectedQuery);
    },
    [addQuery, onSubmit]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = (formData.get("query") as string) ?? "";
    executeSearch(nextQuery);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isHistoryOpen || history.length === 0) {
        if (event.key === "Enter") {
          event.preventDefault();
          executeSearch(inputValue);
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => (prev < history.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : history.length - 1));
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < history.length) {
            handleSelectQuery(history[focusedIndex].query);
          } else {
            executeSearch(inputValue);
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsHistoryOpen(false);
          setFocusedIndex(-1);
          break;
        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          event.preventDefault();
          setFocusedIndex(history.length - 1);
          break;
      }
    },
    [
      isHistoryOpen,
      history,
      focusedIndex,
      inputValue,
      executeSearch,
      handleSelectQuery,
    ]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setFocusedIndex(-1); // Reset focus when typing

    if (newValue.trim() && hasHistory) {
      setIsHistoryOpen(true);
    } else {
      setIsHistoryOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (hasHistory) {
      setIsHistoryOpen(true);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setIsHistoryOpen(false);
    setFocusedIndex(-1);
  };

  const handleAdvancedSearch = (params: AdvancedSearchParams) => {
    if (onAdvancedSearch) {
      onAdvancedSearch(params);
    }
    setIsAdvancedSearchOpen(false);
  };

  const handleAdvancedSearchClick = () => {
    setIsAdvancedSearchOpen(true);
  };

  return (
    <div className="relative flex gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative w-[480px] flex-1">
          <Input
            ref={inputRef}
            name="query"
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="검색어를 입력하세요"
            className="flex-1 pr-10 rounded-full border-none"
            leftIcon={<Search className="h-4 w-4" />}
          />

          <SearchHistoryDropdown
            history={history}
            onSelectQuery={handleSelectQuery}
            onRemoveQuery={removeQuery}
            onClearHistory={handleClearHistory}
            isOpen={isHistoryOpen}
            onClose={() => {
              setIsHistoryOpen(false);
              setFocusedIndex(-1);
            }}
            focusedIndex={focusedIndex}
            onFocusChange={setFocusedIndex}
          />
        </div>
      </form>
      <div className="relative w-full flex-1">
        <Button
          type="button"
          variant="outline"
          size="md"
          className="text-[#8D94A0] border border-[#8D94A0] rounded-lg"
          onClick={handleAdvancedSearchClick}
        >
          상세 검색
        </Button>

        {/* 상세 검색 팝업 */}
        <AdvancedSearchPopup
          isOpen={isAdvancedSearchOpen}
          onClose={() => setIsAdvancedSearchOpen(false)}
          onSearch={handleAdvancedSearch}
        />
      </div>
    </div>
  );
}
