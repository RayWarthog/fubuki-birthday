const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

let popper_instances = {};

let show = () => {
    this.setAttribute('data-show', '');
}

let hide = () => {
    this.removeAttribute('data-show');
}

let message_nodes = document.querySelector('#messages-container').childNodes
message_nodes.forEach((message_node) => {
    let target_id = message_node.getAttribute('data-target');
    let or = document.getElementById(target_id);

    if (or) {
        let instance = Popper.createPopper(or, message_node, {
            placement: 'auto'
        });
        showEvents.forEach((event) => {
            or.addEventListener(event, function () {
                message_node.setAttribute('data-show', '');
            });
        });
        hideEvents.forEach((event) => {
            or.addEventListener(event, function () {
                message_node.removeAttribute('data-show');
            });
        });
        popper_instances[target_id] = instance;
    }
});

// Editing mode
let edit_mode = true;

let update_tooltip_position = (target_id) => {
    if (typeof target_id === 'undefined') {
        return;
    }
    if (!target_id) {
        return;
    }
    if (target_id in popper_instances) {
        popper_instances[target_id].update();
    }
}

let make_element_transformable = (elem) => {
    $(elem).draggable({
        containment: "#content",
        start: function() {
            $(this).parent().append($(this));
        },
        stop: function () {
            var l = (100 * parseFloat($(this).position().left / parseFloat($(this).parent().width()))) + "%";
            var t = (100 * parseFloat($(this).position().top / parseFloat($(this).parent().height()))) + "%";
            $(this).css("left", l);
            $(this).css("top", t);
        },
        drag: function () {
            update_tooltip_position(this.id);
        },
    });
    $(elem).click(function(){
        $(this).parent().append($(this));
    });
}

let toggleEditMode = (enable) => {
    if (typeof enable === 'undefined') {
        edit_mode = !edit_mode;
    } else {
        edit_mode = enable;
    }
    let edit_controls = document.querySelector('#edit-controls');
    if (edit_mode) {
        edit_controls.style.display = 'block';
        $('.oruyanke').draggable('enable');
    } else {
        edit_controls.style.display = 'none';
        $('.oruyanke').draggable('disable');
    }
    return edit_mode;
}

$('#add-btn').click(function(){
    let elem = $('<img></img>').addClass('oruyanke').attr('src', "img/templateoruyanke.png");
    $('#main-img-container').append(elem);
    make_element_transformable(elem);
});

$('.oruyanke').each(function () {
    make_element_transformable(this);
});
toggleEditMode(edit_mode);
