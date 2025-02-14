import React from 'react'

export default function DropDownComp({ options, label, placeholder, onChange }) {
  return (

    <div className="relative">
      <div className='absolute -top-4 left-2 rounded px-2 py-1'>
        <label className="text-xs font-semibold text-slate-600">{label}</label>
      </div>
      <select
        key={label}
        // defaultValue={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full p-2 border border-slate-100 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-slate-200`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
