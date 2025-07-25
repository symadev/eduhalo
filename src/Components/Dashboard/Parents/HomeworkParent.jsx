import { gql, useQuery } from "@apollo/client";
import { useContext, useState, useEffect } from "react";
import { ChildContext } from "./ParentDashboard"; 

const GET_HOMEWORK = gql`
  query HomeworkByChild($childId: ID!) {
    homeworkByChild(childId: $childId) {
      title
      description
      dueDate
      createdBy {
        name
      }
    }
  }
`;

const HomeworkParent = () => {
  const { childId } = useContext(ChildContext);
  const [isVisible, setIsVisible] = useState(false);
  
  const { data, loading, error } = useQuery(GET_HOMEWORK, {
    variables: { childId },
    skip: !childId,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-lg font-semibold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
            Loading homework...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-red-600">
            Failed to load homework
          </p>
        </div>
      </div>
    );
  }

  const homeworks = data?.homeworkByChild;

  // Helper function to get status color and text
  const getHomeworkStatus = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return { color: 'red', text: 'Overdue', bgColor: 'bg-red-100', textColor: 'text-red-600' };
    } else if (daysDiff === 0) {
      return { color: 'orange', text: 'Due Today', bgColor: 'bg-orange-100', textColor: 'text-orange-600' };
    } else if (daysDiff <= 2) {
      return { color: 'yellow', text: 'Due Soon', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' };
    } else {
      return { color: 'green', text: 'Upcoming', bgColor: 'bg-green-100', textColor: 'text-green-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8">
     

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-sm">
              📚 Homework Center
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              My Child's
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Homework
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Stay updated with your child's homework assignments and due dates. Track their progress and upcoming tasks.
          </p>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {homeworks?.length === 0 ? (
            // Empty State
            <div className="relative bg-white/90 backdrop-blur-md border border-pink-100 rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10 p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent mb-3">
                  No Homework Yet
                </h2>
                
                <p className="text-gray-600 text-lg">
                  Your child has no homework assignments at the moment. Check back later for updates.
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-pink-100 rounded-full mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium text-sm">All caught up!</span>
                </div>
              </div>
            </div>
          ) : (
            // Homework List
            <div className="grid gap-6">
              {homeworks.map((hw, idx) => {
                const status = getHomeworkStatus(hw.dueDate);
                
                return (
                  <div key={idx} className={`group relative transition-all duration-500 delay-${idx * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full -translate-x-10 -translate-y-10"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full translate-x-8 translate-y-8"></div>

                      <div className="relative z-10 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Left Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
                                  {hw.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  <span>Assigned by <span className="font-medium text-purple-600">{hw.createdBy?.name}</span></span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 text-base leading-relaxed mb-4">
                              {hw.description}
                            </p>
                          </div>

                          {/* Right Content - Status and Date */}
                          <div className="flex flex-col items-end gap-3">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 ${status.bgColor} rounded-full shadow-sm`}>
                              <div className={`w-2 h-2 bg-${status.color}-500 rounded-full animate-pulse`}></div>
                              <span className={`${status.textColor} font-medium text-sm`}>{status.text}</span>
                            </div>
                            
                           
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

     

        {/* Footer Status */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-gray-600 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Homework data updated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkParent;