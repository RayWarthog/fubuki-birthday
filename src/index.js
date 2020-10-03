tippy('.oruyanke', {
    content(reference) {
        let id = reference.id;
        return document.querySelector('[data-target=' + id + ']');
    },
    interactive: true,
    interactiveBorder: 30,
    hideOnClick: true,
    animation: 'shift-away',
    trigger: 'mouseenter focus click'
});
