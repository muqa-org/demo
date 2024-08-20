'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ProjectListHeader({
	onTabChange,
}: {
	onTabChange: (tab: string) => void;
}) {
	const t = useTranslations('projects');
	const [activeTab, setActiveTab] = useState('board');

	useEffect(() => {
		if (onTabChange) {
			onTabChange(activeTab);
		}
	}, [activeTab, onTabChange]);

	return (
		<div className='border-borderGrayLight flex w-full justify-between border-b pb-10'>
			<h1 className='w-1/4 text-4xl font-normal leading-normal text-primaryBlack'>
				{t('title')}
			</h1>
			<div className='border-green-500 flex space-x-1 overflow-hidden rounded-md border'>
				<button
					onClick={() => setActiveTab('map')}
					className={`px-3 py-1 font-semibold ${activeTab === 'map' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
				>
					{t('map')}
				</button>
				<button
					onClick={() => setActiveTab('board')}
					className={`px-3 py-1 font-semibold ${activeTab === 'board' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
				>
					{t('board')}
				</button>
			</div>
		</div>
	);
}
