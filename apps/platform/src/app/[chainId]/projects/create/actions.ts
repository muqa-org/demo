'use server';

import { generatePassword } from '@/app/helpers/appHelpers';

export async function createProjectAction(prevState: any, formData: FormData) {
	const apiUrl = process.env.NEXT_DISCOURSE_FORUM_URL || '';
	const apiKey = process.env.NEXT_DISCOURSE_API_KEY || '';
	const apiUsername = process.env.NEXT_DISCOURSE_USERNAME || '';

	const title = formData.get('title')?.toString().trim();
	const description = formData.get('description')?.toString().trim();
	const email = formData.get('email')?.toString().trim();

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
			message: `Failed to create user: ${responseUser.statusText}`,
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
				'Api-Username': newUserUsername,
			},
			body: JSON.stringify({
				title: 'Prijedlog:' + title,
				raw: description,
				category: 8,
			}),
		});

		if (!responseTopic.ok) {
			const errorText = await responseTopic.text();
			console.error('Error creating topic:', errorText);
			return {
				status: false,
				message: `Failed to create topic: ${responseTopic.statusText}`,
			};
		}

		const data = await responseTopic.json();
		console.log('Topic created successfully:', data);

    return {
      status: true,
      message: 'Topic created successfully!',
    };
	}

	return {
		status: true,
		message: 'Topic created successfully!',
	};
}
