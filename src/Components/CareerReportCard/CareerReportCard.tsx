import axios from 'axios'

const key = JSON.parse(localStorage.getItem("MYKEY") || '""');

interface CRP_props{
    role: string
    description: string
}

const openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`,
    },
    });    

function CareerReportCard({role, description}:CRP_props) {
   

    const generateImage = async (image: string) => {
        const prompt = `A picture of ${image}`
        try {
            const response = await openai.post('/images/generations', {
            prompt,
            n: 1, // Number of images to generate
            size: '512x512', // Image size
            });
            return response.data.data[0].url; // Return the image URL
            } catch (error) {
            console.error("Error generating image:", error);
            throw error;
            }
     }

     const image = generateImage(role);
     

    return <div>
      Role: {role}
      Description: {description}

    </div>
}

export default CareerReportCard
