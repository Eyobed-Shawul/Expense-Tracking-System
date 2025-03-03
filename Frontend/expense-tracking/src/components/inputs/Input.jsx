import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({value, onChange, placeholder, label, type}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div>
      <label className="text-sm font-semibold text-black">{label}</label>

      <div className="input-box">
        <input
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            type={type == 'password'? showPassword? 'text': 'password': type}
            className="w-full border border-none outline-none"
        />

        {type === 'password' && (
            <>
            {showPassword ? (
                <FaRegEye 
                    size={22}
                    className="cursor-pointer text-slate-700"
                    onClick={() => toggleShowPassword()}
                />
            ) : (
                    <FaRegEyeSlash 
                        size={22}
                        className="cursor-pointer text-slate-700"
                        onClick={() => toggleShowPassword()}
                    />
                )
                }
            </>
        )}
      </div>
    </div>
  )
}

export default Input
