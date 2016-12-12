jQuery(function($) {

  // MAD-RIPPLE // (jQ+CSS)
  $(document).on("mousedown", "[data-ripple]", function(e) {

    var $self = $(this);

    if($self.is(".btn-disabled")) {
      return;
    }
    if($self.closest("[data-ripple]")) {
      e.stopPropagation();
    }

    var initPos = $self.css("position"),
        offs = $self.offset(),
        w = Math.min(this.offsetWidth, 160),
        h = Math.min(this.offsetHeight, 160),
        x = e.pageX - offs.left,
        y = e.pageY - offs.top,
        $ripple = $('<div/>', {class : "ripple",appendTo : $self });

    if(!initPos||initPos==="static") {
      $self.css({position:"relative"});
    }

    $('<div/>', {
      class : "rippleWave",
      css : {
        background: $self.data("ripple"),
        width: h,
        height: h,
        left: x - (h/2),
        top: y - (h/2),
      },
      appendTo : $ripple,
      one : {
        animationend : function(){
          $ripple.remove();
        }
      }
    });
  });

});
