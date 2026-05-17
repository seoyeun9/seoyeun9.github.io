const items = document.querySelectorAll('.avoid-mouse');
const avoidRadius = 180;
const pushStrength = 70;

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();

        // [교정] 데이터가 비어있으면(||) 무조건 기본값 0으로 시작하게 만듭니다 (NaN 방지)
        let currentX = parseFloat(item.dataset.currentX) || 0;
        let currentY = parseFloat(item.dataset.currentY) || 0;
      
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

            // 서연님이 CSS에 이미 넣어둔 기본 이미지 회전값(rotate)들과 충돌하지 않도록
            // 마우스 이동 시 움직이는 회전 강도를 살짝 다듬었습니다.
            const rotate = currentX * 0.02; 

            item.dataset.currentX = currentX;
            item.dataset.currentY = currentY;

            item.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;
        } 
    });
});
