'use server';

import { generatePassword } from '@/app/helpers/appHelpers';
import {
	createDiscourseTopic,
	createDiscourseUser,
	generateProposalTopicDescription,
	uploadFileToDiscourse,
} from '@/app/helpers/discourseHelpers';
import { getTranslations } from 'next-intl/server';

export async function createProjectAction(
	prevState: { status: boolean; message: string[] },
	formData: FormData,
) {
	const t = await getTranslations('proposalForm');

	const apiUrl = process.env.NEXT_DISCOURSE_FORUM_URL || '';
	const apiKey = process.env.NEXT_DISCOURSE_API_KEY || '';
	const apiUsername = process.env.NEXT_DISCOURSE_USERNAME || '';

	const project = formData.get('project')?.toString().trim();
	const disctrict = formData.get('disctrict')?.toString().trim() ?? '';
	const street = formData.get('street')?.toString().trim() ?? '';
	const location = formData.get('location')?.toString().trim() ?? '';
	const description = formData.get('description')?.toString().trim() ?? '';
	const proposer = formData.get('proposer')?.toString().trim() ?? '';
	const email = formData.get('email')?.toString().trim() ?? '';
	const additional = formData.get('additional')?.toString().trim() ?? '';

	//temporray check files

	const files = formData.getAll('photo') as File[];

	console.log(files);

	// Validate each field and accumulate errors
	const errors: string[] = [];

	if (!project || project.length < 10) {
		errors.push(t('projectError'));
	}

	if (!location || location.length < 15) {
		errors.push(t('locationError'));
	}

	if (!description || description.length < 50) {
		errors.push(t('descriptionError'));
	}

	if (!proposer || proposer.length < 2) {
		errors.push(t('proposerError'));
	}

	if (!email || !email.includes('@')) {
		errors.push(t('emailError'));
	}

	// If there are any errors, return them
	if (errors.length > 0) {
		return {
			status: false,
			message: errors,
		};
	}

	// If all fields are valid, proceed with creating user
	const newUserUsername = email?.split('@')[0] || '';

	const userData = {
		name: newUserUsername,
		username: newUserUsername,
		email: email ?? '',
		password: generatePassword(),
	};

	// First create user on forum
	const responseUser = await createDiscourseUser(userData);

	if (!responseUser.ok) {
		const errorText = await responseUser.text();
		console.error('Error creating user:', errorText);
		return {
			status: false,
			message: [`Failed to create user: ${responseUser.statusText}`],
		};
	} else {
		// User created successfully, now create topic
		const dataUser = await responseUser.json();

		// Upload file to Discourse if it exist
		let fileUrl = '';
		const file = formData.get('photo') as File;
		if (file) {
			fileUrl = await uploadFileToDiscourse(file);
		}

		const topicData = {
			username: newUserUsername,
			title: 'Prijedlog:' + project,
			description: generateProposalTopicDescription({
				disctrict,
				street,
				location,
				description,
				proposer,
				username: newUserUsername,
				email,
				additional,
				fileUrl,
			}),
			category: 8,
		};

		console.log('User created successfully:', dataUser);

		const responseTopic = await createDiscourseTopic(topicData);

		if (!responseTopic.ok) {
			const errorText = await responseTopic.text();
			console.error('Error creating topic:', errorText);
			return {
				status: false,
				message: [`Failed to create topic: ${responseTopic.statusText}`],
			};
		}

		const data = await responseTopic.json();
	}

	return {
		status: true,
		message: ['successREMOVE'],
	};
}
