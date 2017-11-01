/**
 * Created by Nazar on 03.07.2017.
 */

$(function () {

    //configuration
    var width = $('#slider').outerWidth();
    /*alert(width);*/
    var animationSpeed = 1000;
    var pause = 5000;
    var currentSlide = 1;

    //cache DOM
    var  $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');
    //if window width is changed
    $(window).resize(function () {
        width = $('#slider').outerWidth();
        $slideContainer.css('margin-left', 0);
        currentSlide = 1;
        console.log(width);
    });
    //setInterval
    // animate margin-left
    //if it is last slide, go to position 1 (0px)
    var interval;
    function startSlider() {
        //alert("WORK SLIDER");
        interval = setInterval(function () {
            $slideContainer.animate({'margin-left': '-='+width },animationSpeed, function () {
                currentSlide++;
                if(currentSlide === $slides.length){
                    currentSlide = 1;

                    $slideContainer.animate({'margin-left': 0}, animationSpeed*6,function () {

                    });
                }
            });
        },pause);

    }
    function stopSlider() {
        clearInterval(interval);
    }
    /*$slider.on('mouseenter', stopSlider()).on('mouseleave', startSlider());
     */
//startSlider();
    var i = 0;
    $slider.mouseenter(function () {
        stopSlider();
        console.log('slider stopped');
    });
    $slider.mouseleave(function () {
        console.log('slider started');
        startSlider();
    });
    startSlider();
    //listen for mouseenter and pause
    //resume on mouseleave
});