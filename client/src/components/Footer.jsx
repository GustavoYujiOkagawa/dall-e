import React from "react";


const Footer = ()=>{
    return(
        
       <div className="flex flex-row justify-between mt-28 ">
        <div className="flex flex-row">
            <p className=" text-sm leading-5 font-semibold lg:text-sm">
                @{new Date().getFullYear()} Criado por &copy;GUSTAVO YUJI OKAGAWA
            </p>
        </div>
        <div className=" text-sm leading-tight ml-8 text-gray-600 font-semibold flex justify-between gap-4 sm:text-sm">
            
            <a href="#"><div>Github</div></a>
            <a href="#"><div>Instagram</div></a>
            <a href="#"><div>Whatsapp</div></a>
        </div>
       </div>

    )
}

export default Footer;