$(function() {

  console.log("Starting up,hi :)");
  createChannel("cima");
  createChannel("mega");
  createChannel("cnn");
  createChannel("test");

  function initChannel(gid,vid) {
    hayCanales = $(".grid").has("div").length;
    cerrar = '<div class="cerrar"><span class="cerrarBtn">+</span></div>';
    $(".grid").append('<div vid="'+vid+'" class="grid-item vid-'+vid+'-'+gid+'">'+cerrar+embed+'</div>');
    $('.grid-item:not("ui-resizable")').resizable({containment: '.grid', handles: "se", create: setContainerResizer, start: lockVideo, stop: unlockVideo}).draggable({containment: '.grid', start: lockVideo, stop: unlockVideo, snap: true, scroll: true});
    $('.grid-item:not("cerrable") .cerrarBtn').on("click", function() { cerrarCanal($(this)); $(this).parent().addClass("cerrable") });
    if(hayCanales) {
      outOfFrame($('.vid-'+vid+'-'+gid));
    }
  }

  function lockVideo(event, ui) {
    $(this).find("iframe").hide();
  }
  function unlockVideo(event, ui) {
    $(this).find("iframe").show();
  }

  function cerrarCanal(ele) {
    classes = ele.parent().parent().attr("class");
    element = classes.split(" ").join(".");
    ele.parent().parent().remove();
  }

  function outOfFrame(ele) {
    console.log("ELE",ele);
    var x = 0;
    var y = 0;
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var pos = {};
    $('.grid-item').each(function() {
      pos = $(this).position();
      console.log("GET POS", ele.attr("vid"), y, x);
      if ((y < pos.top || 0 == pos.top) && pos.top + ($(this).height() * 3) < viewportHeight) {
        y += pos.top+$(this).height();
        console.log("A BIT LOWER", y, x);
      } else {
        if (x < pos.left &&  pos.top + ($(this).height() * 2) < viewportHeight) {
          x += pos.left+$(this).width();
          y = 0;
          console.log("A BIT TO THE RIGHT", y, x);
        }
      }
    });


    console.log(ele.attr("vid"),"FINAL POS",y,x);
    $("[vid="+ele.attr("vid")+"]").animate({ top: y, left: x }, 100);
  }

  function setContainerResizer(event, ui) {
      $($(this)[0]).children('.ui-resizable-handle').mouseover(setContainerSize);
  }

  function setContainerSize(el) {
      var parent = $(el.target).parent().parent();
      parent.css('height', parent.height() + "px");
  }

  $(".addStreamBtn").on("click", function(){
    addChannel();
  });

  function createChannel(vid) {
    gid = Math.floor(Math.random()*100000);
    switch (vid) {
      case "test":
        vid = "n747ktceuwI";
        break;
      case "cnn":
        vid = "y5vvZ5gbF10";
        break;
      case "mega":
        vid = "HChCAZCHhS4";
        break;
      case "cima":
        vid = "-Z6JVbTVXnc";
        break;
      default:
        vid = vid;

    }
    embed = '<iframe src="https://www.youtube-nocookie.com/embed/'+vid+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    initChannel(gid,vid);
  }

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  function addChannel() {
    var url = prompt("Pega la dirección del video que quieres ver.", "https://www.youtube.com/watch?v=rSWPP0zZwsw");
    if (url != null) {
      vid = youtube_parser(url);
      createChannel(vid);
    }
  }

});
