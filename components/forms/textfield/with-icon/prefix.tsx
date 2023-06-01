import React from 'react'

function Prefix({
    id,
    icon,
    type,
    name,
    value,
    placeholder,
    onChange,
    className
}: {
    id: string,
    icon?: string,
    name: string,
    type: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, v: string) => void,
    className?: string,
}) {
    const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let value: string = e.currentTarget.value
        onChange(e, value)
    }
    return (
        <label className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
            <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-2.5 left-3 text-sm">
                {!icon ? 'circle' : icon}
            </span>
            <input
                onChange={onHandleChange}
                type={type}
                name={name}
                value={value}
                id={id}
                placeholder={placeholder}
                className={`text-sm form-input rounded-md border border-slate-400 py-2 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-8 focus:outline-none focus:border-slate-500 ${className}`} />
        </label>
    )
}

export default Prefix