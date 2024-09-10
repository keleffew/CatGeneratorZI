document.addEventListener('DOMContentLoaded', () => {
    const generateCatBtn = document.getElementById('generateCatBtn');
    const catImageContainer = document.getElementById('catImageContainer');
    const shareButtons = document.querySelectorAll('.share-btn');

    generateCatBtn.addEventListener('click', generateCat);
    shareButtons.forEach(btn => btn.addEventListener('click', shareCat));

    let currentCatUrl = '';

    async function generateCat() {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            
            if (data && data.length > 0) {
                currentCatUrl = data[0].url;
                catImageContainer.innerHTML = `<img src="${currentCatUrl}" alt="Random Cat" class="rounded-lg shadow-md">`;
            } else {
                throw new Error('No cat image found');
            }
        } catch (error) {
            console.error('Error fetching cat image:', error);
            catImageContainer.innerHTML = '<p class="text-red-500">Failed to fetch cat image. Please try again.</p>';
        }
    }

    function shareCat(event) {
        const platform = event.target.closest('.share-btn').dataset.platform;
        const shareUrl = 'https://zoominfo-cat-generator.com'; // Replace with your actual website URL
        const shareText = 'Check out this adorable cat I generated!';
        
        if (navigator.share && platform === 'native') {
            navigator.share({
                title: 'ZoomInfo Cat Generator',
                text: shareText,
                url: currentCatUrl || shareUrl
            }).catch(error => console.error('Error sharing:', error));
        } else {
            let url;
            switch (platform) {
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentCatUrl || shareUrl)}`;
                    break;
                case 'twitter':
                    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentCatUrl || shareUrl)}`;
                    break;
                case 'linkedin':
                    url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentCatUrl || shareUrl)}&title=${encodeURIComponent('ZoomInfo Cat Generator')}&summary=${encodeURIComponent(shareText)}`;
                    break;
            }
            window.open(url, '_blank', 'width=600,height=400');
        }
    }
});
