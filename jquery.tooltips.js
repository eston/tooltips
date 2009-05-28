/**
 *  Tooltips
 *  A jQuery-based tooltip engine.
 *
 *  By Eston Bond (eston@socialuxe.com)
 *  Copyright (c) 2009 Eston Bond.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author eston
 *  @requires jquery-1.3.2
 *  @provides tooltips
**/
(function($) {
  
  var shown = false;
  var options = null;
  var timer = null;
  var target = null;
  var x = null;
  var y = null;
  
  
  $.fn.tooltip = function (incomingOptions) {
    options = $.fn.extend({}, $.fn.tooltip.defaultOptions, incomingOptions);
    console.log(options);
    $(this).bind('click.tooltip', function(e) {
      x = e.pageX + 10;
      y = e.pageY + 10;
      target = e.currentTarget;
      showTooltip();
    });
    $(this).bind('mouseenter.tooltip', function(e) {
      x = e.pageX + 10;
      y = e.pageY + 10;
      target = e.currentTarget;
      if (!shown) {
        timer = setTimeout(showTooltip, 1500);
      }
    });
    $(this).bind('mouseleave.tooltip', function(e) {
      clearTimeout(timer);
      if (shown) {
        hideTooltip();
      }
    })
  };
  
  $.fn.tooltip.defaultOptions = {
                                    content: null,
                                    contentSelector: 'div.tooltip-content'
                                };
  
  function showTooltip() {
    shown = true;
    var tooltipContent = $(target).find('div.tooltip-content');
    if (tooltipContent.length) {
      options.content = $(tooltipContent.get(0)).html();
    }
    if (content) {
      if (!$('#tooltip').length) {
        // create the tooltip node if one doesn't exist
        var tooltipNode = $('<div id="tooltip"></div>');
        $('body').append(tooltipNode);
      }
      $('#tooltip').html(options.content);
      positionTooltip();
      $('#tooltip').css('display', 'block');
      clearTimeout(timer);
    }
  }
  
  function hideTooltip() {
    if (shown) {
      $('#tooltip').css('display', 'none');
      shown = false;
    }
  }
  
  function positionTooltip() {
    // figure out where to position this thing
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var elWidth = $('#tooltip').width();
    var elHeight = $('#tooltip').height();
    // see if we are reaching the bounds of the screen
    if ((x + elWidth) > docWidth) {
      x = x - elWidth;
    }
    if ((y + elHeight) > docHeight) {
      y = y - elHeight;
    }
    $('#tooltip').css('left', x).css('top', y);
  }
  
})(jQuery);