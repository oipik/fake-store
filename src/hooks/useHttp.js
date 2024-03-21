export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        try {
            const response = await fetch(url, { method, headers, body });

            if (!response.ok) {
                throw new Error(`Couldn't catch ${url}, status: ${response.status}`)
            }

            const data = await response.json();

            return data;
        } catch (err) {
            throw err;
        }
    };

    return { request };
}