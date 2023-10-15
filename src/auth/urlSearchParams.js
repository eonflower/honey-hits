export const generateUrlWithSearchParams = (url, params) => {
	const urlObject = new URL(url);
	urlObject.search = new URLSearchParams(params).toString();

	return urlObject.toString();
}

export default generateUrlWithSearchParams;