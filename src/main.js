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

// Get screen dimensions for responsive scaling
function getScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const minDimension = Math.min(width, height);
    return { width, height, minDimension };
}

// Calculate responsive scale based on screen size
function getResponsiveScale() {
    const { width, height, minDimension } = getScreenSize();
    
    // Base scale for different screen sizes - increased for mobile
    if (minDimension < 600) {
        return 1.2; // Mobile phones - increased from 0.8
    } else if (minDimension < 900) {
        return 1.4; // Tablets - increased from 1.0
    } else if (minDimension < 1200) {
        return 1.6; // Small laptops - increased from 1.2
    } else {
        return 1.8; // Large screens - increased from 1.5
    }
}

// iOS Safari viewport change detection
let lastViewportHeight = window.innerHeight;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function handleViewportChange() {
    if (isIOS) {
        const currentHeight = window.innerHeight;
        if (Math.abs(currentHeight - lastViewportHeight) > 50) {
            // Significant viewport change detected
            lastViewportHeight = currentHeight;
            
            // Force recalculation of responsive scaling
            setTimeout(() => {
                updateTextSizes();
                handleScroll();
            }, 100);
        }
    }
}

// Add images to sides with optimized sizing
for (let i = 0; i < sides.length+subSides.length; i++) {
    if (i < 4 && i !== 2)
        sides[i].innerHTML = `<div class="relative"><img src="./img${i+1}.jpg" alt="<3" class="max-h-20 max-w-20"><img src="./corner.png" class="absolute -top-1 -left-1 w-3 h-3"><img src="./corner.png" class="absolute -top-1 -right-1 w-3 h-3 -scale-x-100"><img src="./corner.png" class="absolute -bottom-1 -left-1 w-3 h-3 -scale-y-100"><img src="./corner.png" class="absolute -bottom-1 -right-1 w-3 h-3 -scale-x-100 -scale-y-100"></div>`
    else if (i !== 2) {
        subSides[i - 4].classList.add("size-12");
        subSides[i - 4].innerHTML = `<div class="relative"><img src="./img${i + 1}.jpg" alt="<3" class="max-h-9 max-w-9"><img src="./corner.png" class="absolute -top-0.5 -left-0.5 w-2 h-2"><img src="./corner.png" class="absolute -top-0.5 -right-0.5 w-2 h-2 -scale-x-100"><img src="./corner.png" class="absolute -bottom-0.5 -left-0.5 w-2 h-2 -scale-y-100"><img src="./corner.png" class="absolute -bottom-0.5 -right-0.5 w-2 h-2 -scale-x-100 -scale-y-100"></div>`;
    }
}

// Initialize text with blur effects
for (let i = 0; i < bottomTexts.length; i++) {
    // bottomTexts[i].style.filter = i === 0 ? "blur(0px)" : "blur(150px)";
    bottomTexts[i].style.opacity = i === 0 ? "100%" : "0%";
}

top.style.opacity = '1';

window.onload = () => {
    console.log("alo");
    setTimeout(() => {blackCurtain.style.opacity = '0'}, 350);
}

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth easing function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Update text sizes based on responsive scaling
function updateTextSizes() {
    const responsiveScale = getResponsiveScale();
    const { minDimension } = getScreenSize();
    
    // Calculate text size based on screen size
    let textSize, textWidth;
    textSize = '1rem';
    textWidth = '90px';
    
    // Update box side text sizes
    sides.forEach(side => {
        if (side) {
            side.style.fontSize = textSize;
        }
    });
    
    // Update sub-side text sizes
    subSides.forEach(side => {
        if (side) {
            side.style.fontSize = textSize;
        }
    });
    
    // Update bottom text sizes
    bottomTexts.forEach(text => {
        if (text) {
            text.style.fontSize = `calc(${textSize} * 0.7)`;
            text.style.width = textWidth;
        }
    });
}

