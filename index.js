let hover_elem = document.querySelector('#oryk-1');
let hover_tooltip = document.querySelector('#oryk-1-tooltip');

Popper.createPopper(hover_elem, hover_tooltip);

function show() {
    hover_tooltip.setAttribute('data-show', '');
}

function hide() {
    hover_tooltip.removeAttribute('data-show');
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    hover_elem.addEventListener(event, show);
});

hideEvents.forEach(event => {
    hover_elem.addEventListener(event, hide);
});
