import React from "react";
import { Toast } from "../types";
interface ToastItemProps {
    toast: Toast;
    offset: number;
    reverseOrder: boolean;
}
export declare const ToastItem: React.FC<ToastItemProps>;
export {};
