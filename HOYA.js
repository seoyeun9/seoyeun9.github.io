const items = document.querySelectorAll('.avoid-mouse');

let highestZIndex = 100;

items.forEach(item => {

    item.dataset.currentX = 0;
    item.dataset.currentY = 0;

    let startX = 0;
    let startY = 0;

    const parentLink = item.closest('a');
    if (parentLink) {
        parentLink.addEventListener('click', (e) => {
            e.preventDefault(); 
        });
    }
    
    item.addEventListener('dblclick', () => {
        if (parentLink && parentLink.href) {
            window.location.href = parentLink.href;
        }
    });

    item.addEventListener('mousedown', (e) => {
        e.preventDefault(); 

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        item.style.transition = 'none';
        
        highestZIndex++; 
        item.style.zIndex = highestZIndex;
    });

    function onMouseMove(e) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let currentX = parseFloat(item.dataset.currentX) || 0;
        let currentY = parseFloat(item.dataset.currentY) || 0;

        const finalX = currentX + deltaX;
        const finalY = currentY + deltaY;

        const computedStyle = window.getComputedStyle(item);
        const matrix = computedStyle.transform;
        let rotateStr = '';
        
        if (matrix && matrix !== 'none') {
            rotateStr = matrix; 
            item.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) ${rotateStr.replace(/matrix\(.*?\)/, '')}`;
        } else {
            item.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
        }

        startX = e.clientX;
        startY = e.clientY;

        item.dataset.currentX = finalX;
        item.dataset.currentY = finalY;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        item.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; 

        const randomRotate = Math.floor(Math.random() * 21) - 10; 

        const currentX = parseFloat(item.dataset.currentX) || 0;
        const currentY = parseFloat(item.dataset.currentY) || 0;

        item.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${randomRotate}deg)`;
    }
});
