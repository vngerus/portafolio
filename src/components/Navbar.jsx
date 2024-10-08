import { useState } from "react";
import { Logo } from "../assets";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black/100 text-white fixed lg:left-0 top-0 lg:h-screen lg:w-[80px] lg:flex lg:flex-col lg:justify-between py-6 z-50">
      <div className="hidden lg:flex flex-col items-center space-y-12">
        <img src={Logo} alt="VNGERUS" className="w-10 h-10 lg:w-12 lg:h-12" />
        <div className="flex flex-col space-y-20 text-sm text-center">
          <a
            href="/contact"
            className="hover:text-gray-300 transform lg:rotate-[-90deg]"
          >
            Contact
          </a>
          <a
            href="/details"
            className="hover:text-gray-300 transform lg:rotate-[-90deg]"
          >
            Details
          </a>
          <a
            href="/projects"
            className="hover:text-gray-300 transform lg:rotate-[-90deg]"
          >
            Projects
          </a>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center space-y-4">
        <a href="https://github.com/vngerus" className="hover:text-gray-300">
          <FaGithub className="w-6 h-6 lg:w-8 lg:h-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/angelsmithl/"
          className="hover:text-gray-300"
        >
          <FaLinkedin className="w-6 h-6 lg:w-8 lg:h-8" />
        </a>
      </div>

      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
            <FaTimes className="w-8 h-8" />
          ) : (
            <FaBars className="w-8 h-8" />
          )}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-black/100 backdrop-blur-md z-40 flex flex-col justify-between items-center transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-10 mt-32">
          <img src={Logo} alt="VNGERUS" className="w-12 h-12" />
          <a href="/projects" className="hover:text-gray-300 text-lg">
            Projects
          </a>
          <a href="/details" className="hover:text-gray-300 text-lg">
            Details
          </a>
          <a href="/articles" className="hover:text-gray-300 text-lg">
            Articles
          </a>
          <a href="/contact" className="hover:text-gray-300 text-lg">
            Contact
          </a>
        </div>

        <div className="flex space-x-6 pb-6">
          <a href="https://github.com/vngerus" className="hover:text-gray-300">
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/angelsmithl/"
            className="hover:text-gray-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
