'use server';

import { generatePassword } from '@/app/helpers/appHelpers';
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
	const disctrict = formData.get('disctrict')?.toString().trim();
	const street = formData.get('street')?.toString().trim();
	const location = formData.get('location')?.toString().trim();
	const description = formData.get('description')?.toString().trim();
	const proposer = formData.get('descproposeription')?.toString().trim();
	const email = formData.get('email')?.toString().trim();
	const additional = formData.get('additional')?.toString().trim();

	// Validate each field and accumulate errors
	const errors: string[] = [];

	if (!project || project.length < 10) {
		errors.push(t('projectError'));
	}

	if (!disctrict || disctrict.length < 1) {
		errors.push(t('disctrictError'));
	}

	if (!street || street.length < 1) {
		errors.push(t('streetError'));
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

	const newUserUsername = email?.split('@')[0] || '';

	const userData = {
		name: newUserUsername,
		username: newUserUsername,
		email: email || '',
		password: generatePassword(),
		active: true,
		approved: true,
	};

	// First create user on forum
	const responseUser = await fetch(`${apiUrl}/users.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Api-Key': apiKey!,
			'Api-Username': apiUsername,
		},
		body: JSON.stringify(userData),
	});

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

		console.log('User created successfully:', dataUser);

		const responseTopic = await fetch(`${apiUrl}/posts.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Api-Key': apiKey,
				'Api-Username': apiUsername,
			},
			body: JSON.stringify({
				title: 'Prijedlog:' + project,
				raw: description,
				category: 9,
			}),
		});

		if (!responseTopic.ok) {
			const errorText = await responseTopic.text();
			console.error('Error creating topic:', errorText);
			return {
				status: false,
				message: [`Failed to create topic: ${responseTopic.statusText}`],
			};
		}

		const data = await responseTopic.json();
		console.log('Topic created successfully:', data);
	}

	return {
		status: true,
		message: ['Topic created successfully!'],
	};
}
