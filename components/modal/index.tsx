import React, { useState, useEffect } from 'react'
import BaseModal from './modal'

export interface ModalProps {open: boolean, children: React.ReactNode ,onClose?: () => void, title?: string}
export default BaseModal
