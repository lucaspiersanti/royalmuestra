import { useState, useEffect } from "react";

const Navbar = () => {
  const [color, setColor] = useState("transparent");
  
 
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        
      } else {
        setColor("transparent");
        
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="h-[10%] fixed left-0 top-0 botton-1 w-full z-10 ease-in duration-300">
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-1 text-white">
        <div>
            <h1 className="text-white text-xl font-semibold">Administración Royal</h1>
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-white">{localStorage.getItem('username')?.toUpperCase()}  </span>
            <i className="fas fa-user-circle text-white text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
