const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

function show() {
    this.setAttribute('data-show', '');
}

function hide() {
    this.removeAttribute('data-show');
}

let message_nodes = document.querySelector('#messages-container').childNodes
message_nodes.forEach(function (message_node) {
    let target_id = message_node.getAttribute('data-target');
    let or = document.getElementById(target_id);

    if (or) {
        Popper.createPopper(or, message_node);
        showEvents.forEach(function (event) {
            or.addEventListener(event, function () {
                message_node.setAttribute('data-show', '');
            });
        });
        hideEvents.forEach(function (event) {
            or.addEventListener(event, function () {
                message_node.removeAttribute('data-show');
            });
        });
    }
});
