

import { Mail } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer  id="contact" className="bg-[#FFEBE5]    text-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-20 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute bottom-10 right-10 w-14 h-14 bg-pink-300 rounded-full opacity-25 animate-bounce delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                            <span className="bg-gradient-to-r from-[#111430] via-purple-800 to-pink-600 bg-clip-text text-transparent">
                                Eduhalo
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            Designed for modern schools, EduHalo simplifies communication and progress tracking.
                            Get real-time updates, digital report cards, and seamless parent-teacher interaction.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-3 sm:space-x-4">
                            <a href="https://www.facebook.com/syma.sultana.75" target="_blank" rel="noopener noreferrer" title="Facebook"
                                className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-2.5 rounded-lg hover:from-pink-300 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <FaFacebookF className="text-black sm:w-5 sm:h-5" />
                            </a>
                            <a href="https://x.com/symadev_E2002" target="_blank" rel="noopener noreferrer" title="Twitter (X)"
                                className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-2.5 rounded-lg hover:from-pink-300 hover:to-orange-100  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <FaTwitter className="text-black sm:w-5 sm:h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/symasultana/" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                                className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-2.5 rounded-lg hover:from-pink-300 hover:to-orange-100  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <FaLinkedinIn className="text-black sm:w-5 sm:h-5" />
                            </a>
                            <a href="https://www.instagram.com/midnighttwinkle_/" target="_blank" rel="noopener noreferrer" title="Instagram"
                                className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-2.5 rounded-lg hover:from-pink-300 hover:to-orange-100  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <FaInstagram className="text-black sm:w-5 sm:h-5" />
                            </a>
                            <a href="mailto:symasultana02@gmail.com" title="Email"
                                className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-2.5 rounded-lg hover:from-pink-300 hover:to-orange-100  transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <Mail size={18} className="text-black sm:w-5 sm:h-5" />
                            </a>
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div className="mt-6 sm:mt-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#111430]">Quick Links</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/features" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/schools" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Find Your School
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>



                    {/* Features */}
                    <div className="mt-6 sm:mt-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#111430]">Features</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Real-time Result & Report Card
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Homework & Class Tasks Updates
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Attendance Tracking System
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Parent-Teacher Messaging
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Class Routine Overview
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    Admin Panel for School Control
                                </a>
                            </li>
                        </ul>
                    </div>


                    {/* Support & Contact */}
                    <div className="mt-6 sm:mt-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#111430]">Support</h3>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center">
                                <Mail className="text-pink-500 mr-2 sm:mr-3 flex-shrink-0" size={16} title="Email Icon" />
                                <a href="mailto:support@resumebuilder.com" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    symasultana02@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0">
                                    <span className="text-pink-500 text-xs sm:text-sm">📞</span>
                                </div>
                                <a href="tel:+15551234567" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                    +8801794621507
                                </a>
                            </div>
                            <div className="flex items-start">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-pink-500 text-xs sm:text-sm">📍</span>
                                </div>
                                <span className="text-gray-600 text-sm sm:text-base">Khulna, Bangladesh</span>
                            </div>
                            <div className="pt-2 sm:pt-3">
                                <a href="/help" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base block hover:font-medium">Help Center</a>
                                <a href="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base block mt-2 hover:font-medium">Privacy Policy</a>
                                <a href="/terms" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base block mt-2 hover:font-medium">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border */}
                <div className="border-t border-pink-200 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left">
                            © 2025 Smart Homework & Attendance Tracker. All rights reserved.
                        </p>
                        <div className="flex space-x-4 sm:space-x-6">
                            <a href="/privacy" className="text-gray-500 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                Privacy
                            </a>
                            <a href="/terms" className="text-gray-500 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                Terms
                            </a>
                            <a href="/cookies" className="text-gray-500 hover:text-pink-600 transition-colors duration-300 text-sm sm:text-base hover:font-medium">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;