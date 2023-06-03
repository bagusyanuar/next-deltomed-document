import React from 'react'

interface ActionProps { onEdit: () => void, onDelete: () => void, onDetail: () => void }
function Action({
    onEdit,
    onDelete,
    onDetail
}: ActionProps) {
    return (
        <div className='flex'>
            <a href='#' className='btn-edit mr-1 rounded-md text-white bg-orange-400 py-1 px-2 hover:bg-orange-500 hover:text-white transition-colors ease-in duration-200' onClick={(e) => { e.preventDefault(); onEdit(); }}>
                <span className="material-symbols-outlined text-sm">
                    edit
                </span>
            </a>
            <a href='#' className='btn-delete mr-1 rounded-md text-white bg-red-400 py-1 px-2 hover:bg-red-500 hover:text-white transition-colors ease-in duration-200' onClick={(e) => { e.preventDefault(); onDelete(); }}>
                <span className="material-symbols-outlined text-sm">
                    delete
                </span>
            </a>
            <a href='#' className='btn-delete rounded-md text-white bg-blue-400 py-1 px-2 hover:bg-blue-500 hover:text-white transition-colors ease-in duration-200' onClick={(e) => { e.preventDefault(); onDetail(); }}>
                <span className="material-symbols-outlined text-sm">
                    info
                </span>
            </a>
        </div>
    )
}

export default Action