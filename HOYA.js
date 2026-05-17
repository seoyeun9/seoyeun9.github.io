const items = document.querySelectorAll('.avoid-mouse');

items.forEach(item => {
    // 처음 시작할 때 각 이미지의 현재 이동 위치(X, Y) 세팅
    item.dataset.currentX = 0;
    item.dataset.currentY = 0;

    let startX = 0;
    let startY = 0;

    // 1. [핵심] 그냥 클릭했을 때 원래 <a> 태그의 링크 이동 기능 강제로 마비시키기
    // 이렇게 해야 드래그할 때 다른 페이지로 튕기지 않습니다.
    const parentLink = item.closest('a');
    if (parentLink) {
        parentLink.addEventListener('click', (e) => {
            e.preventDefault(); 
        });
    }

    // 2. [핵심] 더블클릭(dblclick)했을 때만 원래 가려던 링크주소로 강제 워프!
    item.addEventListener('dblclick', () => {
        if (parentLink && parentLink.href) {
            window.location.href = parentLink.href;
        }
    });

    // 3. 마우스로 누르기 시작할 때 (드래그 준비)
    item.addEventListener('mousedown', (e) => {
        // 이미지 유령 잔상 차단
        e.preventDefault(); 

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        item.style.transition = 'none';
        item.style.zIndex = '999'; 
    });

    // 4. 마우스를 누른 채로 움직일 때 (드래그 중)
    function onMouseMove(e) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let currentX = parseFloat(item.dataset.currentX) || 0;
        let currentY = parseFloat(item.dataset.currentY) || 0;

        const finalX = currentX + deltaX;
        const finalY = currentY + deltaY;

        // 원래 피그마에서 주신 기본 회전 각도(rotate) 유지 트릭
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

    // 5. 마우스를 놓았을 때 (드롭)
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        item.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        
        // 원상복구할 원래 z-index 값 세팅
        item.style.zIndex = ''; 
    }
});
