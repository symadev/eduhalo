import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState, useEffect } from "react";


const GET_MY_CHILD = gql`
  query MyChild($parentId: ID!) {
    myChild(parentId: $parentId) {
      name
      class
      section
      roll
      assignedTeacher {
        name
      }
    }
  }
`;

const MyChild = () => {
  const { user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  
  const { data, loading } = useQuery(GET_MY_CHILD, {
    variables: { parentId: user?._id },
    skip: !user,
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
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const child = data?.myChild;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#FFEBE5] py-8">
    

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-4">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-600 rounded-full text-sm font-semibold shadow-sm">
              👶 Parent Dashboard
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
              My Child's
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Stay connected with your child's educational journey. View their profile information and academic details.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white/90 backdrop-blur-md border border-pink-100 rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
            

            <div className="relative z-10 p-8">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <img src="/assets/kid.png" className="w-12 h-12 text-white" alt="kid">
                     
                    </img>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent mb-2">
                  {child?.name}
                </h2>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-pink-600 font-medium text-sm">Active Student</span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Info */}
                <div className="group relative">
                  <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-orange-400 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Class</h3>
                        <p className="text-2xl font-bold text-pink-600">{child?.class}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Info */}
                <div className="group relative">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Section</h3>
                        <p className="text-2xl font-bold text-purple-600">{child?.section}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roll Info */}
                <div className="group relative">
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Roll Number</h3>
                        <p className="text-2xl font-bold text-orange-600">{child?.roll}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="group relative">
                  <div className="bg-gradient-to-r from-green-50 to-pink-50 rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Class Teacher</h3>
                        <p className="text-lg font-bold text-green-600">{child?.assignedTeacher?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default MyChild;