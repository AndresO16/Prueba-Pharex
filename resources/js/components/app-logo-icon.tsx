import { SVGAttributes } from 'react';

export default function AppLogoIcon({ className = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/completed_task.svg" // o "/images/mi-logo.png"
            alt="Logo"
            className={`w-10 h-10 ${className}`}
            {...props}
        />
    );
}
