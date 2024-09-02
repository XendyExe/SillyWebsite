let ticking_scroll = false;
const landing = document.querySelector(".landing-container")!;
const header: HTMLDivElement = document.querySelector(".header")!;

let header_visable = false;
let landing_visable = false;
let cursor_top = false;
function updateHeaderPosition() {
    let hv = landing_visable || cursor_top;
    if (header_visable != hv) {
        header_visable = hv;
        header.classList.toggle("header-active");
    }
}
function updateScrollVariable() {
    ticking_scroll = false;
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

    const landing_rect = landing.getBoundingClientRect();
    landing_visable = landing_rect.bottom < 200;
    updateHeaderPosition();
}
updateScrollVariable();

window.addEventListener('scroll', () => {
    if (!ticking_scroll) {
        requestAnimationFrame(updateScrollVariable);
        ticking_scroll = true;
    }
});

window.addEventListener('mousemove', (event) => {
    cursor_top = event.pageY < 128;
    updateHeaderPosition();
})

function checkVisible(elm: Element) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}