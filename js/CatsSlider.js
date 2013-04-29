$.fn.WOWClipAnimation=function(target,left,top,radius,delay,id,style,animationName,width,height)
		{
			var That=$(this);
			var borderRadius=radius;
			if(!style)
			{
				borderRadius=0;
			}
			var clip="";
			if(animationName=='row'||animationName=='column')
			{
				if(animationName=='row')
				{
				clip=$('<div style="overflow:hidden;width:'+width+'px;height:0px;position:absolute;border-radius:0px;left:0px;top:'+top+'px;" id="WOWClip'+id+'"></div>');
				clip.append(That.clone().css({'margin-top':((top*-1))+'px','display':'block'}));	
				}
				else if(animationName=='column')
				{
				clip=$('<div style="overflow:hidden;width:0px;height:'+height+'px;position:absolute;border-radius:0px;left:'+left+'px;top:0px;" id="WOWClip'+id+'"></div>');
				clip.append(That.clone().css({'margin-left':((left*-1))+'px','display':'block'}));					
				}
			}
			else if(animationName=='vclose')
			{
				clip=$('<div style="overflow:hidden;width:'+width+'px;height:0px;position:absolute;border-radius:0px;left:0px;top:'+(id*height)+'px;" id="WOWClip'+id+'"></div>');				
				if(id==0)
				{
				clip.append(That.clone().css({'margin-left':'0px','margin-top':(parseInt(height/2)*-1)+'px','display':'block'}));				
				}
				else
				{
				clip.append(That.clone().css({'margin-left':'0px','margin-top':(id*parseInt(height/2)*-1)+'px','display':'block'}));						
				}
			}
			else if(animationName=='hclose')
			{
				clip=$('<div style="overflow:hidden;width:0px;height:'+height+'px;position:absolute;border-radius:0px;left:'+(id*width)+'px;top:0px;" id="WOWClip'+id+'"></div>');				
				if(id==0)
				{
				clip.append(That.clone().css({'margin-left':(parseInt(width/2)*-1)+'px','margin-top':'0px','display':'block'}));				
				}
				else
				{
				clip.append(That.clone().css({'margin-left':(parseInt(height/2)*-1)+'px','margin-top':'0px','display':'block'}));						
				}
			}			
			else
			{
				clip=$('<div style="overflow:hidden;width:0px;height:0px;position:absolute;border-radius:0px;left:'+left+'px;top:'+top+'px;" id="WOWClip'+id+'"></div>');				
				clip.append(That.clone().css({'margin-left':((left*-1))+'px','margin-top':((top*-1))+'px','display':'block'}));	
			}			
			
			$("#WOWClips",target).append(clip);
			clip=$("#WOWClip"+id,target);
			//alert(clip.html());
			
			if(animationName=='row'||animationName=='column')
			{
				if(animationName=='row')
				{
				clip.animate({'width':(width)+"px",'height':(height)+'px','top':(top-parseInt(height/2))+'px','border-radius':(borderRadius)+'px'},delay,function(){});	
				$('img',clip).animate({'margin-top':((top*-1)+(parseInt(height/2)))+'px',},delay,function(){});			
				}
				else if(animationName=='column')
				{
				clip.animate({'width':(width)+"px",'height':(height)+'px','left':(left-parseInt(width/2))+'px','border-radius':(borderRadius)+'px'},delay,function(){});	
				$('img',clip).animate({'margin-left':((left*-1)+(parseInt(width/2)))+'px',},delay,function(){});						
				}
			}
			else if(animationName=='vclose')
			{
				clip.animate({'height':(parseInt(height/2))+'px','top':(id*parseInt(height/2))+'px'},delay,function(){});	
				$('img',clip).animate({'margin-top':(((top*-1)+(id*parseInt(height/2)))*-1)+'px'},delay,function(){});				
			}
			else if(animationName=='hclose')
			{
				clip.animate({'width':(parseInt(width/2))+'px','left':(id*parseInt(width/2))+'px'},delay,function(){});	
				$('img',clip).animate({'margin-left':(((left*-1)+(id*parseInt(width/2)))*-1)+'px'},delay,function(){});				
			}			
			else
			{
				clip.animate({'width':(radius*2)+"px",'height':(radius*2)+'px','left':(left-radius)+'px','top':(top-radius)+'px','border-radius':(borderRadius)+'px'},delay,function(){});					
				$('img',clip).animate({'margin-top':((top*-1)+(radius))+'px','margin-left':((left*-1)+(radius))+'px'},delay,function(){});
			}
		

		}
