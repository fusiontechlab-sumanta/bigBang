import React from 'react';

function Footer() {
  return (
    <footer className="border border-t border-t-gray-500 max-sm:mb-16">
      <ul className="flex flex-wrap justify-center text-sm my-3 text-nowrap text-center overflow-x-auto">
        <li className="flex items-center px-3">
          <a href="" className="text-center block">
            Privacy Policy 
          </a>
          <span className="mx-2  sm:block">|</span>
        </li>
        <li className="flex items-center px-3">
          <a href="" className="text-center block">
            KYC
          </a>
          <span className="mx-2  sm:block">|</span>
        </li>
        <li className="flex items-center px-3">
          <a href="" className="text-center block">
            Terms and Conditions
          </a>
          <span className="mx-2  sm:block">|</span>
        </li>
        <li className="flex items-center px-3">
          <a href="" className="text-center block">
            Rules and Regulations
          </a>
          <span className="mx-2  sm:block">|</span>
        </li>
        <li className="flex items-center px-3">
          <a href="" className="text-center block">
            Responsible Gambling
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
