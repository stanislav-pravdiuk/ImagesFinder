import { BASE_URL, API_KEY } from "./api";

// const fetchPix = (searchQuery, page) => {
//     return fetch(
//         `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             return Promise.reject(new Error('WTF?!'));
//         });
// };

const fetchPix = async (searchQuery, page) => {
    const response = await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`);
            if (response.ok) {
            const data = await response.json();
            return data;
            }
        throw new Error('Error fetching pix');
};

export { fetchPix };