var menuState = {
    menus : null,
    start_button : null,
    about_button :null,
    about_panel :null,
    startCallback : function () {
    //    淡出
        this.camera.fade('#000',500);
        this.camera.onFadeComplete.addOnce(function () {
            this.game.state.start('level');
        },this);
    },
    aboutReturnCallback : function () {
        this.about_panel.visible = false;
        this.start_button.enable();
        this.about_button.enable();
    },
    aboutCallback: function () {
        this.start_button.disable();
        this.about_button.disable();

        this.about_panel = game.add.group();
        var cx = game.world.centerX;
        var cy = game.world.centerY;
        var aboutbg =game.add.sprite(cx,cy,'image','window');
        aboutbg.anchor.setTo(0.5,0.5);
        this.about_panel.add(aboutbg);
        var return_button = new ButtonPrefab(cx,cy+128,
            'return',menuState.aboutReturnCallback,this);
        this.about_panel.add(return_button.button);

        //文字部分
        var content = "游戏玩法：通过放炸弹攻击小怪\n"+
            "游戏道具：加血瓶、加速瓶、激光弹、距离增长、范围加宽\n" +
            "难点：A星寻路算法";
        var style = {font:"28px Consolas", fill:"#fff",
        stroke:'#555',strokeThickness:6};
        var text =game.add.text(cx,cy-64,content,style);
        text.anchor.setTo(0.5,0.5);
        this.about_panel.add(text);
    },

    create:function () {
        this.camera.flash('#000',500);

        var menu_sprite =game.add.sprite(0,0,'image','menu');

        this.menus = game.add.group();
        var cx =game.world.centerX;
        var cy =game.world.centerY;
        this.start_button = new ButtonPrefab(cx,cy,'start',
            menuState.startCallback,this);
        this.menus.add(this.start_button.button);

    },
};