$.fn.CatsSlider=function(custom)
{
		var defaults = {
			width:800,
			height:480,
			delay:2000,
			animationDelay:1500,
			next:"#next",
			prev:"#prev",
			current:1,
			onChange:function(index){},
			onhover:'pause',
			autoSlide:true,
			navigate:{enable:true,enableColor:"white",disableColor:"gray",borderColor:'#aaaaaa'},
			loader:{enable:true,color:"black"},
			animationStyle:['circle','rectangular','row','column','vclose','hclose']
		};
		$(this).css({'-moz-user-select': 'none','-webkit-user-select': 'none'});
		$(this).attr('onselectstart','return false;');
		var settings = $.extend({}, defaults, custom);	
		var current=settings.current;
		var images=$('img',this);
		var total=images.length;
		var slide=true;
		var That=this;
		var slideContent=$('<div id="WOWSlideContent"><div id="WOWSlideInner"></div></div>');
		var slideImage=$('<div class="WOWThreeSlide" style="display:table-cell;"></div>');
		$("#WOWSlideInner",slideContent).append(slideImage.clone()).append(slideImage.clone()).append(slideImage);
		slideContent.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'})		
		That.append(slideContent);
		slideContent=$("#WOWSlideContent",That);
		slideInner=$("#WOWSlideInner",That);
		slideInner.css('width','10000px');
		var Clips=$('<div id="WOWClips"></div>');
		var text=$('<div id="WOWtext"></div>');
		Clips.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'})
		text.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'})
		That.append(Clips.clone());
		That.append(text.clone());
		Clips=$("#WOWClips",That);
		text=$("#WOWtext",That);
		text.css('cursor','move');
		That.css('overflow','hidden');
		var navigate=$('.WOWItem',That);
		var loader=$('<div id="WOWLoader"><div id="WOWInner"></div></div>');
		$(settings.play+' , '+settings.pause).hide();
		var play=true;
		if(!settings.autoSlide)
		{
			settings.loader=false;
		}
		var count=parseInt(settings.animationDelay/100);
		var timer=null;
			var imageItem="<img src='' id='WOWthumb' style='position:absolute;width:"+(parseInt(settings.width/5))+"px;height:"+(parseInt(settings.height/5))+"px;top:"+(That.offset().top+That.height()-parseInt(settings.height/5)-7)+"px;display:none;'/>";			
			That.append(imageItem);		
		//function defination
		function setupPos()
		{
			Clips.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'});
			text.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'});			
			slideContent.css({'width':settings.width+'px','height':settings.height+'px','left':That.offset().left+'px','top':That.offset().top+'px','position':'absolute','overflow':'hidden'});
			$(settings.prev,That).css({'position':'absolute','top':(That.offset().top+parseInt((settings.height-$(settings.prev).width())/2))+'px','left':(That.offset().left-18-$(settings.prev).width())+'px'});
			$(settings.next,That).css({'position':'absolute','top':(That.offset().top+parseInt((settings.height-$(settings.prev).width())/2))+'px','left':(That.offset().left+settings.width+8)+'px'});	
			$(settings.play,That).css({'z-index':'40','position':'absolute','top':(That.offset().top)+'px','left':(That.offset().left+settings.width-$(settings.play).width()-10)+'px'});	
			$(settings.pause,That).css({'z-index':'40','position':'absolute','top':(That.offset().top)+'px','left':(That.offset().left+settings.width-$(settings.pause).width()-10)+'px'});	
		}
		function prepare()
		{
			images.hide();
			images.css({'width':settings.width+'px','height':settings.height+'px'});
			images.eq(current-1).show();
			navigate.css('background-color',settings.navigate.disableColor);
			navigate.eq(current-1).addClass('current');
			navigate.eq(current-1).css('background-color',settings.navigate.enableColor);
			$(settings.prev+" , "+settings.next+" , "+settings.play+" , "+settings.pause).html("");
			images.each(function(){
				$("#"+$(this).attr('data-text-id')).css('display','none');
			});
			function next()
			{
					current++;
					if(current>total)
					{
						current=1;
					}
					count=1;
					$('#WOWInner',loader).hide();
					slideTo(current);				
			}
			function prev()
			{
					current--;
					if(current<1)
					{
						current=total;
					}
					count=1;
					$('#WOWInner',loader).hide();
					slideTo(current);				
			}
			function doKeyDown(evt)
			{
				switch (evt.keyCode) {
					case 37:  /* Left arrow was pressed */
					prev();
					break;
					case 39:  /* Right arrow was pressed */
					next();
					break;				
				}
			}
			$(settings.prev,That).click(prev);
			$(settings.next,That).click(next);
			window.addEventListener('keydown',doKeyDown,true);				
		}
		function dataTextAnimate(obj)
		{
			var animationobjs=$(obj).attr('animation-style').replace(/\s/gm,"").split(',');
			var textdatal=$('.wowtextdata').length;
			var aniobj=$(obj).clone(true).css({'position':'absolute'}).addClass('wowtextdata').attr('data-id',textdatal);
			$("#WOWtext",That).append(aniobj);
			aniobj=$("[data-id="+textdatal+"]",That).css('z-index','0');			
			for(var y=0;y<animationobjs.length;y++)
			{
				animationobjs[y]=animationobjs[y].replace(/[{}]/gm,"").split(';');
				jobj={};
				for(var k=0;k<animationobjs[y].length;k++)
				{
					animationobjs[y][k]=animationobjs[y][k].split(':');
					jobj[animationobjs[y][k][0]]=animationobjs[y][k][1];
				}				
				if(parseInt(jobj.delay)==0)
				{
				$(aniobj).css(jobj);
				}
				else
				{
				$(aniobj).animate(jobj,parseInt(jobj.delay),function(){});	
				}
			}
		}
		function dataText(obj)
		{
			var aniobj=$("#"+obj.attr('data-text-id')+" [animation-style]");
			aniobj.each(function(){
				dataTextAnimate(this)
			});
		}
		function slideTo(index)
		{	
			var randomN=Math.floor((Math.random()*settings.animationStyle.length+1))-1;
			var borderRadiusStyle=true;
			if(settings.animationStyle[randomN]=='rectangular')
			{
				borderRadiusStyle=false;
			}
			$('#WOWClips',That).html("");	
			var radius=parseInt(settings.width/7);
			var gridX=8;
			var gridY=parseInt(settings.height/radius)+1;
			var ind=index;
			//alert(settings.delay+settings.animationDelay);
			console.log(index);
			if(settings.animationStyle[randomN]=='rectangular'||settings.animationStyle[randomN]=='circle')
			{
			for(var i=0;i<gridX;i++)
			{
				for(var j=0;j<gridY;j++)
				{
					images.eq(index-1).WOWClipAnimation($(That),(((i)*radius)),(((j)*radius)),radius,settings.animationDelay,(i*gridY)+j,borderRadiusStyle,settings.animationStyle[randomN]);			
				}
			}
			}	
			else if(settings.animationStyle[randomN]=='row'||settings.animationStyle[randomN]=='column')
			{
				var cellWidth=settings.width;
				var cellHeight=settings.height;
				var cellLeft=0;
				var cellTop=0;
				if(settings.animationStyle[randomN]=='row')
				{
				cellHeight=parseInt(settings.height/8)+1;
				}
				else
				{
				cellWidth=parseInt(settings.width/8)+1;	
				}
				for(var r=0;r<8;r++)
				{
					if(settings.animationStyle[randomN]=='row')
					{
					cellTop=((r*cellHeight)+parseInt(cellHeight/2));
					}
					else
					{
					cellLeft=((r*cellWidth)+parseInt(cellWidth/2));	
					}					
					images.eq(index-1).WOWClipAnimation($(That),cellLeft,cellTop,radius,settings.animationDelay,r,false,settings.animationStyle[randomN],cellWidth,cellHeight);
				}
			}
			else if(settings.animationStyle[randomN]=='vclose'||settings.animationStyle[randomN]=='hclose')
			{					
				images.eq(index-1).WOWClipAnimation($(That),0,0,radius,settings.animationDelay,0,false,settings.animationStyle[randomN],settings.width,settings.height);
				images.eq(index-1).WOWClipAnimation($(That),0,0,radius,settings.animationDelay,1,false,settings.animationStyle[randomN],settings.width,settings.height);
			}
			$('.wowtextdata',That).remove();
			window.clearTimeout(timer);
			timer=setTimeout(function(){
				images.css('display','none');
				images.eq(current-1).css('display','block');
				$('.wowtextdata',That).remove();
				dataText(images.eq(current-1));
				$('#WOWClips',That).html("");
				if(settings.loader.enable)
				StartLoader();
			},settings.animationDelay);					
			settings.onChange(index);
			if(settings.navigate.enable)
			{
			$(navigate).removeClass('current');
			navigate.eq(current-1).addClass('current');
			navigate.not('.WOWHover').css('background-color',settings.navigate.disableColor);
			navigate.eq(current-1).css('background-color',settings.navigate.enableColor);
			}			
		}
		function autoSlide()
		{
			setInterval(function(){
				if(slide)
				{
					if((count*100)>(settings.delay+settings.animationDelay))
					{					
					current++;
					if(current>total)
					{
						current=1;
					}
					slideTo(current);
					count=1;
					}
					count++;
				}
			},100);
		}	
		function setNavigator()
		{
			var nav=$("<div id='WOWNavigate' style='position:absolute;'><div id='WOWNavigate2' style='position:absolute;width:"+(settings.width+100)+"px'></div></div>");
			nav.css({'font-size':'0px','width':settings.width+'px','height':'12px','overflow':'hidden'});
			var itemWidth=parseInt(settings.width/total)-1;
			var extra=(settings.width%total)+1;
			for(var h=0;h<total;h++)
			{
				var bstr="";
				if(h!=(total-1))
				{
					bstr="border-right:1px solid"+settings.navigate.borderColor+";";
				}
				var thisWidth=itemWidth;
				if(h<extra)
				{
					thisWidth++;
				}
				$("#WOWNavigate2",nav).append('<div class="WOWItem" num="'+h+'" style="'+bstr+'width:'+thisWidth+'px;display:inline-block;height:12px;background-color:'+settings.navigate.disableColor+'"></div>')
			}
			//$('.WOWItem',That).css('display','table-cell');
			That.append(nav);
			navigate=$('.WOWItem',That);
			navigate.mouseenter(function(){
				$(this).addClass('WOWHover');
				$(this).css('background-color',settings.navigate.enableColor);
				$("#WOWthumb").attr('src',images.eq(parseInt($(this).attr('num'))).attr('src'));
				var left=($(this).offset().left+(($(this).width()-$("#WOWthumb").width())/2));
				if(left<$(That).offset().left)
				{
					left=$(That).offset().left;
				}
				if(left>($(That).offset().left+settings.width-$("#WOWthumb").width()))
				{
					left=($(That).offset().left+settings.width-$("#WOWthumb").width());
				}
				$("#WOWthumb").css('left',left+'px');
				$("#WOWthumb").show();
			});
			navigate.mouseleave(function(){
				$(this).removeClass('WOWHover');
				if(!$(this).hasClass('current'))
				{
				$(this).css('background-color',settings.navigate.disableColor);				
				}
				$("#WOWthumb").hide();
			});
			navigate.click(function(){
				$('#WOWInner',loader).hide();
				slideTo(parseInt($(this).attr('num'))+1);
				current=parseInt($(this).attr('num'))+1;
				$(navigate).removeClass('current');
				navigate.eq(current-1).addClass('current');
				navigate.not('.WOWHover').css('background-color',settings.navigate.disableColor);
				navigate.eq(current-1).css('background-color',settings.navigate.enableColor);	
				count=1;			
			});
		}
		function StartLoader()
		{
			$('#WOWInner',loader).stop(true,true);
			$('#WOWInner',loader).css({'width':'0px','height':'4px','background-color':settings.loader.color});
			$('#WOWInner',loader).show();
			$('#WOWInner',loader).animate({'width':(settings.width)+'px'},settings.delay,function(){
				$('#WOWInner',loader).hide();
			});	
		}
		function setupLoader()
		{
			loader.css({'position':'absolute','width':settings.width+'px','height':'4px','top':(That.offset().top)+'px'});
			That.append(loader);

		}
		function slideTwoImage(left1,top1,left2,top2,ob1,ob2)
		{
			
		}
		function mouseDrag()
		{
			var prevX=0;
			var mouseSlide=false;
			
			function start(e)
			{
				if($('#WOWClips',That).html()!="")
				{
					current=((current-2)<0?(total-1):(current-2))+1;
				}
				$('#WOWClips',That).html("");
				count=1;
				$('#WOWInner',loader).hide();
				$('.wowtextdata',That).remove();
				mouseSlide=true;
				window.clearTimeout(timer);
				slide=false;
				//slideContent.css('left':)
				slideInner.css('margin-left',(settings.width*-1)+'px');
				$('.WOWThreeSlide',That).eq(0).html(images.eq((current-2)<0?(total-1):(current-2)).clone().show());
				$('.WOWThreeSlide',That).eq(1).html(images.eq(current-1).clone().show());
				$('.WOWThreeSlide',That).eq(2).html(images.eq((current>=total)?0:current).clone().show());
				prevX=e.pageX;				
			}
			function end(e)
			{
				if(mouseSlide)
				{
					function afterAnimate()
					{
					if(settings.navigate.enable)
						{
						$(navigate).removeClass('current');
						navigate.eq(current-1).addClass('current');
						navigate.not('.WOWHover').css('background-color',settings.navigate.disableColor);
						navigate.eq(current-1).css('background-color',settings.navigate.enableColor);
						}						
						$('.WOWThreeSlide',That).html("");
						count=1;
						StartLoader();
						images.hide();
						images.eq(current-1).show();
						dataText(images.eq(current-1));
						slide=true;
						mouseSlide=false;						
					}
				var left=parseInt(slideInner.css('margin-left'));
				var base=settings.width*-1;
				var mid=parseInt(settings.width/2);
				if((left>(base-mid)&&left<=base)||(left<(base+mid)&&left>=base))
				{
				slideInner.animate({'margin-left':(settings.width*-1)+'px'},500,function(){
						afterAnimate();
				});	
				}
				else if(left<=(base-mid))
				{
					current=((current>=total)?0:current)+1;
					slideInner.animate({'margin-left':(base+base)+'px'},500,function(){
							afterAnimate();
					});						
				}
				else if(left>=(base+mid))
				{
					current=((current-2)<0?(total-1):(current-2))+1;
					slideInner.animate({'margin-left':(base-base)+'px'},500,function(){
							afterAnimate();
					});					
				}

				}				
			}
			function move(e)
			{
				if(mouseSlide)
				{	
					var dif=e.pageX-prevX;
					var slideChange=false;
					var left=parseInt(slideInner.css('margin-left'))+dif;
					if(left<(settings.width*-1*2))
					{
						left+=settings.width;
						current=((current>=total)?0:current)+1;
						slideChange=true;	
					}
					if(left>0)
					{
						left-=settings.width;
						current=((current-2)<0?(total-1):(current-2))+1;
						slideChange=true;							
					}
					if(slideChange)
					{	
					if(settings.navigate.enable)
						{
						$(navigate).removeClass('current');
						navigate.eq(current-1).addClass('current');
						navigate.not('.WOWHover').css('background-color',settings.navigate.disableColor);
						navigate.eq(current-1).css('background-color',settings.navigate.enableColor);
						}	
					$('.WOWThreeSlide',That).eq(0).html(images.eq((current-2)<0?(total-1):(current-2)).clone().show());
					$('.WOWThreeSlide',That).eq(1).html(images.eq(current-1).clone().show());
					$('.WOWThreeSlide',That).eq(2).html(images.eq((current>=total)?0:current).clone().show());					
					}
					slideInner.css('margin-left',(left)+"px");
					prevX=e.pageX;		
				}				
			}
			$('#WOWtext',That).mousedown(function(e){
				start(e);
			});
			$('body').mouseup(function(e){
				end(e)
			});
			$('body').mousemove(function(e){
				move(e);
			});
			var touchid=document.getElementById('WOWtext');
			touchid.addEventListener('touchstart',function(e){
				var touch = e.touches[0];
				//e.preventDefault();
				start(touch);	
			},true);
			document.addEventListener('touchend',function(e){
				var touch = e.touches[0];
				//e.preventDefault();
				end(touch);	
			},true);
			document.addEventListener('touchmove',function(e){
				var touch = e.touches[0];
				//e.preventDefault();
				move(touch);	
			},true);									
		}
		function setupHover()
		{
			if(settings.onhover=='pause')
			{
				var extraCount=0;
				$(That).mouseenter(function(){
					window.clearTimeout(timer);
						images.hide();
						images.eq(current-1).show();					
					var totalCount=parseInt(settings.delay/100);
					var animationCount=parseInt(settings.animationDelay/100);
					extraCount=count-animationCount;
					var extrawidth=0;
					if(extraCount>0)
					{
						extrawidth=parseInt(settings.width/totalCount)*extraCount;
					}
					$('#WOWInner',loader).stop(true,true).css('width',+(extrawidth)+'px').show();
					slide=false;
				});
				$(That).mouseleave(function(){
					slide=true;
					$('#WOWInner',loader).animate({'width':settings.width+'px'},(parseInt((settings.delay+settings.animationDelay))-(count*100)),function(){
						$('#WOWInner',loader).hide();
					})
				});
			}
		}
		//calling function
		if(settings.navigate.enable)
		{
			setNavigator();
		}		
		prepare();
		if(settings.autoSlide)
		{
			autoSlide();
		}
		if(settings.loader.enable)
		{
			setupLoader();
			StartLoader();
		}
		dataText(images.eq(current-1));		
		setupPos();
		$(window).resize(setupPos);
		setupHover();
		mouseDrag();		
}