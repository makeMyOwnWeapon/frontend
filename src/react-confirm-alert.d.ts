declare module 'react-confirm-alert' {
    import { ReactNode } from "react";
    
    interface ConfirmAlertProps {
        title?: string;
        message?: string;
        buttons?: {
            label: string;
            onClick: () => void;
        }[];
        customUI?: ({ onClose }: { onClose: () => void }) => ReactNode;
        closeOnClickOutside?: boolean;
        closeOnEscape?: boolean;
        willUnmount?: () => void;
        onClickOutside?: () => void;
        onKeypressEscape?: () => void;
        overlayClassName?: string;
    }

    export function confirmAlert(options: ConfirmAlertProps): void;
}
