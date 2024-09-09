/**
 * Generates a random password string with a specified length.
 *
 * @param {number} length - The desired length of the generated password. Default is 12 characters.
 * @returns {string} A randomly generated password consisting of uppercase and lowercase letters, digits, and special characters.
 *
 * The function creates a password by selecting random characters from a predefined set of characters
 * including uppercase and lowercase letters, numbers, and special symbols. It iterates `length` times
 * to construct the password string, ensuring that the password has the specified number of characters.
 */
export const generatePassword = (length: number = 12): string => {
	const charset =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
	let password = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
};
