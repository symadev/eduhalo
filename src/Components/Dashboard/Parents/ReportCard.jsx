import { gql, useQuery ,useMutation, } from "@apollo/client";
import { useReactToPrint } from "react-to-print";
import { useRef, useContext } from "react";
import { ChildContext } from "./ParentDashboard";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const GET_RESULT = gql`
  query ResultByChild($childId: ID!) {
    resultByChild(childId: $childId) {
      subject
       _id
      marks
      grade
      remarks
    }
  }
`;


const DELETE_RESULT= gql`
  mutation DeleteResult($resultId: ID!) {
    deleteResult(resultId: $resultId) {
      success
      message
    }
  }
`;


const ReportCard = () => {
  const { childId } = useContext(ChildContext);
  const { data, loading, error, refetch } = useQuery(GET_RESULT, {
  variables: { childId },
  skip: !childId,
});


  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const [deleteResult] = useMutation(DELETE_RESULT);



  const handleDeleteResult = async (resultId) => {
      try {
        await deleteResult({ variables: { resultId } });
        toast.success("Result deleted");
        await refetch();
      } catch (err) {
        toast.error("Failed to delete result");
      }
    };

  if (loading) return <p className="text-center text-gray-500 py-4">Loading results...</p>;
  if (error) return <p className="text-center text-red-500 py-4">Failed to load results</p>;

  const getGradeColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A+': case 'A': return 'text-green-600 bg-green-100';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-100';
      case 'C+': case 'C': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto mt-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600 mb-2">📊 Report Card</h2>
        <p className="text-gray-600">Academic Performance Summary</p>
      </div>

      <div ref={printRef} className="bg-white rounded-xl p-6 shadow-md">
        {data?.resultByChild?.length > 0 ? (
          <div className="grid gap-4">
            {data.resultByChild.map((result, idx) => (
              <div key={idx} className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{result.subject}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-700">{result.marks}%</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </div>
                   <button
                    onClick={() => handleDeleteResult (result._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                    title="Delete Result"
                  >
                    <Trash2  className=" text-purple-500"size={20} />
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.marks}%` }}
                  ></div>
                </div>

                <p className="text-gray-600 italic">"{result.remarks}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500">No results available.</p>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          📄 Download Report Card
        </button>
      </div>
    </div>
  );
};

export default ReportCard;