let circle: HTMLDivElement | null = null;
let styleSheet: HTMLStyleElement | null = null;

/**
 * Creates a glowing circle element.
 * @returns {HTMLElement} The glowing circle element.
 */
const createCircleElement = (): HTMLDivElement => {
    const circleElement = document.createElement('div');
    circleElement.style.width = '60px';
    circleElement.style.height = '60px';
    circleElement.style.background = 'radial-gradient(circle, #5f9eff, #003f9f)';
    circleElement.style.borderRadius = '50%';
    circleElement.style.position = 'absolute';
    circleElement.style.transform = 'translate(-50%, -50%)';
    circleElement.style.display = 'flex';
    circleElement.style.alignItems = 'center';
    circleElement.style.justifyContent = 'center';
    circleElement.style.boxShadow = '0 0 15px 5px rgba(0, 63, 159, 0.5), 0 0 30px 15px rgba(0, 63, 159, 0.3)';
    circleElement.style.animation = 'glow-right 2s infinite';
    circleElement.style.pointerEvents = 'none';
    circleElement.style.zIndex = '9999';
    return circleElement;
}

/**
 * Creates the icon element for the glowing circle.
 * @returns {HTMLElement} The icon element.
 */
const createIconElement = (): HTMLDivElement => {
    const icon = document.createElement('div');
    icon.innerHTML = '✦';
    icon.style.fontSize = '24px';
    icon.style.color = 'white';
    return icon;
}

/**
 * Dynamically adds keyframes for the glow animation.
 */
const addGlowAnimationStyles = (): void => {
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = `
            @keyframes glow-right {
                0% {
                    transform: translate(-50%, -50%) scale(0.9);
                    opacity: 0.9;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0.9);
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

/**
 * Updates the position of the circle relative to the target element.
 * @param {HTMLElement} targetElement - The target element.
 */
const updateCirclePosition = (targetElement: HTMLElement): void => {
    if (!circle) return;
    const rect = targetElement.getBoundingClientRect();
    circle.style.top = `${rect.top + rect.height / 2}px`;
    circle.style.left = `${rect.left + rect.width / 2}px`;
}

/**
 * Creates and attaches a glowing circle to the DOM if it doesn't already exist.
 * @param {HTMLElement} targetElement - The target element.
 */
const createGlowingMovingCircle = (targetElement: HTMLElement): void => {
    if (circle) return;

    addGlowAnimationStyles();

    circle = createCircleElement();
    const icon = createIconElement();
    circle.appendChild(icon);

    updateCirclePosition(targetElement);
    document.body.appendChild(circle);

    window.addEventListener('resize', () => updateCirclePosition(targetElement));
    window.addEventListener('scroll', () => updateCirclePosition(targetElement));
}

/**
 * Shows the glowing circle by creating it or making it visible.
 * @param {HTMLElement} targetElement - The target element.
 */
const showCircle = (targetElement: HTMLElement): void => {
    if (!circle) {
        createGlowingMovingCircle(targetElement);
    } else {
        circle.style.display = 'flex';
        updateCirclePosition(targetElement);
    }
}

/**
 * Hides the glowing circle by setting its display to none.
 */
const hideCircle = (): void => {
    if (circle) {
        circle.style.display = 'none';
    }
}

/**
 * Removes the circle and cleans up event listeners and styles.
 */
const destroyCircle = (): void => {
    if (circle) {
        circle.remove();
        circle = null;
    }
    if (styleSheet) {
        styleSheet.remove();
        styleSheet = null;
    }
    window.removeEventListener('resize', () => {});
    window.removeEventListener('scroll', () => {});
}

interface CircleControls {
    showCircle: (targetElement: HTMLElement) => void;
    hideCircle: () => void;
    destroyCircle: () => void;
}

export default {
    showCircle,
    hideCircle,
    destroyCircle
} as CircleControls;