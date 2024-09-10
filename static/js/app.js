document.addEventListener('DOMContentLoaded', () => {
    const generateCatBtn = document.getElementById('generateCatBtn');
    const catImageContainer = document.getElementById('catImageContainer');

    generateCatBtn.addEventListener('click', generateCat);

    async function generateCat() {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            
            if (data && data.length > 0) {
                const catImageUrl = data[0].url;
                catImageContainer.innerHTML = `<img src="${catImageUrl}" alt="Random Cat" class="rounded-lg shadow-md">`;
            } else {
                throw new Error('No cat image found');
            }
        } catch (error) {
            console.error('Error fetching cat image:', error);
            catImageContainer.innerHTML = '<p class="text-red-500">Failed to fetch cat image. Please try again.</p>';
        }
    }
});
