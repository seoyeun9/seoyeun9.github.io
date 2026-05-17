const items = document.querySelectorAll('.avoid-mouse');
    
const avoidRadius = 180;
const pushStrength = 70;

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();

            let currentX = parseFloat(item.dataset.currentX);
            let currentY = parseFloat(item.dataset.currentY);
          
            const itemX = (rect.left - currentX) + rect.width / 2;
            const itemY = (rect.top - currentY) + rect.height / 2;
    
            const distX = itemX - mouseX;
            const distY = itemY - mouseY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < avoidRadius) {
                const angle = Math.atan2(distY, distX);

const force = (avoidRadius - distance) / avoidRadius;
            const pushDist = force * pushStrength;

            currentX += Math.cos(angle) * pushDist;
            currentY += Math.sin(angle) * pushDist;

            const rotate = currentX * 0.05; 

            item.dataset.currentX = currentX;
            item.dataset.currentY = currentY;

            item.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;
        } 
    });
});
