import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
	variant?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({
		children,
		className,
		variant,
		...props
	}: ButtonProps,
	ref,
	) => {
			const buttonBg = variant === 'blue' ? 'bg-blue' : 'bg-primaryBlack';
			const classes = `${buttonBg} ${className} flex items-center rounded-lg px-5 py-2 text-base font-normal leading-6 text-white hover:opacity-85 focus:outline-none`;
			return (
				<button
					ref={ref}
					className={classes}
					{...props}
				>
					{children}
				</button>
			);
		}
	);
