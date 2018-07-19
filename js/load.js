var loadState = {
    loading_label: null,
    preload: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
//        游戏里开物理引擎
        var cx = game.world.centerX;
        var cy = game.world.centerY;
        //定义加载在画布中间
        this.loading_label = game.add.text(cx, cy, 'loading ...',
            {font: '64px Arial', fill: '#ffffff'});
        this.loading_label.anchor.setTo(0.5,0.5);
        this.loading_label.alpha = 0;
        var loading_tween = game.add.tween(this.loading_label).to({ alpha: 1 },
            1000, "小盖兽", true, 0, -1);
        loading_tween.yoyo(true, 1500);

        // 加载 json
        game.load.json('data', '../assets/data.json');
        game.load.json('maps', '../assets/maps.json');

        // 加载 atlas地图
        game.load.atlasJSONHash('image', '../assets/image.png', '../assets/image.json');
        game.load.image('tileset', '../assets/tileset.png');

        // 加载声音
        game.load.audiosprite('sound', '../assets/sound_effect.mp3', '../assets/sound_effect.json');
    },
    create: function(){
        // 添加声音
        sound = game.add.audioSprite('sound');
        // 摄像机淡入淡出切换界面
        this.camera.fade('#000', 500);
        this.camera.onFadeComplete.addOnce(function() {theme_music = sound.play('theme_music');
            this.game.state.start('menu');
        }, this);
    }
};

function object(o){
    function F(){};
    //向F添加属性 o
    F.prototype = o;
    return new F();
}
// A*算法最重要的就是他的A*估价函数，用来评估哪个节点离目标点最近，用f(n) = g(n) + h(n)来表示。


//继承原型
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function selectFrom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}

// button prefabs
function ButtonPrefab(x, y, name, callback, obj){
    var bt_data = {
        'resume':{'normal':'01','over':'05','pressed':'09'},
        'return':{'normal':'02','over':'06','pressed':'10'},
        'start':{'normal':'03','over':'07','pressed':'11'},
        'about':{'normal':'04','over':'08','pressed':'12'}
    };
    var dat = bt_data[name];
    this.button = game.add.button(x, y, 'image', callback, obj,
        'buttons/button_' + dat.over, 'buttons/button_' + dat.normal, 'buttons/button_' + dat.pressed);
    //返回按钮的状态
    this.button.anchor.setTo(0.5,0.5);
    /*this.button.onInputOver.add((e) => {
        console.log('over');
        var butenter_sound = game.add.audio('butenter');
        butenter_sound.play();
    });*/
    this.button.onInputDown.add((e) => {
        sound.play('butpressed');
});
}
//设置锚点
ButtonPrefab.prototype.setAnchor = function(x,y){
    this.button.anchor.setTo(x,y);
}

ButtonPrefab.prototype.enable = function(){
    this.button.inputEnabled = true;
}
ButtonPrefab.prototype.disable = function(){
    this.button.inputEnabled = false;
}
