var h = $('body').height();
var stroke = '#FFF';
var fill = '#CC2524';

$(function (){

    var w = window.innerWidth;
    var h = window.innerHeight;
    var bh = $('body').height();

    $('body').append('<svg id="room"></svg>');
    var roomSvg = Snap('#room');

    var room = function (f){
        roomSvg.clear();

        var s = 0.4
        var top = h * (0.2 - 0.9 * f);
        var l = w * (0.33 - s * f);
        var r = w * (0.66 + s* f);
        var b = h * (0.66 - s * f);

        var p = new pathMaker();
        p.add('M',{x:-100*f,y:window.innerHeight})
         .add('L',{x:l, y:b})
         .add('L',{x:r, y:b})
         .add('L',{x:w+100*f, y:h})
         .add('M',{x:l,y:b})
         .add('L',{x:l,y:top})
         .add('L',{x:0,y:-500*f})
         .add('M',{x:l,y:top})
         .add('L',{x:r,y:top})
         .add('L',{x:r,y:b})
         .add('M',{x:r,y:top})
         .add('L',{x:w,y:-500*f});


        var path = roomSvg.path(p.str);

        path.attr({
            stroke:stroke,
            fill:'none'
        });
    }

    $('body').append('<svg id="legs"></svg>');
    var legSvg = Snap('#legs');

    $('body').append('<svg id="table"></svg>');
    var tableSvg = Snap('#table');

    var table = function (f){
        tableSvg.clear();
        legSvg.clear();

        var s = 0.4
        var l = w * (0.4 - s * f);
        var l2 = w * (0.37 - s * f);

        var r = w * (0.59 + s * f);
        var r2 = w * (0.62 + s * f);

        var t = h * (0.58 - s * f);
        var t2 = h * (0.59 + s * f);

        var p = new pathMaker();
        p.add('M',{x:l, y:t})
         .add('L',{x:r, y:t})
         .add('L',{x:r2,y:t2})
         .add('L',{x:l2,y:t2})
         .add('L',{x:l, y:t});

         var lh = h* 0.14 + (250 * f);
         var lw = 6 + (30 * f);
         var offset = 10 + (20 * f);

        var legs = new pathMaker();
        legs.add('M',{x:l, y:t})
            .add('L',{x:l,y:t+lh-40})
            .add('L',{x:l+lw,y:t+lh-40})
            .add('L',{x:l+lw,y:t})

            .add('M',{x:l2+offset,y:t2})
            .add('L',{x:l2+offset,y:t2+lh})
            .add('L',{x:l2+(offset+lw),y:t2+lh})
            .add('L',{x:l2+(offset+lw),y:t2})

            .add('M',{x:r,y:t})
            .add('L',{x:r,y:t+lh-40})
            .add('L',{x:r-lw,y:t+lh-40})
            .add('L',{x:r-lw,y:t})

            .add('M',{x:r2-offset,y:t2})
            .add('L',{x:r2-offset,y:t2+lh})
            .add('L',{x:r2-(offset+lw),y:t2+lh})
            .add('L',{x:r2-(offset+lw),y:t2})

        var path = tableSvg.path(p.str);
        path.attr({
            stroke:stroke,
            fill:fill
        });

        var path2 = legSvg.path(legs.str);
        path2.attr({
            stroke:stroke,
            fill:fill
        });
    }


    var tbl = $('#table-fare');
    var factor = function (){
        var t = $('body').scrollTop();

        var f = Ease.easeInOutQuad(t/bh);
        room(f);
        table(f);

        var sf = 0.8;
        var rf = 1 - f;

        tbl.css('transform','scale('+(1 - sf * rf)+','+(1 - sf * rf)+') translateY('+(50*rf)+'px) rotateX('+(85*rf)+'deg)');

        // conditional hiding
        // if(t+window.innerHeight >= bh)
        //     bin.addClass('visible');
        // else
        //     bin.removeClass('visible');
    }

    factor();
    $(document).on('scroll', factor);
});