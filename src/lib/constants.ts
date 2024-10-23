export const api_url = 'http://cozywear.me/api';

export const userTypes = new Map([
	['Customer', 0],
	['Tailor', 1],
	['Merchant', 2]
]);

export const userTypeRoutes = new Map([
	[0, '/customer'],
	[1, '/tailor'],
	[2, '/merchant']
]);
