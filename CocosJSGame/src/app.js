
var HelloWorldLayer = cc.Layer.extend({
	  sprite:null,
	  ctor:function () {
      
        this._super();
        var size = cc.winSize;

       

        var helloLabel = new cc.LabelTTF("TheWol", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height - 20;
         this.addChild(helloLabel, 5);
         
         this.sprite = new cc.Sprite("res/Wolf.png");
         this.sprite.attr({

        	 x: size.width / 2 ,
        	 y: size.height/ 2  ,

         });
         this.addChild(this.sprite, 0);

        
        // add the DrawNode 
        this.drawNode = new cc.DrawNode(); 
        this.addChild(this.drawNode); 

        //add the Listener
        var listener = cc.EventListener.create({
        	event:cc.EventListener.TOUCH_ONE_BY_ONE,
        	swallowTouches:true,
        	onTouchBegan:function(touch,event){
        		return true;
        	},
        	onTouchMoved:function(touch,event){
        		return true;
        	},
        	onTouchEnded:function(touch,event){
        		var p1 = touch.getStartLocation();
        		var p2 = touch.getLocation();
        		//event.getCurrentTarget().shapes.push(p1,p2);
        		event.getCurrentTarget().drawNode.drawSegment(p1,p2,2,cc.color(100,20,20));
        		return true;
        	}
        });
        cc.eventManager.addListener(listener, this);
        
        
        
        
        return true;
    },
    undo: function(){
    	this.shapes.pop();
    	this.shapes.pop();
    	this.drawNode.clear();
    	for(var i = 0; i<this.shapes.length;i+=2){
    		this.drawNode.drawSegment(this.shapes[i],this.shapes[i+1],2,cc.color(100,20,20));
    	}
     }
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

