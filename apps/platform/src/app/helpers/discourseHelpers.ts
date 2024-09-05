import { generatePassword } from '@/app/helpers/appHelpers';

const apiUrl = process.env.NEXT_DISCOURSE_FORUM_URL || '';
const apiKey = process.env.NEXT_DISCOURSE_API_KEY || '';
const apiUsername = process.env.NEXT_DISCOURSE_USERNAME || '';

/**
 * Function to create a new user in Discourse.
 *
 * @param {Object} userData - The data needed to create a new user.
 * @param {string} userData.name - The full name of the user.
 * @param {string} userData.username - The desired username for the user.
 * @param {string} userData.password - The password for the user.
 * @param {string} userData.email - The email address of the user.
 *
 * @returns {Promise<Response>} - Returns the API response from Discourse. It includes status and any error information if the request fails.
 */
export const createDiscourseUser = async ({
	name,
	username,
	password,
	email,
}: {
	name: string;
	username: string;
	password: string;
	email: string;
}) => {
	const userData = {
		name: name,
		username: username,
		email: email,
		password: password,
		active: true,
		approved: true,
	};

	const response = await fetch(`${apiUrl}/users.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Api-Key': apiKey!,
			'Api-Username': apiUsername,
		},
		body: JSON.stringify(userData),
	});

	return response;
};

/**
 * Function to upload a file to Discourse.
 *
 * @param {File} formDataFile - The file to be uploaded.
 *
 * @returns {Promise<string|null>} - Returns the URL of the uploaded file if successful, or `null` if the upload fails.
 *
 * @throws {Error} - Throws an error if no file is provided.
 */
export async function uploadFileToDiscourse(formDataFile: any) {
	const file = formDataFile as File;
	if (!file) {
		throw new Error('No file provided.');
	}

	const uploadFormData = new FormData();
	uploadFormData.append('file', file);
	uploadFormData.append('type', 'composer');
	uploadFormData.append('synchronous', 'true');

	const response = await fetch(`${apiUrl}/uploads.json`, {
		method: 'POST',
		headers: {
			'Api-Key': apiKey,
			'Api-Username': apiUsername,
		},
		body: uploadFormData, // Sending the FormData that includes the file
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error('Error uploading file:', errorText);
		return null;
	}

	const data = await response.json();

	return data.url;
}

/**
 * Function to create a new topic (post) in Discourse.
 *
 * @param {Object} topicData - The data required to create the new topic.
 * @param {string} topicData.username - The username of the new topic.
 * @param {string} topicData.title - The title of the new topic.
 * @param {string} topicData.description - The content of the post for the topic.
 * @param {number} topicData.category - The ID of the category where the topic will be created.
 *
 * @returns {Promise<Response>} - Returns the API response from Discourse. It includes status and any error information if the request fails.
 */
export const createDiscourseTopic = async ({
	username,
	title,
	description,
	category,
}: {
	username: string;
	title: string;
	description: string;
	category: number;
}) => {
	const response = await fetch(`${apiUrl}/posts.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Api-Key': apiKey,
			'Api-Username': username,
		},
		body: JSON.stringify({
			title: title,
			raw: description,
			category: category,
			archetype: 'private_message',
			target_recipients: `kechy,${username}`, // Replace `admin` with the actual admin username
		}),
	});

	return response;
};

/**
 * Function to generate a formatted description for a Discourse topic.
 *
 * This function formats the provided information (like location, description, etc.)
 * into a structured Markdown-style string that will be used as the topic's content.
 *
 * @param {Object} proposalData - The data to include in the topic description.
 * @param {string} proposalData.disctrict - The name of the district where the proposal will be carried out.
 * @param {string} proposalData.street - The street where the proposal will be carried out.
 * @param {string} proposalData.location - Detailed location description.
 * @param {string} proposalData.description - Description of the proposal.
 * @param {string} proposalData.proposer - The name of the person or organization submitting the proposal.
 * @param {string} proposalData.username - The username of the person submitting the proposal.
 * @param {string} proposalData.email - The email address of the person submitting the proposal.
 * @param {string} proposalData.additional - Any additional information related to the proposal.
 * @param {string} [proposalData.fileUrl] - Optional URL of a file (image or document) to be included in the proposal.
 *
 * @returns {string} - Returns a formatted string that will be used as the post's content in Markdown format.
 */
export const generateProposalTopicDescription = ({
	disctrict,
	street,
	location,
	description,
	proposer,
	username,
	email,
	additional,
	fileUrl,
}: {
	disctrict: string;
	street: string;
	location: string;
	description: string;
	proposer: string;
	username: string;
	email: string;
	additional: string;
	fileUrl: string;
}) => {
	const rawDescription = `
**Kvart:** ${disctrict}
**Ulica:** ${street}
**Opis lokacije:**
${location}

**Opis prijedloga:**
${description}

**Fotografija:** 
${fileUrl && fileUrl.trim() !== '' ? `![Fotografija prijedloga](${fileUrl})` : 'nemamo fotografiju :('}
**Predlagatelj:** ${proposer}
**Predlagateljov username:** @${username}
**Predlagateljov email:** ${email}
**Dodatne informacije:** ${additional}
    `;

	return rawDescription.trim();
};
