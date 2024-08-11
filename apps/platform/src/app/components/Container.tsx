export default function Container({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`${className} px-1 xl:max-w-7xl xl:px-0 2xl:max-w-[1440px]`}
		>
			{children}
		</div>
	);
}
