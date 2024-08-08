import ProjectListSeachFilter from '@/app/components/projects/ProjectListSeachFilter';

export default function ProjectListHeader() {
	return (
		<div className='flex w-full justify-between'>
			<h1 className='w-1/4 text-4xl font-normal uppercase leading-normal text-primaryBlack'>
				Projekti
			</h1>
			<ProjectListSeachFilter />
		</div>
	);
}
