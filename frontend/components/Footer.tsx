import React from 'react';
import { Logo } from '@/components/icons/logo'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Abstract</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Branches</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Blog</a></li>
              <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-400">Release Notes</a></li>
              <li><a href="#" className="hover:text-gray-400">Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-400">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
              <li><a href="#" className="hover:text-gray-400">Dribbble</a></li>
              <li><a href="#" className="hover:text-gray-400">Podcast</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#" className="hover:text-gray-400">Careers</a></li>
              <li><a href="#" className="hover:text-gray-400">Legal</a></li>
            </ul>
            <h3 className="text-sm font-semibold uppercase mt-4 mb-2">Contact Us</h3>
            <p>info@abstract.com</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-700 pt-8 mt-8">
          <div className="flex items-center"> 
            <Logo className="h-6 w-auto" /> 
            <p className="text-sm ml-4"> 
              &copy; Copyright 2024 Abstract Studio Design, Inc. All rights reserved
            </p> 
          </div> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;