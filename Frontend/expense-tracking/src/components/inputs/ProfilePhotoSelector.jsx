import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previousUrl, setPreviousUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            //Update the Image State
            setImage(file);

            //Generate Image Preview URL
            const preview = URL.createObjectURL(file);
            setPreviousUrl(preview);
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        setPreviousUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };



  return (
    <div className="flex justify-center mb-6">
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-slate-700 rounded-full relative">
                <LuUser className='text-5xl text-primary'/>

                <button
                    type='button'
                    className='w-6 h-6 flex items-center justify-center bg-slate-950 text-white rounded-full absolute -bottom-1 -right-1' 
                    onClick={onChooseFile}
                >
                    <LuUpload /> 
                </button>
            </div>
        ):(
            <div className="relative">
                <img src={previousUrl} alt="Profile"
                 className="w-20 h-20 rounded-full object-cover" />

                <button
                    type='button'
                    className='w-6 h-6 flex items-center justify-center bg-red-900 text-white rounded-full absolute -bottom-1 -right-1' 
                    onClick={handleImageRemove}
                >
                    <LuTrash />
                </button>
            </div>
        )}

    </div>
  )
}

export default ProfilePhotoSelector