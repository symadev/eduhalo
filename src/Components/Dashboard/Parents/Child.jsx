
import kid from "../../../assets/images/student-1.png"
import teacher from "../../../assets/images/teacher-1.png"
const Child = () => {
  const subjects = [
    { name: 'Mathematics', level: 'Level 3', progress: 85, color: 'bg-purple-500', bgColor: 'bg-purple-50' },
    { name: 'English', level: 'Level 4', progress: 92, color: 'bg-green-500', bgColor: 'bg-green-50' },
    { name: 'Science', level: 'Level 2', progress: 78, color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
    { name: 'Social Studies', level: 'Level 3', progress: 88, color: 'bg-red-500', bgColor: 'bg-red-50' },
    { name: 'Art & Craft', level: 'Level 4', progress: 96, color: 'bg-pink-500', bgColor: 'bg-pink-50' },
    { name: 'Physical Education', level: 'Level 3', progress: 82, color: 'bg-cyan-500', bgColor: 'bg-cyan-50' }
  ];

  const teacherSubjects = ['Math', 'English', 'Science', 'Social Studies'];
  const badges = [
    { icon: '🏆', name: 'Honor Roll' },
    { icon: '📚', name: 'Reading Champion' },
    { icon: '🎨', name: 'Creative Star' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Child's Educational Profile
          </h1>
          <p className="text-gray-600 text-lg">Track your child's educational journey</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Child's Profile */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">👶</span> Child's Profile
            </h2>
            <div className="text-center">
              <img 
                src={kid} 
                alt="Emma's Profile" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
              />
              <h3 className="text-3xl font-bold text-purple-700 mb-2">Emma Johnson</h3>
              <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-lg font-medium">
                8 years old
              </span>
            </div>
          </div>

          {/* Class Info */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">🏫</span> Class Information
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white/70 p-4 rounded-2xl shadow-sm">
                <div className="text-orange-500 font-semibold text-sm mb-1">Class</div>
                <div className="text-2xl font-bold text-orange-700">3rd Grade</div>
              </div>
              <div className="text-center bg-white/70 p-4 rounded-2xl shadow-sm">
                <div className="text-orange-500 font-semibold text-sm mb-1">Section</div>
                <div className="text-2xl font-bold text-orange-700">A</div>
              </div>
              <div className="text-center bg-white/70 p-4 rounded-2xl shadow-sm">
                <div className="text-orange-500 font-semibold text-sm mb-1">Roll Number</div>
                <div className="text-2xl font-bold text-orange-700">15</div>
              </div>
            </div>
          </div>

          {/* Assigned Teacher */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">🧑‍🏫</span> Assigned Teacher
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={teacher}
                alt="Ms. Sarah Wilson" 
                className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-blue-700">Ms. Sarah Wilson</h3>
                <p className="text-blue-500 text-lg">Primary Teacher</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {teacherSubjects.map((subject, index) => (
                <span key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Performance Summary
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-white/70 p-4 rounded-2xl shadow-sm">
                <div className="text-4xl font-bold text-green-700 mb-1">A-</div>
                <div className="text-green-500 font-semibold">Average Grade</div>
              </div>
              <div className="text-center bg-white/70 p-4 rounded-2xl shadow-sm">
                <div className="text-4xl font-bold text-green-700 mb-1">94%</div>
                <div className="text-green-500 font-semibold">Attendance</div>
              </div>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-medium text-sm shadow-sm flex items-center gap-2">
                  <span>{badge.icon}</span>
                  {badge.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white/80 rounded-3xl p-8 shadow-lg border border-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <span className="text-2xl">📘</span> Subject Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className={`${subject.bgColor} rounded-2xl p-6 border-l-4 ${subject.color} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-700">{subject.name}</h3>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {subject.level}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${subject.color} transition-all duration-500 ease-out`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-gray-600 font-semibold">
                  {subject.progress}% Complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Child;