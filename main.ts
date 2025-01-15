let circle: HTMLDivElement | null = null;
let styleSheet: HTMLStyleElement | null = null;

/**
 * Creates a glowing circle element.
 * @param {string} color - The color of the glowing circle (BLUE, GRAY, or PURPLE).
 * @returns {HTMLDivElement} The glowing circle element.
 */
const createCircleElement = (color: string = "BLUE"): HTMLDivElement => {
    const circleElement = document.createElement('div');

    // Define gradient and boxShadow based on color
    const gradient =
        color === "PURPLE"
            ? 'radial-gradient(circle, #9c27b0, #6a0080)'  // More intense purple
            : color === "GRAY"
            ? 'radial-gradient(circle, #c0c0c0, #808080)'
            : 'radial-gradient(circle, #5f9eff, #003f9f)'; // default to BLUE

    const boxShadow =
        color === "PURPLE"
            ? '0 0 15px 5px rgba(156, 39, 176, 0.6), 0 0 30px 15px rgba(106, 0, 128, 0.3)' // Stronger purple glow
            : color === "GRAY"
            ? '0 0 15px 5px rgba(192,192,192,0.5), 0 0 30px 15px rgba(128,128,128,0.3)'
            : '0 0 15px 5px rgba(0, 63, 159, 0.5), 0 0 30px 15px rgba(0, 63, 159, 0.3)'; // default to BLUE

    // Basic styling for the circle
    circleElement.style.width = '60px';
    circleElement.style.height = '60px';
    circleElement.style.background = gradient;
    circleElement.style.borderRadius = '50%';
    circleElement.style.position = 'absolute';
    circleElement.style.transform = 'translate(-50%, -50%)';
    circleElement.style.display = 'flex';
    circleElement.style.alignItems = 'center';
    circleElement.style.justifyContent = 'center';
    circleElement.style.boxShadow = boxShadow;
    circleElement.style.animation = 'glow-right 2s infinite';
    circleElement.style.pointerEvents = 'none';
    circleElement.style.zIndex = '9999';

    return circleElement;
}

/**
 * Creates the icon element for the glowing circle.
 * @returns {HTMLDivElement} The icon element.
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
 * @param {string} color - The color of the glowing circle (BLUE, GRAY, or PURPLE).
 */
const createGlowingMovingCircle = (targetElement: HTMLElement, color: string = "BLUE"): void => {
    if (circle) return;

    addGlowAnimationStyles();

    circle = createCircleElement(color);
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
 * @param {string} color - The color of the glowing circle (BLUE, GRAY, or PURPLE).
 */
const showCircle = (targetElement: HTMLElement, color: string = "BLUE"): void => {
    if (!circle) {
        createGlowingMovingCircle(targetElement, color);
    } else {
        circle.style.display = 'flex';

        // Update background based on selected color
        circle.style.background =
            color === "PURPLE"
                ? 'radial-gradient(circle, #9c27b0, #6a0080)'  // Same as above for consistency
                : color === "GRAY"
                ? 'radial-gradient(circle, #c0c0c0, #808080)'
                : 'radial-gradient(circle, #5f9eff, #003f9f)'; // default to BLUE

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
    showCircle: (targetElement: HTMLElement, color?: string) => void;
    hideCircle: () => void;
    destroyCircle: () => void;
}

export default {
    showCircle,
    hideCircle,
    destroyCircle
} as CircleControls;