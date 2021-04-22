(function ($) {
  var PREFIX = yzhanPrefix || 'yzhan'
  var $modal, $modalHeader, $modalHeaderCloseBtn, $modalBody, $modalIframe

  function initDom() {
    $modal = $('<div>').addClass(PREFIX  + '-modal'),
    $modalHeader = $('<div>').addClass(PREFIX  + '-modal-header'),
    $modalHeaderTitle = $('<div>').addClass(PREFIX  + '-modal-header-title'),
    $modalHeaderCloseBtn = $('<div>').addClass(PREFIX  + '-modal-header-close-btn'),
    $modalBody = $('<div>').addClass(PREFIX  + '-modal-body'),
    $modalIframe = $('<div>').addClass(PREFIX  + '-modal-iframe')
    // Form the DOM
    $modalHeader.append($modalHeaderTitle).append($modalHeaderCloseBtn)
    $modalBody.append($modalIframe)
    $modal.append($modalHeader).append($modalBody)
  }

  function initListener() {
    // show Modal
    $modal.show = function() {
      $this.show()
    }

    // hide Modal
    $modal.hide = function() {
      $this.hide()
    }

    // close Modal
    $modal.close = function() {
      $this.remove()
    }

    // close Modal with Btn
    $modalHeaderCloseBtn.on('click', function() {
      $this.parent().parent().close()
    })

    // drag HeaderBar
    $modalHeader.on('mousedown', function(e) {
      var offsetX = $modal.offset().left
      var offsetY = $modal.offset().top
      var startX = e.pageX
      var startY = e.pageY

      $modal.on('mousemove', function(e) {
        var curX = e.pageX
        var curY = e.pageY

        $modal.css({
          left: offsetX + curX - startX,
          top: offsetY + curY - startY
        })
      })

      $(document).on('mouseup', function() {
        $modal.off('mousemove')
      })
    })

  }

  $.fn[PREFIX + 'modal'].open = function (opt) {
    var title = opt.title
    var url = opt.url
    if (title && url) {
      initDom()
      initListener()

      $modalHeaderTitle.html(title)
      $modalIframe.attr('src', url)
    }
    return $modal
  }

})(jQuery)