// Optimized scroll handler with responsive heart sizing
const handleScroll = throttle((e) => {
    const scrollY = window.scrollY;
    const maxScroll = 5000; // Reduced from 13000
    const progress = Math.min(scrollY / maxScroll, 1);
    const easedProgress = easeInOutCubic(progress);
    
    // Get responsive scale
    const responsiveScale = getResponsiveScale();
    const { width, height } = getScreenSize();
    
    // Update text sizes
    updateTextSizes();
    
    // Under text appears at the top of the heart after formation
    const heartFormationComplete = 11000; // When heart is fully formed
    const textAppearStart = heartFormationComplete + 500; // Start appearing after heart is formed
    
    if (scrollY < heartFormationComplete) {
        // Hide text during heart formation
        underText.style.opacity = '0';
        underText.style.transform = 'scale(0.1) translateY(0px)';
    } else if (scrollY >= textAppearStart) {
        // Show text at the top of the heart
        const textProgress = Math.min((scrollY - textAppearStart) / 1000, 1);
        const textScale = (0.5 + (textProgress * 0.5)) * responsiveScale; // Scale from 0.5 to 1
        const textTranslateY = -50 - (textProgress * 50); // Position at top of heart
        underText.style.opacity = textProgress;
        underText.style.transform = `scale(${textScale}) translateY(${textTranslateY}px)`;
    } else {
        // Transition period
        const transitionProgress = (scrollY - heartFormationComplete) / 500;
        underText.style.opacity = transitionProgress;
        underText.style.transform = `scale(${(0.1 + transitionProgress * 0.4) * responsiveScale}) translateY(${-200 * transitionProgress}px)`;
    }
    
    // Box scaling with responsive sizing
    const baseBoxScale = Math.max(200-scrollY/15, 100)/100;
    const finalBoxScale = baseBoxScale * responsiveScale;
    const boxTranslateY = -Math.min(scrollY/15, 30);
    
    // Adjust heart position to fit screen with reduced margins
    const heartMaxWidth = width * 0.95; // Increased from 0.8 - reduced margins
    const heartMaxHeight = height * 0.95; // Increased from 0.8 - reduced margins
    const heartSize = 96 * finalBoxScale; // 96px is the base size (size-24)
    
    let heartTranslateX = 0;
    let heartTranslateY = 0;
    
    // Center the heart and ensure it fits with minimal margins
    if (heartSize > heartMaxWidth) {
        const scaleFactor = heartMaxWidth / heartSize;
        box.style.transform = `scale(${finalBoxScale * scaleFactor}) translateY(${boxTranslateY}px)`;
    } else if (heartSize > heartMaxHeight) {
        const scaleFactor = heartMaxHeight / heartSize;
        box.style.transform = `scale(${finalBoxScale * scaleFactor}) translateY(${boxTranslateY}px)`;
    } else {
        box.style.transform = `scale(${finalBoxScale}) translateY(${boxTranslateY}px)`;
    }
    
    // Top side animation
    const topOpacity = scrollY/2;
    // const topRotate = scrollY/20;
    top.style.opacity = `${100-Math.min(scrollY/10, 100)}%`;
    
    // Main sides rotation with smoother easing
    for (let i = 0; i < 4; i++) {
        const rotation = i === 2 ?
            -Math.max(90 - scrollY/10, -80) :
            ((i%2) * 2 - 1) * Math.max(90 - scrollY/20, 0);
        sides[i].style.transform = `rotate${i < 2 ? 'Y': 'X'}(${rotation}deg)`;
        
        // Sub-sides movement for heart formation
        if (i < 2) {
            const translateY = Math.min(scrollY/12, 120);
            const translateX = i === 1 ?
                -Math.max(Math.min((scrollY-7000)/120, 7), 0)*10 :
                Math.max(Math.min((scrollY-7000)/120, 7), 0)*10;
            subSides[i].style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;
        }
    }
    
    // Additional sub-sides for heart petals
    for (let j = 2; j < 6; j++) {
        const translateX = j < 4 ?
            -Math.min(scrollY/12, 120) :
            Math.min(scrollY/12, 120);
        const translateY = j === 3 || j === 4 ?
            -Math.max(Math.min((scrollY-3000)/120, 7), 0)*10 :
            Math.max(Math.min((scrollY-3000)/120, 7), 0)*10;
        subSides[j].style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
    
    // Final sub-sides movement
    for (let j = 6; j < 9; j++) {
        const translateAxis = j < 8 ? 'X' : 'Y';
        const translateValue = j === 7 ?
            -Math.min(scrollY/12, 120) - Math.max(Math.min((scrollY-10000)/120, 4.8), 0)*10 :
            Math.min(scrollY/12, 120) + Math.max(Math.min((scrollY-10000)/120, 4.8), 0)*10;
        subSides[j].style.transform = `translate${translateAxis}(${translateValue}px)`;
    }
    
    // Original text blur animation
   /* bottomTexts[0].style.filter = `blur(${Math.min(Math.max(scrollY/20-140, 0), 150)}px)`;
    bottomTexts[1].style.filter = `blur(${Math.min(Math.max(150 - Math.max(scrollY/20-50, 0), 0) + 2*Math.max(scrollY/20-270, 0), 150)}px)`;
    bottomTexts[2].style.filter = `blur(${Math.min(Math.max(150 - Math.max(scrollY/20-150, 0), 0) + 2*Math.max(scrollY/20-370, 0), 150)}px)`;
    bottomTexts[3].style.filter = `blur(${Math.min(Math.max(150 - Math.max(scrollY/20-250, 0), 0), 150)}px)`;*/

    // Original opacity animation
    bottomTexts[0].style.opacity = `${100-Math.min(Math.max(scrollY/15-110, 0), 100)}%`;
    bottomTexts[1].style.opacity = `${100-Math.min(Math.max(150 - Math.max(scrollY/15-140, 0), 0) + 2*Math.max(scrollY/15-400, 0), 100)}%`;
    bottomTexts[2].style.opacity = `${100-Math.min(Math.max(150 - Math.max(scrollY/15-400, 0), 0) + 2*Math.max(scrollY/15-600, 0), 100)}%`;
    bottomTexts[3].style.opacity = `${100-Math.min(Math.max(150 - Math.max(scrollY/15-600, 0), 0), 100)}%`;
}, 16); // ~60fps

// Handle window resize for responsive updates
window.addEventListener('resize', () => {
    // Recalculate responsive scaling when window is resized
    handleViewportChange();
    updateTextSizes();
    handleScroll();
});

// Handle iOS Safari viewport changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        handleViewportChange();
        updateTextSizes();
        handleScroll();
    }, 500);
});

// Initialize text sizes on load
window.addEventListener('load', () => {
    updateTextSizes();
});

window.addEventListener('scroll', handleScroll);
