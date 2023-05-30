import React from 'react'


function Index({
    id,
    type,
    name,
    value,
    placeholder,
    onChange,
    className
}: {
    id: string,
    name: string,
    type: string,
    value?: string,
    placeholder: string,
    onChange: (e?: React.ChangeEvent<HTMLInputElement>, value?: string) => void,
    className?: string,
}) {
    const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let value: string = e.currentTarget.value
        onChange(e, value)
    }
    return (
        <input
            id={id}
            onChange={onHandleChange}
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            className={`text-sm form-input rounded-md border border-slate-400 py-2 px-2.5 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:border-slate-500 ${className}`} />
    )
}

export default Index