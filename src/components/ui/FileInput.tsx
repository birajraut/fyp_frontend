import  { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";



interface IProps {
     label?:string
     getFile:(file:File | null)=>void
}

const FileInput = ({label, getFile}:IProps) => {
  const [image, setImage] = useState<File | null>(null);
  const inputFileRef = useRef<any>(null); 


  const handleDrop = (e:any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; 

    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please drop an image file");
    }
  };

  const handleFileInput = (e:any) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select an image file");
    }
  };


  const handleDragOver = (e:any) => {
    e.preventDefault(); 
  };

  const handleClick = () => {

    inputFileRef?.current.click();
  };


  const handleRemoveImage = () => {
    setImage(null);
  };
useEffect(()=>{
    getFile(image)
}, [image])

  return (
    <div>
                     <div className='text-slate-700 text-sm font-semibold mb-1'>{label}</div>
    <div className="flex justify-center items-center bg-gray-100 py-12 px-2 rounded-md relative">
  
      <div
        className="border border-dashed rounded-md border-gray-300  max-w-full  items-center justify-center text-center cursor-pointer p-3"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {
            !image &&   <p className="text-gray-500 text-sm ">Drag and drop an image here</p>
        }
      
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden" 
        />
        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
            />
             
          </div>

        )}
      </div>
      {
        image &&  <button
        onClick={handleRemoveImage}
        type="button"
        className="mt-2 text-red-500 text-sm hover:text-red-700 absolute top-0 right-2"
      >
        <IoIosCloseCircle />
      </button>
      }
     
    </div>
    </div>
  );
};

export default FileInput;

