document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.custom-product-gallery');
    const thumbnailsContainer = carousel.querySelector('.thumbnails-container');
    const thumbnails = carousel.querySelectorAll('.thumbnail');
    const leftArrow = carousel.querySelector('.carousel-arrow.left');
    const rightArrow = carousel.querySelector('.carousel-arrow.right');
    const mainImage = document.getElementById('main-product-image');
    const thumbnailImages = thumbnailsContainer.querySelectorAll('.thumbnail img');

    let currentThumbnailIndex = 0; // Houd bij welke thumbnail momenteel in beeld is

    // Zorg dat de eerste thumbnail standaard geselecteerd is en overeenkomt met de hoofdafbeelding
    if (thumbnailImages.length > 0) {
        const firstThumbnail = thumbnailImages[0];
        const firstImageSrc = firstThumbnail.getAttribute('data-full-image');
        mainImage.src = firstImageSrc;
        firstThumbnail.parentElement.classList.add('selected');
    }

    // Klikfunctionaliteit voor thumbnails
    thumbnailImages.forEach((thumbImage, index) => {
        thumbImage.addEventListener('click', function () {
            const fullImage = this.getAttribute('data-full-image');
            if (mainImage) {
                mainImage.src = fullImage;
            }

            // Verwijder 'selected' van alle thumbnails en voeg 'selected' toe aan de huidige
            thumbnailImages.forEach(img => img.parentElement.classList.remove('selected'));
            thumbImage.parentElement.classList.add('selected');

            // Update de huidige index
            currentThumbnailIndex = index;

            // Scroll de geselecteerde thumbnail in beeld
            thumbImage.parentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: index === thumbnails.length - 1 ? 'end' : 'center'
            });

            // Reset de zoom bij het wisselen van de hoofdafbeelding
            resetZoom();
        });
    });

    // Bereken het aantal thumbnails per scroll afhankelijk van het schermformaat
    function getThumbnailsPerScroll() {
        if (window.innerWidth <= 768) {
            return 2; // Mobiel en tablet
        } else {
            return 3; // Desktop
        }
    }

    // Pijl naar links
    leftArrow.addEventListener('click', () => {
        const thumbnailsPerScroll = getThumbnailsPerScroll();
        if (currentThumbnailIndex > 0) {
            currentThumbnailIndex = Math.max(currentThumbnailIndex - thumbnailsPerScroll, 0);
            thumbnails[currentThumbnailIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    });

    // Pijl naar rechts
    rightArrow.addEventListener('click', () => {
        const thumbnailsPerScroll = getThumbnailsPerScroll();
        if (currentThumbnailIndex < thumbnails.length - 1) {
            currentThumbnailIndex = Math.min(currentThumbnailIndex + thumbnailsPerScroll, thumbnails.length - 1);
            thumbnails[currentThumbnailIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: currentThumbnailIndex === thumbnails.length - 1 ? 'end' : 'start'
            });
        }
    });

    // Zoomfunctionaliteit voor de hoofdafbeelding (alleen voor desktop)
    const mainImageContainer = carousel.querySelector('.main-image');
    let isZoomed = false;

    function zoomImage(e) {
        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const offsetX = (x / rect.width) * 100;
        const offsetY = (y / rect.height) * 100;

        mainImage.style.transform = 'scale(1.5)';
        mainImage.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    }

    function resetZoom() {
        isZoomed = false;
        mainImage.style.transform = 'scale(1)';
        mainImage.style.transformOrigin = 'center center';
    }

    // Hover-zoom voor desktop (geen mobiel of tablet)
    if (window.innerWidth > 768) {
        mainImageContainer.addEventListener('mouseenter', function () {
            isZoomed = true;
        });

        mainImageContainer.addEventListener('mousemove', function (e) {
            if (isZoomed) {
                zoomImage(e);
            }
        });

        mainImageContainer.addEventListener('mouseleave', resetZoom);
    }
});
