import Interactions from "@/components/Interactions";

// Temporary page to showcase the Interactions component for screenshots
// This page provides a clean, centered layout to highlight the interactive UI
const TempInteractions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page header for context */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactions Component Demo
          </h1>
          <p className="text-gray-600">
            Temporary page for taking screenshots of the interactive UI
          </p>
        </div>
        
        {/* The Interactions component */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <Interactions />
        </div>
      </div>
    </div>
  );
};

export default TempInteractions; 