import ProjectListHeader from '@/app/components/projects/ProjectListHeader';
import ProjectListTable from '@/app/components/projects/ProjectListTable';

export default function ProjectList() {
	return (
		<div className='w-3/4'>
			<ProjectListHeader />
			<ProjectListTable />
		</div>
	);
}
