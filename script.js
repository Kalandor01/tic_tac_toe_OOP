import Field from "../../field.js";

$(window).resize(function() {
    resize();
});

function resize() {
    $(".cell").css("height", $(".cell").css("width"));
    $(".cell").css("font-size", `${$(".cell").width()}px`);
}

$(function() {
    new Field();
    resize();
})