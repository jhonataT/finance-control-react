import { toast } from 'react-toastify';

type ToastTypes = 'info' | 'success' | 'warning' | 'error' | 'default';

export const customToast = (message: string, type: ToastTypes) => {
    return toast(
        message,
        {type}
    )
}