{/* History icons */}
<div className="relative">
  <span
    onClick={() => setOpenHistory(true)}
    className="absolute top-4 right-4 z-10 group cursor-pointer transition-all duration-200"
  >
    <div className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <img src="/Histrory.png" alt="History" className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" />
      
      <span className="absolute right-full top-1/2 mr-2 -translate-y-1/2
        bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg
        opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
        View History
      </span>
    </div>
  </span>
</div>

<div
  className={`fixed top-0 right-0 h-screen w-80 bg-[#FAFAFA] text-gray-800 shadow-2xl
  transform transition-all duration-300 z-30 border-l border-gray-200
  ${openHistory ? "translate-x-0" : "translate-x-full"}`}
>
  <div className="h-full flex flex-col">
    {/* Header - Fixed position */}
    <div className="pt-24 px-6 pb-4 border-b border-gray-300 flex items-center justify-between bg-[#FAFAFA]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <img src="/Histrory.png" alt="History" className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">History</h2>
          <p className="text-xs text-gray-500 mt-1">Previous conversations</p>
        </div>
      </div>
      
      <button
        type="button"
        onClick={() => setOpenHistory(false)}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 
        transition-all duration-200 transform hover:rotate-90"
      >
        <i className="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    {/* Scrollable Content Area */}
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="space-y-3 pt-4">
        {/* History Items */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 
          hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  Conversation about Project {i + 1}
                </p>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  This is a sample conversation history item to demonstrate scrolling functionality...
                </p>
              </div>
              <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                {i + 1}h ago
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (commented out) */}
      {/* <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i className="fa-solid fa-clock text-gray-400 text-2xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No History Yet</h3>
        <p className="text-gray-500 text-sm">Your conversation history will appear here</p>
      </div> */}
    </div>

    {/* Footer - Fixed at bottom */}
    <div className="p-4 border-t border-gray-300 bg-[#FAFAFA]">
      <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 
      rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2">
        <i className="fa-solid fa-trash text-sm"></i>
        Clear All History
      </button>
    </div>
  </div>
</div>