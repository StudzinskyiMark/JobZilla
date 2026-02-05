import { SignUpSchema } from '@/lib/zodTypes';

export async function POST(request: Request) {
	const body = await request.json();

	const result = SignUpSchema.safeParse(body);
	let zodErrors = {};
	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
		});
	}

	return new Response(
		JSON.stringify(
			Object.keys(zodErrors).length > 0
				? { errors: zodErrors }
				: { success: true },
		),
	);
}
