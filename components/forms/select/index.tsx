import React, { useState, useEffect, useRef } from 'react'

function useOuterClick(callback: () => void) {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        window.addEventListener('click', handleClick);
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLDivElement
                | HTMLInputElement
                | HTMLParagraphElement
                | HTMLButtonElement
                | HTMLSelectElement
                | HTMLHeadingElement;
            if (target?.contains(innerRef.current) && target !== innerRef.current) {
                callback()
            }

        };
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [innerRef]);

    return innerRef;
}

function Index({
    data,
    placeholder,
    id,
    name,
    onSelect,
    icon,
    className
}: {
    data: Array<any>,
    placeholder: string,
    id: string,
    name: string,
    onSelect: (v: string) => void,
    icon?: string,
    className: string
}) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [options, setOptions] = useState<Array<any>>([])
    const innerRef = useOuterClick(() => {
        setOpen(false)
    });

    const toggleOpen = () => {
        setOpen(current => !current);
    }


    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        let param = e.target.value
        setValue(param)
        let results = data.filter(o => o.value.includes(param));
        setOptions(results)
    }

    const handleSelect = (v: string) => {
        setValue(v)
        onSelect(v);
    }

    useEffect(() => {
        setOptions(data)
        return () => {
            setOptions([])
        }
    }, [data])

    return (
        <div ref={innerRef} className={`${className}`}>
            <label className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
                <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-2.5 left-3 text-sm">
                    {!icon ? 'circle' : icon}
                </span>
                <input
                    onFocus={toggleOpen}
                    onChange={(e) => { onFilter(e) }}
                    type="text"
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    className="text-sm form-input rounded-md border border-slate-400 py-2 px-2.5 pl-8 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pr-8 focus:outline-none focus:border-slate-500" />
                <svg aria-hidden="true" className="w-4 h-4 ml-1 absolute top-3 right-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <div className={`${isOpen ? "absolute transition ease-in duration-75" : "hidden transition ease-out duration-100"} px-2 py-2 right-0 z-10 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-2`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    {
                        options.map((v, i) => {
                            return (
                                <div key={i} onClick={() => { handleSelect(v['value']) }} className="py-3 px-2 text-gray-600 rounded-md block w-full text-left text-sm hover:bg-green-100">
                                    <span className=''>{v['text']}</span>
                                </div>
                            )
                        })
                    }


                </div>
            </label>

        </div>
    )
}

export default Index
