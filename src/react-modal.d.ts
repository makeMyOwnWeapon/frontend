declare module 'react-modal' {
    import * as React from 'react';

    interface ModalProps {
        isOpen: boolean;
        onRequestClose?: () => void;
        style?: {
            content?: React.CSSProperties;
            overlay?: React.CSSProperties;
        };
        contentLabel?: string;
        appElement?: HTMLElement | {};
        ariaHideApp?: boolean;
        shouldFocusAfterRender?: boolean;
        shouldCloseOnOverlayClick?: boolean;
        shouldReturnFocusAfterClose?: boolean;
        parentSelector?: () => HTMLElement;
        aria?: {
            [key: string]: string;
        };
        data?: {
            [key: string]: string;
        };
        role?: string;
        contentRef?: (instance: HTMLElement) => void;
        overlayRef?: (instance: HTMLElement) => void;
        id?: string;
        className?: string | {
            base: string;
            afterOpen: string;
            beforeClose: string;
        };
        overlayClassName?: string | {
            base: string;
            afterOpen: string;
            beforeClose: string;
        };
        bodyOpenClassName?: string;
        htmlOpenClassName?: string;
        portalClassName?: string;
        closeTimeoutMS?: number;
        defaultStyles?: {
            content: React.CSSProperties;
            overlay: React.CSSProperties;
        };
        children?: React.ReactNode;
    }

    export default class Modal extends React.Component<ModalProps> {}
}
