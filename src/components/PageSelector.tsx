'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface PageSelections {
  allPages: boolean;
  page1: boolean;
  page2: boolean;
  page3: boolean;
  page4: boolean;
}

type PageKey = Exclude<keyof PageSelections, 'allPages'>;

export default function PageSelector() {
  const [selectedPages, setSelectedPages] = useState<PageSelections>({
    allPages: false,
    page1: false,
    page2: false,
    page3: false,
    page4: false,
  });



  const handleAllPagesChange = (): void => {
    const newState: boolean = !selectedPages.allPages;
    setSelectedPages({
      allPages: newState,
      page1: newState,
      page2: newState,
      page3: newState,
      page4: newState,
    });
  };



  const handlePageChange = (page: PageKey): void => {
    const newState: PageSelections = { ...selectedPages, [page]: !selectedPages[page] };
    
    // Auto-update allPages checkbox
    const allSelected: boolean = newState.page1 && newState.page2 && newState.page3 && newState.page4;
    newState.allPages = allSelected;
    
    setSelectedPages(newState);
  };



  const handleDone = (): void => {
    console.log('Selected pages:', selectedPages);
  };



  const pageNumbers: PageKey[] = ['page1', 'page2', 'page3', 'page4'];


  
  return (
      <div className="rounded-lg px-6 py-8 shadow-[0_8px_15px_0_rgba(20,20,20,0.12)] shadow-[0_0_4px_0_rgba(20, 20, 20, 0.1)] w-full max-w-md">
        <div className="flex items-center justify-between border-b border-[#CDCDCD] pb-6 mb-6">
          <p>All pages</p>
          <button
            onClick={handleAllPagesChange}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
              selectedPages.allPages
                ? 'bg-blue-500 hover:bg-blue-400 border-blue-500 hover:border-blue-400'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {selectedPages.allPages && <Check className="text-white" />}
          </button>
        </div>

        <div className="space-y-4 border-b border-[#CDCDCD] pb-6 mb-6">
          {pageNumbers.map((page: PageKey) => (
            <div key={page} className="flex items-center justify-between">
              <p>Page {page.replace('page', '')}</p>
              <button
                onClick={() => handlePageChange(page)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                  selectedPages[page]
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {selectedPages[page] && <Check className="text-white" />}
              </button>
            </div>
          ))}
        </div>

        
        <button
          onClick={handleDone}
          className="w-full bg-[#FFCE22] hover:bg-[#FFD84D] font-medium py-3 px-4 rounded-md transition-colors cursor-pointer"
        >
          Done
        </button> 
      </div>
  );
}