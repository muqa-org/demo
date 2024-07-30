interface buttonProps {
	children: string;
	className?: string;
	handleOnClick: () => void;
	buttonType?: string;
}

export function Button({
	children,
	className,
	handleOnClick,
	buttonType,
}: buttonProps) {
	const buttonBg = buttonType === 'blue' ? 'bg-blue-500' : 'bg-blue-100';
	return (
		<button
			onClick={handleOnClick}
			className={`${buttonBg} ${className} flex items-center rounded-lg px-5 py-2 text-base font-normal leading-6 text-white hover:opacity-85 focus:outline-none`}
		>
			{children}
		</button>
	);
}
