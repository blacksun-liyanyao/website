/**
 * Created by Administrator on 2016/8/6.
 */
var untilEvent = {
    addEvent:function(element,type,hander){
        if(element.addEventListener){
            element.addEventListener(type,hander,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,hander);
        }else{
            element['on'+type] = hander;
        }
    },
    removeEvent:function(element,type,hander){
        if(element.removeEventListener){
            element.removeEventListener(type,hander,false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type,hander);
        }else{
            element['on'+type] = null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    getRelated:function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    }

};
function getOuter(){
    var outer = document.getElementById('outer');
    untilEvent.addEvent(outer,'mouseover',callBackOver);
    untilEvent.addEvent(outer,'mouseout',callBackOut);
}
function callBackOut(event){
    var event = untilEvent.getEvent(event);
    var relatedTarget = untilEvent.getRelated(event);
    var outerList1 = document.getElementById('outerList1');
    var inter1 = document.getElementById('inter1');
    var outerList2 = document.getElementById('outerList2');
    var inter2 = document.getElementById('inter2');
    var flag1 = false,flag2 = false;
    if(relatedTarget !== null){
        var parented = relatedTarget.parentNode;
        do{
            if(parented === outerList1 || relatedTarget === outerList1){
                flag1 = true;
                break;
            }else if(parented === outerList2 || relatedTarget === outerList2){
                flag2 = true;
                break;
            }else{
                parented = parented.parentNode;
            }
        }while(parented !== null);
    }
    if(!flag1){
        $(inter1).animate({height:'0px'},10);
    }
    if(!flag2){
        $(inter2).animate({height:'0px'},10);
    }
}
function callBackOver(event){
    var totalHeight = 170;
    var event = untilEvent.getEvent(event);
    var target = untilEvent.getTarget(event);
    var inter1 = document.getElementById('inter1');
    var inter2 = document.getElementById('inter2');
    if(target.id == 'outerList1' || target.id == "link1"){
        $(inter1).animate({height:totalHeight + "px"},300);
    }
    if(target.id == 'outerList2' || target.id == 'link2'){
        $(inter2).animate({height:totalHeight + 'px'},300);
    }
}
function future(){
    var info = $("<div>��������</div>");
    info.css({"position":"absolute","display":"none","z-index":"80","color":"#ff4400","font-size":"12px"});
    $('body').append(info);
    $("#future").hover(function(){
        $(this).mousemove(function(event){
            info.css({"display":"block","top":event.clientY+10+"px","left":event.clientX+20+"px"});
        });

    },function(event){
        info.css({"display":"none"}).unbind("mousemove");
    });
}
untilEvent.addEvent(window,'load',future);
untilEvent.addEvent(window,'load',getOuter);