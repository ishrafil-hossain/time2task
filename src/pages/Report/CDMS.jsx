import { useState } from 'react';
import { Search, Plus, MoreHorizontal, ChevronRight, ChevronDown, Eye, Pencil, Copy, Share2, Trash2, X, Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CDMSInterface() {
  const [expanded, setExpanded] = useState({
    "Project: Time To Task": false,
    "Software Requirement Specification (SRS)": false,
    "Task": false,
    "Nav Menu FR Development": false,
    "Project: Time Tracking Application": false,
    "Software Requirement Specification (SRS) 2": false,
    "Task 2": false,
    "Nav Menu FR Development 2": false
  });

  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleExpand = (folderName) => {
    setExpanded(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenuPosition({
      x: rect.right,
      y: rect.top
    });
    setShowContextMenu(true);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  const renderFolderItem = (name, isExpanded, hasChildren = true, isPdf = false, depth = 0, avatarCount = 3, specificUser = null) => {
    // Avatar options
    const firstAvatar = "/api/placeholder/32/32"; // Default avatar
    const secondAvatar = "/api/placeholder/32/32"; // Female avatar
    
    let avatars = [];
    
    if (specificUser === "single-male") {
      avatars = [firstAvatar];
    } else if (specificUser === "single-female") {
      avatars = [secondAvatar];
    } else {
      avatars = Array(avatarCount).fill("/api/placeholder/32/32");
    }

    const paddingLeft = depth * 8 + 16; // 16px for depth 0, +8px for each level

    return (
      <div className="border-b border-gray-200">
        <div className={`flex items-center h-12 hover:bg-gray-50 pr-4`} style={{ paddingLeft: `${paddingLeft}px` }}>
          {hasChildren && (
            <button
              onClick={() => toggleExpand(name)}
              className="mr-1 text-gray-500"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          {!hasChildren && <div className="w-4 mr-1"></div>}
          
          {isPdf ? (
            <div className="flex items-center justify-center w-6 h-6 mr-2 rounded-sm bg-red-600 text-white">
              <span className="text-xs font-bold">PDF</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-6 h-6 mr-2">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-sm"></div>
            </div>
          )}
          
          <span className="flex-grow text-sm font-medium text-gray-800">{name}</span>
          
          {!isPdf && (
            <button className="w-6 h-6 flex items-center justify-center text-purple-500 rounded-full hover:bg-purple-100 mr-4">
              <Plus size={18} />
            </button>
          )}
          
          <div className="flex -space-x-2 mr-4">
            {avatars.map((avatar, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <img src={avatar} alt="User avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          <button className="text-gray-600 hover:bg-gray-100 rounded-full p-1" onClick={handleMoreClick}>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">CDMS (Central Document Management System)</h1>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <Share2 size={20} />
        </button>
      </div>
      
      {/* Search and Controls */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <div className="flex items-center w-[280px] bg-gray-100 rounded-md px-3 py-1.5">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search folder, document, others..."
            className="bg-transparent border-none outline-none text-sm flex-grow"
          />
        </div>
        <div className="flex items-center ml-4">
          <span className="text-sm text-gray-500 mr-2">Type</span>
          <div className="w-8 h-8 rounded-full border border-dashed border-purple-400 flex items-center justify-center text-purple-600">
            <Plus size={20} />
          </div>
        </div>
        <button className="ml-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-md">
          <Plus size={24} />
        </button>
      </div>
      
      {/* Table Header */}
      <div className="flex items-center h-12 px-5 text-sm font-medium text-gray-500 border-b border-gray-200">
        <div className="flex-grow pl-12">Name</div>
        <div className="w-48">Assignee</div>
        <div className="w-24">Action</div>
      </div>
      
      {/* Folder Structure */}
      <div className="flex-grow overflow-auto">
        {/* Project Time To Task */}
        {renderFolderItem("Project: Time To Task", expanded["Project: Time To Task"])}
        
        {expanded["Project: Time To Task"] && (
          <>
            {renderFolderItem("Software Requirement Specification (SRS)", expanded["Software Requirement Specification (SRS)"], true, false, 1, 2)}
            
            {expanded["Software Requirement Specification (SRS)"] && (
              <>
                {renderFolderItem("Frontend (SRS)", false, false, true, 2, 1, "single-male")}
                {renderFolderItem("Backend (SRS)", false, false, true, 2, 1, "single-female")}
              </>
            )}
            
            {renderFolderItem("Task", expanded["Task"], true, false, 1, 3)}
            
            {expanded["Task"] && (
              <>
                {renderFolderItem("Nav Menu FR Development", expanded["Nav Menu FR Development"], true, false, 2, 3)}
                
                {expanded["Nav Menu FR Development"] && (
                  renderFolderItem("Frontend (SRS)", false, false, true, 3, 3)
                )}
              </>
            )}
          </>
        )}
        
        {/* Project Time Tracking Application */}
        {renderFolderItem("Project: Time Tracking Application", expanded["Project: Time Tracking Application"], true, false, 0, 3)}
        
        {expanded["Project: Time Tracking Application"] && (
          <>
            {renderFolderItem("Software Requirement Specification (SRS)", expanded["Software Requirement Specification (SRS) 2"], true, false, 1, 2)}
            
            {expanded["Software Requirement Specification (SRS) 2"] && (
              <>
                {renderFolderItem("Frontend (SRS)", false, false, true, 2, 1, "single-male")}
                {renderFolderItem("Backend (SRS)", false, false, true, 2, 1, "single-female")}
              </>
            )}
            
            {renderFolderItem("Task", expanded["Task 2"], true, false, 1, 3)}
            
            {expanded["Task 2"] && (
              <>
                {renderFolderItem("Nav Menu FR Development", expanded["Nav Menu FR Development 2"], true, false, 2, 3)}
              </>
            )}
          </>
        )}
      </div>
      
      {/* Context Menu */}
      {showContextMenu && (
        <div 
          className="fixed bg-white shadow-lg rounded-md border border-gray-200 w-64 z-50"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x - 280,
          }}
        >
          <div className="py-1">
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Eye size={16} className="mr-3" />
              <span>View</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Pencil size={16} className="mr-3" />
              <span>Rename</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Copy size={16} className="mr-3" />
              <span>Make as Duplicate</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Share2 size={16} className="mr-3" />
              <span>Share</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Download size={16} className="mr-3" />
              <span>Download</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <Trash2 size={16} className="mr-3" />
              <span>Delete</span>
            </button>
            <button className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-100 text-gray-700">
              <X size={16} className="mr-3" />
              <span>Remove All</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Invisible overlay to close context menu */}
      {showContextMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={handleCloseContextMenu}
        />
      )}
    </div>
  );
}