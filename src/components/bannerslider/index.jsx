/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Banner() {
  return (
    <div className="relative text-center text-white">
      <img src='/public/banner1.jpg' alt="Sweat Proof Undershirts" className="w-full h-auto" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h2 className="text-sm md:text-lg uppercase">Confidence Game-Changers</h2>
        <h1 className="text-3xl md:text-5xl font-bold my-4">Sweat Proof Undershirts</h1>
        <p className="text-sm md:text-lg mb-6">Say goodbye to sweat marks and sweat stains forever with Thompson Tee. Guaranteed.</p>
        <div className="flex space-x-4">
          <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Shop Now</a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
