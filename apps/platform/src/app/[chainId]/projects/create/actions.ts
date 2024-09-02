'use server';

export async function createUserAction(formData) {
  // Process formData here (e.g., save to a database)
  console.log('Received form data:', formData);

  // Simulate a delay for the example
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Optionally, return some response
  return { success: true, message: 'User created successfully!' };
}
