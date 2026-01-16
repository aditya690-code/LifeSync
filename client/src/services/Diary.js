import axios from 'axios';

const baseUrl = 'http://localhost:8000';

// Diary pagination data
const diaryData = async (limit, skip) => {
    try {
        const response = await axios.post(`${baseUrl}/diary`, {
            params: { limit, skip }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching diary data:', error);
        throw error;
    }
};

export default diaryData;