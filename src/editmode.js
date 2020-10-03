// Editing mode
let edit_mode = false;
let make_element_transformable = (elem) => {
    $(elem).draggable({
        containment: "#content",
        start: function () {
            $(this).parent().append($(this));
        },
        stop: function () {
            var l = (100 * parseFloat($(this).position().left / parseFloat($(this).parent().width()))) + "%";
            var t = (100 * parseFloat($(this).position().top / parseFloat($(this).parent().height()))) + "%";
            $(this).css("left", l);
            $(this).css("top", t);
        },
    });
    $(elem).click(function () {
        if (edit_mode) {
            $(this).parent().append($(this));
        }
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

$('#add-btn').click(function () {
    let elem = $('<img></img>').addClass('oruyanke').attr('src', "img/templateoruyanke.png");
    $('#main-img-container').append(elem);
    make_element_transformable(elem);
});

$('.oruyanke').each(function () {
    make_element_transformable(this);
});
toggleEditMode(edit_mode);
