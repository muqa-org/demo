'use server';

import { ForumLink } from '@/app/config';
import {
	createDiscourseTopic,
	generateProposalTopicDescription,
	uploadFileToDiscourse,
} from '@/app/helpers/discourseHelpers';
import { sendMail } from '@/app/helpers/mailHelpers';
import { getTranslations } from 'next-intl/server';

type MessageType = {
	key: string;
	notice: string;
};

export async function createProjectAction(
	prevState: { status: boolean; message: MessageType[] | string[] },
	formData: FormData,
) {
	const t = await getTranslations('proposalForm');
	const tMail = await getTranslations('proposalMail');

	const apiUsername = process.env.NEXT_DISCOURSE_USERNAME || '';

	const project = formData.get('project')?.toString().trim();
	const location = formData.get('location')?.toString().trim() ?? '';
	const description = formData.get('description')?.toString().trim() ?? '';
	const name = formData.get('name')?.toString().trim() ?? '';
	const publish = formData.get('publish')?.toString().trim() ?? '';
	const proposer = formData.get('proposer')?.toString().trim() ?? '';
	const email = formData.get('email')?.toString().trim() ?? '';
	const mobile = formData.get('mobile')?.toString().trim() ?? '';
	const futher = formData.get('futher')?.toString().trim() ?? '';
	const terms = formData.get('terms')?.toString().trim() ?? '';
	const privacy = formData.get('privacy')?.toString().trim() ?? '';
	const allow = formData.get('allow')?.toString().trim() ?? '';

	// Validate each field and accumulate errors
	const errors: MessageType[] = [];

	if (!project || project.length < 10) {
		errors.push({ key: 'project', notice: t('projectError') });
	}

	if (!location || location.length < 15) {
		errors.push({ key: 'location', notice: t('locationError') });
	}

	if (!description || description.length < 50) {
		errors.push({ key: 'description', notice: t('descriptionError') });
	}

	if (!name || name.length < 2) {
		errors.push({ key: 'name', notice: t('nameError') });
	}

	if (!email || !email.includes('@')) {
		errors.push({ key: 'email', notice: t('emailError') });
	}

	if (!mobile || mobile.length < 6) {
		errors.push({ key: 'mobile', notice: t('mobileError') });
	}

	if (!futher) {
		errors.push({ key: 'futher', notice: t('futherError') });
	}

	if (!terms) {
		errors.push({ key: 'terms', notice: t('termsError') });
	}

	if (!privacy) {
		errors.push({ key: 'privacy', notice: t('privacyError') });
	}

	if (!allow) {
		errors.push({ key: 'allow', notice: t('allowError') });
	}

	// If there are any errors, return them
	if (errors.length > 0) {
		return {
			status: false,
			message: errors,
		};
	}

	// Upload file(s) to Discourse if it exist
	const files = formData.getAll('photo') as File[];
	let fileUrls = [];
	if (files.length > 0) {
		for (const file of files) {
			if (file) {
				const url = await uploadFileToDiscourse(file);
				if (url) {
					fileUrls.push(url);
				}
			}
		}
	}

	const topicData = {
		username: apiUsername,
		title: 'Prijedlog: ' + project,
		description: generateProposalTopicDescription({
			location,
			description,
			name,
			proposer,
			publish,
			email,
			mobile,
			futher,
			terms,
			privacy,
			allow,
			fileUrls,
			notice: t('proposalLastData'),
		}),
		category: 9,
	};

	const responseTopic = await createDiscourseTopic(topicData);

	if (!responseTopic.ok) {
		const errorText = await responseTopic.text();
		console.error('Error creating topic:', errorText);
		return {
			status: false,
			message: [
				{
					key: 'topicCreation',
					notice: `Failed to create topic: ${responseTopic.statusText}`,
				},
			],
		};
	} else {
		const data = await responseTopic.json();

		const topicLink = `${ForumLink}/t/${data.slug}/${data.topic_id}`;

		// Send email to the proposer
		if (data) {
			const messagePart3 = tMail.rich('messagePart3', {
				link: chunks =>
					`<a href='${topicLink}' target='_blank' class='underline hover:text-blue'>${project}</a>`,
			});

			const sendMailData = sendMail({
				from: 'Zazelenimo <postmaster@forum.zazelenimo.com>',
				to: email,
				subject: tMail('subject'),
				html: `
				<p>${tMail('messagePart1', { name: name })}</p>
				<p>${tMail('messagePart2')}</p>
				<p>${messagePart3}</p>
				<p>${tMail('messagePart4')}</p>
				<p>${tMail('messagePart5')}</p>
				<p>${tMail('messagePart6')}<br />${tMail('messagePart7')}</p>
				`,
			});
		}

		return {
			status: true,
			message: [
				{
					key: 'success',
					notice: topicLink,
				},
			],
		};
	}
}
