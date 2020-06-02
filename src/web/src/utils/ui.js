import { useToasts } from "react-toast-notifications";
import React from 'react'

export const confirm = (message) => {
    return window.confirm(message)
}