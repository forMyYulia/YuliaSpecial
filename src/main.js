import './style.css'

const box = document.querySelector('#box')
const blackCurtain = document.querySelector('#blackCurtain')
const underText = document.querySelector('#underText')
const top = document.querySelector('#boxSideTop')
const bottomTexts = document.querySelectorAll('.boxSideBottomText')

const sides = [
    document.querySelector('#boxSideRight'),
    document.querySelector('#boxSideLeft'),
    document.querySelector('#boxSideUp'),
    document.querySelector('#boxSideDown'),
]

const subSides = [
    document.querySelector('#boxSubSideDownRight'),
    document.querySelector('#boxSubSideDownLeft'),
    document.querySelector('#boxSubSideLeftUp'),
    document.querySelector('#boxSubSideLeftDown'),
    document.querySelector('#boxSubSideRightUp'),
    document.querySelector('#boxSubSideRightDown'),
    document.querySelector('#boxSubSideRight'),
    document.querySelector('#boxSubSideLeft'),
    document.querySelector('#boxSubSideDown'),
]

for (let i = 0; i < sides.length+subSides.length; i++) {
    if (i < 4 && i !== 2)
        sides[i].innerHTML = `<div class=\"relative\"><img src=\"./img${i+1}.jpg\" alt=\"<3\" class=\"max-h-24 max-w-24\"><img src=\"./corner.png\" class=\"absolute -top-1 -left-1 w-4 h-4\"><img src=\"./corner.png\" class=\"absolute -top-1 -right-1 w-4 h-4 -scale-x-100\"><img src=\"./corner.png\" class=\"absolute -bottom-1 -left-1 w-4 h-4 -scale-y-100\"><img src=\"./corner.png\" class=\"absolute -bottom-1 -right-1 w-4 h-4 -scale-x-100 -scale-y-100\"></div>`
    else if (i !== 2) {
        subSides[i - 4].classList.add("size-16");
        subSides[i - 4].innerHTML = `<div class=\"relative\"><img src=\"./img${i + 1}.jpg\" alt=\"<3\" class=\"max-h-12 max-w-12\"><img src=\"./corner.png\" class=\"absolute -top-1 -left-1 w-3 h-3\"><img src=\"./corner.png\" class=\"absolute -top-1 -right-1 w-3 h-3 -scale-x-100\"><img src=\"./corner.png\" class=\"absolute -bottom-1 -left-1 w-3 h-3 -scale-y-100\"><img src=\"./corner.png\" class=\"absolute -bottom-1 -right-1 w-3 h-3 -scale-x-100 -scale-y-100\"></div>`;
    }
}


for (let i = 0; i < bottomTexts.length; i++) {
    // bottomTexts[i].style.filter = i === 0 ? "blur(0px)" : "blur(150px)";
    bottomTexts[i].style.opacity = i === 0 ? "100%" : "0%";
}

// box.style.opacity = '1';
top.style.opacity = '1';

window.onload = () => {
    blackCurtain.style.opacity = '0';
}

window.addEventListener('scroll', (e) => {
    underText.style.transform = `scale(${Math.min(window.scrollY / 15, 150) / 100}) translateY(-${Math.min(Math.max(window.scrollY/15-720, 0), 65)}px)`
    box.style.transform = `scale(${Math.max(200-window.scrollY/15, 100)/100})`// rotate(${Math.max(Math.min((window.scrollY-2500)/80, 20), 0)}deg)`;
    top.style.transform = `translateY(-${window.scrollY/2}px) rotate(${window.scrollY/20}deg)`;
    // bottomText.style.transform = `rotate(-${Math.max(Math.min((window.scrollY-2500)/80, 20), 0)}deg)`;
    for (let i = 0; i < 4; i++) {
        sides[i].style.transform = `rotate${i < 2 ? 'Y': 'X'}(${i === 2 ? -Math.max(90 - window.scrollY/10, -90) : ((i%2) * 2 - 1)*Math.max(90 - window.scrollY/20, 0)}deg)`;
        if (i < 2)
            subSides[i].style.transform = `translateY(${Math.min(window.scrollY/12, 148)}px) translateX(${i === 1 || i === 2 ? '': '-'}${Math.max(Math.min((window.scrollY-6300)/120, 9), 0)*10}px)`;
    }
    for (let j = 2; j < 6; j++) {
        subSides[j].style.transform = `translateX(${j < 4 ? '-': ''}${Math.min(window.scrollY/12, 148)}px) translateY(${j === 3 || j === 4 ? '': '-'}${Math.max(Math.min((window.scrollY-3000)/120, 9), 0)*10}px)`;
    }
    for (let j = 6; j < 9; j++) {
        subSides[j].style.transform = `translate${j < 8? 'X' : 'Y'}(${j === 7 ? '-': ''}${Math.min(window.scrollY/12, 148)+Math.max(Math.min((window.scrollY-9800)/120, 6), 0)*10}px)`;
    }
    // bottomTexts[0].style.filter = `blur(${Math.min(Math.max(window.scrollY/20-140, 0), 150)}px)`;
    // bottomTexts[1].style.filter = `blur(${Math.min(Math.max(150 - Math.max(window.scrollY/20-50, 0), 0) + 2*Math.max(window.scrollY/20-270, 0), 150)}px)`;
    // bottomTexts[2].style.filter = `blur(${Math.min(Math.max(150 - Math.max(window.scrollY/20-150, 0), 0) + 2*Math.max(window.scrollY/20-370, 0), 150)}px)`;
    // bottomTexts[3].style.filter = `blur(${Math.min(Math.max(150 - Math.max(window.scrollY/20-250, 0), 0), 150)}px)`;

    bottomTexts[0].style.opacity = `${100-Math.min(Math.max(window.scrollY/15-150, 0), 100)}%`;
    bottomTexts[1].style.opacity = `${100-Math.min(Math.max(150 - Math.max(window.scrollY/15-200, 0), 0) + 2*Math.max(window.scrollY/15-400, 0), 100)}%`;
    bottomTexts[2].style.opacity = `${100-Math.min(Math.max(150 - Math.max(window.scrollY/15-400, 0), 0) + 2*Math.max(window.scrollY/15-600, 0), 100)}%`;
    bottomTexts[3].style.opacity = `${100-Math.min(Math.max(150 - Math.max(window.scrollY/15-600, 0), 0), 100)}%`;
})
