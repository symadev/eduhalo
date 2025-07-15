import { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";

const ADD_RESULT = gql`
  mutation AddResult($input: AddResultInput!) {
    addResult(input: $input) {
      success
      message
    }
  }
`;


const AddResultForm = ({ studentId }) => {
     console.log(" Received studentId:", studentId);
    const { user } = useContext(AuthContext); // teacher info
    const [formData, setFormData] = useState({
        subject: "",
        marks: "",
        grade: "",
        remarks: "",
    });

    const [addResult] = useMutation(ADD_RESULT);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addResult({
                variables: {
                    input: {
                        ...formData,
                        marks: parseInt(formData.marks),
                        student: studentId,
                        addedBy: user._id,
                    },
                },
            });

            if (data.addResult.success) {
                alert("Result added successfully!");
            }


            setFormData({ subject: "", marks: "", grade: "", remarks: "" });
        } catch (error) {
            console.error("Error:", error.message);
            alert(" Failed to add result");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="relative bg-gradient-to-br from-[#FFF8F5] via-[#FFF0EA] to-[#fbc5b5] overflow-hidden rounded-2xl max-w-md w-full shadow-2xl">



                <form onSubmit={handleSubmit} className="relative z-10 space-y-2 p-7 bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl shadow-2xl">
                    <div className="text-center mb-5">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                            ✨ Add Result
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                            <input
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-400/50 focus:border-pink-400 bg-white/95 placeholder-gray-400 text-sm transition-all duration-300 transform group-hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl focus:shadow-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                        </div>

                        <div className="relative group">
                            <input
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                placeholder="Marks"
                                type="number"
                                required
                                className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-400/50 focus:border-pink-400 bg-white/95 placeholder-gray-400 text-sm transition-all duration-300 transform group-hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl focus:shadow-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <input
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            placeholder="Grade (e.g. A+)"
                            className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-400/50 focus:border-pink-400 bg-white/95 placeholder-gray-400 text-sm transition-all duration-300 transform group-hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl focus:shadow-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Remarks (optional)"
                            rows="3"
                            className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-400/50 focus:border-pink-400 bg-white/95 placeholder-gray-400 text-sm resize-none transition-all duration-300 transform group-hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl focus:shadow-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-orange-100 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full px-5 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 overflow-hidden text-sm"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Submit Result
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-orange-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddResultForm;