var jQuerySideNotePath=$("script:last").attr("src");   // js file path detection
	for( var jQuerySideNoteLoop=jQuerySideNotePath.length-1;jQuerySideNoteLoop>=0;jQuerySideNoteLoop--)
	{
		if(jQuerySideNotePath[jQuerySideNoteLoop]=='/')
		{
			jQuerySideNotePath=jQuerySideNotePath.substr(0,jQuerySideNoteLoop+1);
			break;
		}
	}
function jQuerySideNote(input)
		{
			var defaults={
						target:".target",
						title:".target",
						titleWidth:40,
						titleHeight:120,
						titleAlign:"left",  
						width:200,
						height:200,
						align:"right",
						valign:"middle",
						topMargin:0,
						leftMargin:0,
						
						
						slideFrom:"auto", 
						animate:"horizontal",
						expand:false,
						current:1,
						theme:"red",
						autoSlide:true,
						delay:2000,
						TraverseOption:true,
						TraverseOptionAlign:"bottom",
						TraverseWidth:38,
						contentTitle:false,
						contentTitleAlign:"top",
						contentTitleWidth:38,
						contentTitleStyle:"font-size:19px;line-height:38px;"
						}
		var settings= $.extend({},defaults,input);	
		this.settings=settings;
		
		//set id and selector
		this.uniqueId=$('.jQuerySideNote').length;
			//id and selector name
			this.idName="jQuerySideNote"+this.uniqueId;
			this.targetId=1;
			this.className="jQuerySideNote";
			//jQuery object

			this.jTitle=$(this.settings.title);
			this.jTarget=$(this.settings.target);
			this.attach=$(this.settings.attachIn);
		//this.pos=(settings.current-1)*settings.width;
			// detect slide from
			var set =this.settings;
									if(set.slideFrom=="auto"||set.slideFrom=="")
									{
										if(set.align=="left"||set.align=="right")
										{
											set.slideFrom=set.align;
										}
										if((set.valign=="top"||set.valign=="bottom"))
										{
											if(set.align=="center")
											{
											set.slideFrom=set.valign;
											}
											else if(set.align=="left"&&set.leftMargin>0)
											{
											set.slideFrom=set.valign;	
											}
											else if(set.align=="right"&&set.leftMargin<0)
											{
											set.slideFrom=set.valign;	
											}
										}
										if(set.attachStyle=="outer")
										{
										var align={"left":"right","right":"left","top":"bottom","bottom":"top"}
										set.slideFrom=align[set.slideFrom];
										}
									}
						this.width=this.contentWidth=set.width;
						this.height=this.contentHeight=set.height;
						this.current=set.current;
						//slide From
						if(set.slideFrom=='left'||set.slideFrom=='right')
						{
							var temp=set.titleWidth;
							set.titleWidth=set.titleHeight;
							set.titleHeight=temp;
							set.width+=set.titleHeight;	
							//set.width+=set.titleWidth;
						}
						else
						{
							set.height+=set.titleHeight;	
						}
						// Traverse 
						if(set.TraverseOption){
							if(set.TraverseOptionAlign=="left"||set.TraverseOptionAlign=="right")
							{
								set.width+=set.TraverseWidth;
							}
							else
							{
								set.height+=set.TraverseWidth;
							}
						}
						//content Title
						if(set.contentTitle){
							if(set.contentTitleAlign=="left"||set.contentTitleAlign=="right")
							{
								set.width+=set.contentTitleWidth;
								this.contentWidth+=set.contentTitleWidth;
							}
							else
							{
								set.height+=set.contentTitleWidth;
								this.contentHeight+=set.contentTitleWidth;
							}
						}						
											
		
		this.settings=set;
		
		// draw note
		this.drawNote();
		var That=this;



							
		}
jQuerySideNote.prototype.rotate=function(obj,angle)
								{
											function ierotation(oObj, deg)
											{ 
											var deg2radians = Math.PI * 2 / 360;
											rad = deg * deg2radians ;
									    	costheta = Math.cos(rad);
									    	sintheta = Math.sin(rad);
											$(oObj).css({'filter': "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+", M12="+(-sintheta)+", M21="+sintheta+", M22="+costheta+", SizingMethod='auto expand')"}); 
									  
									 		$(oObj).css({'-ms-filter': "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+", M12="+(-sintheta)+", M21="+sintheta+", M22="+costheta+", SizingMethod='auto expand')"});
											}
											
											
									        $(obj).css( {'transform': 'rotate(' + angle + 'deg)' ,
									        			  '-moz-transform': 'rotate(' + angle + 'deg)',
									        			  '-webkit-transform': 'rotate(' + angle + 'deg)',
									        			  '-o-transform': 'rotate(' + angle + 'deg)',
									        			  '-ms-transform':'rotate('+angle+'deg)'  			  
									        } );
									      
									        ierotation(obj,angle);
									        $(obj).attr("angle",angle);											        	        									
								}	
															
jQuerySideNote.prototype.addTitle=function()
								{
									var set=this.settings;
									this.jId.append("<div class='noteTitle' style='overflow:hidden'></div>");
									
									$(".noteTitle",this.jId).append(this.jTitle.clone());
									this.jTitle=$(".noteTitle",this.jId);
									this.jTitleContent=$(set.title,this.jId);
									this.title=$(set.title,this.$);
									this.title.addClass("title");
									if(set.slideFrom=='top'||set.slideFrom=='bottom')
									{
										if(set.titleAlign=='right')
										{
											this.jTitle.css("margin-left",(set.width-set.titleWidth)+'px');
										}
										else if(set.titleAlign=='center')
										{
											this.jTitle.css("margin-left",((set.width-set.titleWidth)/2)+'px');	
										}
									}
									else
									{
										if(set.titleAlign=='right')
										{
											this.title.css("margin-top",(set.height-set.titleWidth)+'px');
										}
										else if(set.titleAlign=='center')
										{
											this.title.css("margin-top",((set.height-set.titleWidth)/2)+'px');
											//this.title.css("vertical-align",'middle');	
										}										
									}
									var marginTop=parseInt(this.title.css('margin-top')),marginLeft=parseInt(this.title.css('margin-left'));
									$(this.jTitleContent).css({"width":set.titleWidth,"height":set.titleHeight});
									this.rotate(this.jTitleContent,set.titleRotate);
									$(this.jTitleContent).css({"margin-left":(marginLeft+set.titleWidth/2*(-1)+(set.titleHeight/2))+"px","margin-top":(marginTop+set.titleWidth/2-(set.titleHeight/2))+"px"});
								}
jQuerySideNote.prototype.addContent=function()
								{
									var set=this.settings;
									this.jId.append("<div id='workspace'></div>");
									this.jWorkspace=$("#workspace",this.jId);
									this.jWorkspace.css("display","none");
									this.jId.append("<div id='sideNodeContent'><div id='wrapper'></div></div>");
									this.jContent=$("#sideNodeContent",this.jId);
									this.jWrapper=$('#wrapper',this.jContent);
									if((set.TraverseOptionAlign=='left'||set.TraverseOptionAlign=='top')&&set.TraverseOption)
									{
										this.setTraverse();	
										this.setContainer();										
									}
									else if((set.TraverseOptionAlign=='bottom'||set.TraverseOptionAlign=='right')&&set.TraverseOption)
									{
										this.setContainer();
										this.setTraverse();																				
									}
									else
									{
										this.setContainer();										
									}
									
									// set traverse and content width height;
									if(set.TraverseOption)
									{
										if(set.TraverseOptionAlign=='right'||set.TraverseOptionAlign=='left')
										{
											this.jContainer.css({"vertical-align":"top","overflow":"hidden","display":"table-cell","width":this.contentWidth,"height":this.contentHeight,"max-width":this.contentWidth,"max-height":this.contentHeight});
											this.jTraverse.css({"vertical-align":"top","overflow":"hidden","display":"table-cell","width":set.TraverseWidth,"height":this.contentHeight,"max-width":set.TraverseWidth,"max-height":this.contentHeight});
											$("#inner",this.jTraverse).css({"width":this.contentHeight,"height":set.TraverseWidth});
											$(".prev,.option,.next",this.jTraverse).css({"display":"table-cell","vertical-align":"top"});
										$(".prev,.next",this.jTraverse).css({"width":(set.TraverseWidth)+"px","height":set.TraverseWidth+"px"});
											$(".option",this.jTraverse).css({"height":set.TraverseWidth+"px","width":(parseInt(this.jTraverse.height())-(set.TraverseWidth*2))+"px"});
											this.rotate($("#inner",this.jTraverse),90);
											$("#inner",this.jTraverse).css({"margin-left":(this.contentHeight/2*(-1)+(set.TraverseWidth/2))+"px","margin-top":(this.contentHeight/2-(set.TraverseWidth/2))+"px"});
											//this.jTargetContentTitleIn.css({"margin-left":(this.height/2*(-1)+(set.contentTitleWidth/2))+"px","margin-top":(this.height/2-(set.contentTitleWidth/2))+"px"});
										}
										else
										{
											this.jContainer.css({"vertical-align":"top","display":"block","width":this.contentWidth,"height":this.contentHeight});
											this.jTraverse.css({"vertical-align":"top","display":"block","width":this.contentWidth,"height":set.TraverseWidth});
																					$(".prev,.option,.next",this.jTraverse).css({"display":"table-cell","vertical-align":"top"});
										$(".prev,.next",this.jTraverse).css({"width":(set.TraverseWidth)+"px","height":set.TraverseWidth+"px"});
											$(".option",this.jTraverse).css({"width":(parseInt(this.jTraverse.width())-(set.TraverseWidth*2))+"px","height":set.TraverseWidth});										
										}

										//alert(this.jTraverse.width());
										
									}
									else
									{
										this.jContainer.css({"overflow":"hidden","width":this.contentWidth,"height":this.contentHeight,"max-width":this.contentWidth,"max-height":this.contentHeight});
									}
									

									var That=this;

									
									
								}
jQuerySideNote.prototype.setTraverse=function()
								{
									var That=this;
									var set=this.settings;
									this.jWrapper.append("<div id='traverse' style='overflow:hidden;'><div id='inner'><div class='prev'></div><div class='option'></div><div class='next'></div></div></div>");
									this.jTraverse=$("#traverse",this.jWrapper);
									$(".prev,.next",this.jTraverse).click(function(){
										if($(this).hasClass(".prev"))That.prev();
										else That.next();
									});	

								}
jQuerySideNote.prototype.next=function()
								{
									this.current++;
									if(this.current>this.total)this.current=1;
									this.slideTo(this.current);
								}
jQuerySideNote.prototype.prev=function()
								{
									this.current--;
									if(this.current<1)this.current=this.total;
									this.slideTo(this.current);
								}
jQuerySideNote.prototype.titleFunc=function()
								{
									var That=this;
									$(".noteTitle",this.jId).click(function(){
										if(That.settings.expand)
										{
											That.minimize();	
										}
										else{
											That.expand();
										}										
									});

								}	
jQuerySideNote.prototype.expand=function()
								{
									var set=this.settings;
									var That=this;
									var timeDelay=600;
									if(this.settings.slideFrom=='left'||this.settings.slideFrom=='right')
									{
										if(set.slideFrom=='right')
										{
											//var margin=parseInt(this.jId.css("margin-left"));
											this.jId.animate({marginLeft:set.leftMargin+"px"},timeDelay,function(){});
										}
										
										this.jContent.animate({width:(set.width-set.titleHeight)+"px",maxWidth:(set.width-set.titleHeight)+"px"},timeDelay,function(){
											//if(set.scroll)That.setScroll(That.page.eq(That.current-1));
										});//css("width",+"0px");
									}
									else
									{
										if(set.slideFrom=='bottom')
										{
											this.jId.animate({marginTop:set.topMargin+"px"},timeDelay,function(){});
										}										
										this.jContent.animate({height:(set.height-set.titleHeight)+"px"},timeDelay,function(){
											//if(set.scroll)That.setScroll(That.page.eq(That.current-1));
										});
									}
									this.settings.expand=true;
									
									this.page.eq(this.current-1).addClass("current");	
								}
jQuerySideNote.prototype.minimize=function(nodelay)
								{
									var css={};
									var set=this.settings;
									var timeDelay=600;
									if(nodelay)timeDelay=20;
									if(set.slideFrom=='left'||set.slideFrom=='right')
									{
										css={width:0+"px",maxWidth:0+"px"};
										if(set.slideFrom=='right')
										{
											var margin=parseInt(this.jId.css("margin-left"));
											this.jId.animate({marginLeft:(margin+(set.width-set.titleHeight))+"px"},timeDelay,function(){});
										}
										this.jContent.animate(css,timeDelay,function(){});//css("width",+"0px");
									}
									else
									{
										css={height:0+"px"};
										if(set.slideFrom=='bottom')
										{
											var margin=parseInt(this.jId.css("margin-top"));
											this.jId.animate({marginTop:(margin+(set.height-set.titleHeight))+"px"},timeDelay,function(){});
										}
										this.jContent.animate(css,timeDelay,function(){});
									}
									this.settings.expand=false;
									if($(".current",this.page.parent()).length>0)
										{
											if($(".current .scroll",this.page.parent()).length>0)
											{
										//	$(".current",this.page.parent()).html($(".current .scrollParent",this.page.parent()).html());
											}
										
										$(".current",this.page.parent()).removeClass('current');
										}	
																		
									
									
									
								}
jQuerySideNote.prototype.slideTo=function(page)
								{
									var set=this.settings;
									var That=this;
									if(set.animate=='horizontal')
									{
										this.slide({marginLeft:(((page-1)*this.width)*-1)+"px"},page);
									}
									else if(set.animate=='vertical')
									{
										this.slide({marginTop:(((page-1)*this.height)*-1)+"px"},page);
									}
									else
									{
										
										$(".current",this.page.parent()).fadeOut(300,function(){
											if($(".current",That.page.parent()).length>0)
											{
												if($(".current .scroll",That.page.parent()).length>0)
												{
											//	$(".current",That.page.parent()).html($(".current .scrollParent",That.page.parent()).html());
												}
											
											$(this).css("display","none");
											$(this).removeClass('current');
											}	
											//alert(That.page.eq(page-1).html());										
											That.page.eq(page-1).fadeIn(300,function(){
												//if(set.scroll)That.setScroll(That.page.eq(page-1));
												That.page.css("display","none");
												That.page.eq(page-1).css("display","block");
												That.page.eq(page-1).addClass("current");													
											});
											
											});
									}								
									$("#contentTitle #inner",That.jId).html($(set.target,That.page).eq(page-1).attr('title'));													
								}
jQuerySideNote.prototype.slide=function(css,page)
								{
									var That=this;
									var set=this.settings;
										if($(".current",That.page.parent()).length>0)
										{
											if($(".current .scroll",That.page.parent()).length>0)
											{
											//$(".current",That.page.parent()).html($(".current .scrollParent",That.page.parent()).html());
											}
										
										$(".current",That.page.parent()).removeClass('current');
										}	
									$(this.innerContent).animate(css,600,function(){
										//if(set.scroll)That.setScroll(That.page.eq(page-1));
										//$(".scroll",That.page.eq(That.current-1)).css("display","none");
										That.page.eq(page-1).addClass("current");										
									});
									
								}	
jQuerySideNote.prototype.setContainer=function()
								{
									
									var That=this;
									var set=this.settings;
									That.jWrapper.append("<div id='container' style='overflow:hidden;'></div>");
									That.jContainer=$("#container",That.jWrapper);
									if((set.contentTitleAlign=='left'||set.contentTitleAlign=='top')&&set.contentTitle)
									{
										this.addTargetContentTitle();	
										this.addTargetContent();										
									}
									else if((set.contentTitleAlign=='bottom'||set.contentTitleAlign=='right')&&set.contentTitle)
									{
										this.addTargetContent();
										this.addTargetContentTitle();																				
									}
									else
									{
										this.addTargetContent();										
									}									
									// set traverse and content width height;
									var cssProperty;
									if(set.contentTitle)
									{
										if(set.contentTitleAlign=='right'||set.contentTitleAlign=='left')
										{
											cssProperty={"vertical-align":"top","overflow":"hidden","display":"table-cell","width":this.contentWidth-set.contentTitleWidth,"height":this.height,"max-width":this.contentWidth-set.contentTitleWidth,"max-height":this.height};
											this.jTargetContent.css(cssProperty);
											this.page.css(cssProperty);
											
											this.jTargetContentTitle.css({"vertical-align":"top","overflow":"hidden","display":"table-cell","width":set.contentTitleWidth,"height":set.height,"max-width":set.contentTitleWidth,"max-height":set.height});
											this.jTargetContentTitleIn.css({"width":this.height+"px","height":set.contentTitleWidth+"px"});		
											//alert(this.height);
											this.rotate(this.jTargetContentTitleIn,90);
											this.jTargetContentTitleIn.css({"margin-left":(this.height/2*(-1)+(set.contentTitleWidth/2))+"px","margin-top":(this.height/2-(set.contentTitleWidth/2))+"px"});//"margin-top",parseInt(this.jTargetContentTitleIn.width())+"px");										
										}
										else
										{
											cssProperty={"vertical-align":"top","display":"block","width":this.width,"height":this.contentHeight-set.contentTitleWidth,"max-width":this.width,"max-height":this.contentHeight-set.contentTitleWidth};
											this.jTargetContent.css(cssProperty);
											this.page.css(cssProperty);
											this.jTargetContentTitle.css({"vertical-align":"top","display":"block","width":set.Width,"height":set.contentTitleWidth,"max-width":set.Width,"max-height":set.contentTitleWidth});										
										}
									}
									else
									{
										cssProperty={"vertical-align":"top","overflow":"hidden","display":"table-cell","width":this.contentWidth,"height":this.contentHeight,"max-width":this.contentWidth,"max-height":this.contentHeight};	
										this.jTargetContent.css(cssProperty);
										this.page.css(cssProperty);
									}
									That.pageSetup();										
								}
jQuerySideNote.prototype.addTargetContentTitle=function()
								{
									var set=this.settings;
									this.jContainer.append("<div id='contentTitle' style='overflow:hidden;"+this.settings.contentTitleStyle+"'><div id='inner'>muzahid</div></div>");
									this.jTargetContentTitle=$("#contentTitle",this.jContainer);
									this.jTargetContentTitleIn=$("#inner",this.jTargetContentTitle)

								}
jQuerySideNote.prototype.addTargetContent=function()
								{
									var That=this;
									That.jContainer.append("<div id='targetContent' style='overflow:hidden;'></div>");
									That.jTargetContent=$("#targetContent",That.jContainer);
									That.jTargetContent.append("<div id='innerContent'></div>");
									That.innerContent=$("#innerContent",That.jTargetContent);									
									this.jTarget.each(function(){
										That.jWorkspace.append($(this).clone());
										That.innerContent.append("<div class='page' style='overflow:hidden'><div class='pageContent' style=''>"+That.jWorkspace.html()+"</div></div>");
										That.jWorkspace.html("");
									});
									this.total=this.jTarget.length;
									That.page=$(".page",That.innerContent);
									That.pageContent=$(".pageContent",That.innerContent);	
									That.page.eq(this.current-1).addClass('current');
																	
								}	
jQuerySideNote.prototype.pageSetup=function()
								{
									var set=this.settings;
									if(set.animate=='horizontal')
									{
										this.innerContent.css("width",10000+"px");
										this.page.css("display","table-cell");
									}
									else if(set.animate=='vertical')
									{
										this.innerContent.css("height",10000+"px");
										this.page.css("display","block");
									}
									else
									{
										this.page.css("display","none");
										this.page.eq(this.current-1).css("display","block");
										this.page.eq(this.current-1).addClass("current");
									}
								}														
jQuerySideNote.prototype.setPosition=function()
								{
									var view=this.getViewPort();
									var set=this.settings;
									var width=set.width;
									var height=set.height;
									var left=0,top=0;
									var outer=(set.attachStyle=="outer")?true:false;
									if(set.align=='left')
									{
										left=view.left;
										if(outer)
										{
											left=view.left-set.width;
										}
									}
									else if(set.align=='right')
									{
										left=view.left+view.width-set.width;
										if(outer)
										{
											left=view.left+view.width;
										}
									}
									else if(set.align=='center')
									{
										left=view.left+(view.width-set.width)/2;
									}
									
									if(set.valign=='top')
									{
										top=view.top;
										if(outer)
										{
											top=view.top;
										}

									}
									else if(set.valign=='bottom')
									{
										top=view.top+(view.height-height);
										if(outer)
										{
											top=view.top+view.height-set.height;
										}
									}
									else if(set.valign=='middle')
									{
										top=view.top+(view.height-set.height)/2;
										if(outer)
										{
											top=(view.top+(view.height-set.height)/2);
										}
									}
									
									if((set.valign=='bottom'||set.valign=='top')&&outer&&(set.align=='center'||(set.align=='left'&&set.leftMargin>0)||(set.align=='right'&&set.leftMargin<0)))
									{
												top=view.top+view.height;
												if(set.align=='left')
												{
												 	left=view.left;
												}
												else if(set.align=='right')
												{
													left=view.left+view.width-set.height;
												}										
									}
									
									this.jId.css({"left":left+"px","top":top+"px"});
								}
jQuerySideNote.prototype.getViewPort=function()
								{
									var viewPort={};
									var set=this.settings;
									// for default window
									if(set.attachIn=='window'||set.attachIn==''){
									 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
									 if (typeof window.innerWidth != 'undefined') {
									   viewPort.width = window.innerWidth,
									   viewPort.height = window.innerHeight
									 }
									
									// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
									 else if (typeof document.documentElement != 'undefined'
									 && typeof document.documentElement.clientWidth !=
									 'undefined' && document.documentElement.clientWidth != 0) {
									    viewPort.width = document.documentElement.clientWidth,
									    viewPort.height = document.documentElement.clientHeight
									 }
									
									 // older versions of IE
									 else {
									   viewPort.width = document.getElementsByTagName('body')[0].clientWidth,
									   viewPort.height = document.getElementsByTagName('body')[0].clientHeight
									 }
									 viewPort.width=$(window).width();
									 viewPort.height=$(window).height();

									 viewPort.left=0;
									 viewPort.top=0;
									}
									else
									{
									   viewPort.width=this.attach.width();
									   viewPort.height=this.attach.height();
									 //  alert(viewPort.width);
										 if(set.attachStyle=="outer")
									 		{
												 viewPort.width=this.attach.outerWidth();
												 viewPort.height=this.attach.outerHeight();									 	
									 		}		
									 									   
									   viewPort.left=this.attach.offset().left;
									   viewPort.top=this.attach.offset().top;	
									}
									return viewPort;
										
								}																				
jQuerySideNote.prototype.drawNote=function()
								{
									var set=this.settings;  //sort name		
									var That=this;
									$("#jQuerySideNote"+this.uniqueId).remove();
									$("body").append("<div id="+this.idName+"></div>");
									this.jId=$("#jQuerySideNote"+this.uniqueId); // side note id -jquery object 
									this.$=this.jId;
									this.jId.addClass(this.className+" "+set.theme);
									// set note position
									this.setPosition();
									// auto slide from detect
									this.jId.css({"position":set.position});								
									this.jClass=$(".jQuerySideNote");            // side note class -jquery object
									//"width":set.width,"height":set.height,
									this.jId.css({"overflow":"visible","margin-left":set.leftMargin,"margin-top":set.topMargin});
									// define content property respect to slideFrom
									if(set.slideFrom=="right"||set.slideFrom=="bottom")
									{
										this.addTitle();
										this.addContent();
									}
									else
									{
										this.addContent();
										this.addTitle();
									}
									this.jContent.css("vertical-align","top");
									this.jTitle.css("vertical-align","top");
									if(set.slideFrom=="left"||set.slideFrom=="right")
									{
										this.jTitle.css({"display":"table-cell","max-width":set.titleHeight,"width":set.titleHeight,"height":set.titleWidth});
										this.jContent.css({"display":"table-cell","max-width":set.width-set.titleHeight,"width":set.width-set.titleHeight,"height":set.height,"overflow":"hidden"});										
										
									}
									else
									{	
										this.jTitle.css({"width":set.titleWidth,"height":set.titleHeight,"max-height":set.titleHeight});
										this.jContent.css({"width":set.width,"height":set.height-set.titleHeight,"max-height":set.height-set.titleHeight,"overflow":"hidden"});	
									}
									//this.slideTo(this.current);
									this.titleFunc();
									clearInterval(this.interv);
									clearInterval(this.interslide);
									this.noMoveCount=0;
									this.onFocus=false;
									var That=this;
									this.jContent.mouseenter(function(){
										That.onFocus=true;
									});
									this.jContent.mouseleave(
										function(){
										That.onFocus=false;
										}
									);
									var sexpand=this.settings.expand;
									this.minimize(true);
									if(sexpand)
									{
										this.expand();
									}
									if(set.autoSlide)
									{
										this.interslide=setInterval(function(){
										if(!That.onFocus&&That.settings.expand)
											{
											That.next();
											}
										},set.delay+600);
									}
									
				
									/*this.interv=setInterval(function(){
										if(That.noMoveCount==0)
										{
											if($(".scroll",That.page.eq(That.current-1)).css("display")!="none")
											{
											$(".scroll",That.page.eq(That.current-1)).fadeOut("fast");
											}
										}
										else
										{
											if($(".scroll",That.page.eq(That.current-1)).css("display")=="none")
											$(".scroll",That.page.eq(That.current-1)).fadeIn("fast");
											That.noMoveCount--;
										}
									},300);*/
									
									//this.page.each(function(){
										That.setScroll(this.page);
									//});
									//$(".scroll",That.page.eq(That.current-1))
									//this.setScroll()
									this.settings=set;   // store any change from drawNote

								}
jQuerySideNote.prototype.setScroll=function(target)
								{
									var set=this.settings;
									if(!set.scroll)return false;	
									var That=this;
									target=$(target);
									target.each(
										function(){
											$(this).html("<div class='scrollParent'>"+$(this).html()+"</div>");
											$(this).css({"overflow":"hidden"});
											var display=$(this).css("display");
											That.page.css("display","block");
											var sbWidth=parseInt($(this).css("max-width"));
											var sbHeight=parseInt($(this).css("max-height"));									
											$(this).css({"overflow":"auto","width":"auto","height":"auto","display":"table-cell"});
											var width=$(That.settings.target,this).width();										
											var height=$(this).height();	
											$(this).css({"overflow":"hidden","width":sbWidth+"px","height":sbHeight+"px","display":display});
											That.page.css("display",display);
											if(width>sbWidth)
											{
												
												That.addHorizontalScroll($(this),width,sbWidth);
											}
											if(height>sbHeight)
											{
												That.addVerticalWidth($(this),height,sbHeight);
											}											
										}
									);
									this.jScroll=target;
								}
jQuerySideNote.prototype.addVerticalWidth=function(target,offsetHeight,height)
								{
									var That=this;
									target.prepend("<div class='scroll vsb'><div class='mid'></div></div>");
									var vsb=$(".vsb",target);
									var mid=$(".mid",vsb);
									vsb.css({"margin-left":(target.width()-(5+vsb.width()))+"px","height":(this.height-10-10)+"px","position":"absolute"});
									var midWidth=((height/offsetHeight)*vsb.height());
									if(midWidth<10)midWidth=10;
									var vsbGap=vsb.height()-midWidth;
									mid.css({"width":vsb.width()+"px","height":midWidth+"px"});
									vsb.attr("pro","margin-top"+","+vsbGap+","+offsetHeight+","+height);
									this.scrollEvent(target,vsb,mid,offsetHeight,vsbGap,height,midWidth,"margin-top");					
								}
jQuerySideNote.prototype.scrollEvent=function(target,sb,mid,offset,gap,thik,midWidth,style)
								{
									var That=this;
									
									$(".scrollParent",this.page.eq(this.current-1)).mousemove(
										function(evt){
											//if(evt.target != this){
											//	return true;
											//}
											That.noMoveCount=3;
										}
									);
   									target.mousewheel(function(event, delta) {
									event.preventDefault();
									if(That.settings.wheelMap=="vertical")
									{
										var pro=$(".vsb",this).attr("pro").split(',');
										var pos=parseInt($(".scrollParent",this).css('margin-top'));
									}
									else
									{
										var pro=$(".hsb",this).attr("pro").split(',');
										var pos=parseInt($(".scrollParent",this).css('margin-left'));
									}									
									
									
									var currentPos=(pos-((delta*-1)*30));
									//currentPos*=-1;
									
									if(currentPos>0)currentPos=0;
									if(currentPos<(pro[3]-pro[2]))currentPos=(pro[3]-pro[2]);
									var midPos=parseInt(((currentPos)/(pro[3]-pro[2]))*pro[1]);
									
									if(That.settings.wheelMap=="vertical")
									{
									$(".scrollParent",this).css("margin-top",(currentPos)+"px");
									$(".vsb .mid",this).css("margin-top",midPos);
									}
									else
									{
									$(".scrollParent",this).css("margin-left",(currentPos)+"px");
									$(".hsb .mid",this).css("margin-left",midPos);										
									}
  									
  									});
  									sb.mousemove(function(){
  										That.noMoveCount=-1;
  									});
  									sb.click(
  										function(evt){
  											if(evt.target != this){
												return true;
											}
											
											
    									var pro=$(this).attr("pro").split(',');
    									
    									if(pro[0]=='margin-left')
  										{
  											var top=$(this).offset().left;
  											var cur=evt.pageX;
  											var midWidth=parseInt($(".mid",this).width());
  										}
  										else
  										{
  											var top=$(this).offset().top;
  											var cur=evt.pageY;
   											var midWidth=parseInt($(".mid",this).height());
  										}		
  																			
  											midPos=parseInt(cur-top-(midWidth/2));
	  										if(midPos<0)midPos=0;
	  										if(midPos>pro[1])midPos=pro[1];
  											//$(".mid",this).css("margin-top",midPos+"px");
     									if(pro[0]=='margin-left')
  										{ 											
  											That.animateScroll($(".mid",this),{marginLeft:(midPos)+"px"});
  											var currentPos=(midPos/pro[1])*(pro[3]-pro[2]);
  											That.animateScroll($(".scrollParent",$(this).parent()),{marginLeft:(currentPos)+"px"});
		  								}
		  								else
		  								{
		  									That.animateScroll($(".mid",this),{marginTop:(midPos)+"px"});
		  									var currentPos=(midPos/pro[1])*(pro[3]-pro[2]);
		  									That.animateScroll($(".scrollParent",$(this).parent()),{marginTop:(currentPos)+"px"});
		  								}	
  										}
  									);
  									
  									
  									
  									this.onDrag(mid,"mid",function(jObj,evt){
  										if(jObj.attr("name")=="mid"){
    									var pro=jObj.parent().attr("pro").split(',');
    									var pos=jObj.attr("pos").split(',');
    									if(pro[0]=='margin-left')
  										{
  											var top=jObj.parent().offset().left;
  											var max=top+jObj.parent().width();
  											var cur=evt.pageX;
   											var difY=cur-pos[0];
  										}
  										else
  										{
  											var top=jObj.parent().offset().top;
  											var max=top+jObj.parent().height();
  											var cur=evt.pageY;
   											var difY=cur-pos[1];
  										}
  										var midPos=parseInt(jObj.css(pro[0]))+difY;
  										pro[1]=parseInt(pro[1]);
  										if(cur>=top&&cur<=max){
  											console.log(pro[1]);
  										if(midPos<0)midPos=0;
  										if(midPos>pro[1])midPos=pro[1];					
  										jObj.css(pro[0],midPos+"px");
  										currentPos=(midPos/pro[1])*(pro[3]-pro[2]);
  										$(".scrollParent",jObj.parent().parent()).css(pro[0],(currentPos)+"px");
  										}
  										
  										}
  									});									
								}								
jQuerySideNote.prototype.addHorizontalScroll=function(target,offsetWidth,width)
								{
									var That=this;
									target.prepend("<div class='scroll hsb'><div class='mid'></div></div>");
									var hsb=$(".hsb",target);
									var mid=$(".mid",hsb);
									hsb.css({"margin-top":(target.height()-(5+hsb.height()))+"px","width":(width-10-10)+"px","position":"absolute"});
									var midWidth=((width/offsetWidth)*hsb.width());
									if(midWidth<10)midWidth=10;
									var hsbGap=parseInt(hsb.width())-midWidth;
									mid.css({"height":hsb.height()+"px","width":midWidth+"px"});
									hsb.attr("pro","margin-left"+","+hsbGap+","+offsetWidth+","+width);
									this.scrollEvent(target,hsb,mid,offsetWidth,hsbGap,width,midWidth,"margin-left");			
								}
jQuerySideNote.prototype.animateScroll=function(target,property)
								{
									target.animate(property,400,function(){});
								}
jQuerySideNote.prototype.onDrag=function(target,id,drag,num)
								{
									var That=this;
									target.mousedown(
										function(e)
										{
											$(this).addClass("disableSelect");
											$(this).addClass("onDrag");
											$(this).attr("name",id);
											$(this).attr("pos",e.pageX+","+e.pageY);
										}
									);
									$("body").mouseup(
										function(){
											$(".disableSelect").removeClass("disableSelect");
											$(".onDrag").removeClass("onDrag");
										}
									);
									$("body").mousemove(
										function(e){
											if($(".onDrag").length>0)
											{
												drag($(".onDrag.mid"),e);
												$(".onDrag.mid").attr("pos",e.pageX+","+e.pageY);
											}
										}
									);		
								}								