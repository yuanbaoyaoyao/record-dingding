Component({
  mixins: [{ didMount() { } }],
  data: {
    recommendlist: {
      list: [
        {
          "pic": "/image/mock/88a1.png",
          "text": "1"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "2"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "3"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "4"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "5"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "6"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "7"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "8"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "9"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "10"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "11"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "12"
        }
      ],
      columnNum: 2
    },
    //
    hideCount: true,  //是否隐藏购物车上的数字
    count: 0,   //购物车上的计数
    needAni: true,  //抛物线动画是否在进行中
    hide_good_box: true   //是否隐藏物品小图标
  },
  props: {},
  didMount() {
    this.getCartPos()
  },
  didUpdate(prevProps, prevData) { },
  didUnmount() { },

  methods: {
    /**
     * 设置动画开始及结束维护 needAni 参数
     * @method busAnimation
     */
    getCartPos: function () {



      var that = this;
      console.log("yes")
      my.getSystemInfo({
        /** 设置购物车的坐标 */
        success: function (res) {
          let screenHeight = res.screenHeight
          let windowHeight = res.windowHeight
          let statusBarHeight = res.statusBarHeight
          let pixelRatio = res.pixelRatio
          const tabbarHeight = (screenHeight - windowHeight - statusBarHeight) * pixelRatio
          let tabbarWidth = res.windowWidth
          let cartHeight = tabbarHeight / 2
          let cartWidth = tabbarWidth / 1.8
          console.log("res:", res)
          let busPos = {};
          let busPos1 = {}
          // x y 坐标分别取屏幕百分之八十的位置
          busPos1['x'] = res.windowWidth * 0.8;
          busPos1['y'] = res.windowHeight * 0.8;
          busPos['x'] = cartWidth
          busPos['y'] = screenHeight - cartHeight

          console.log('onLoad', busPos)
          console.log('onLoad1', busPos1)
          that.setData({
            busPos: busPos
          })
        }
      })
    },
    busAnimation: function () {
      this.setData({
        needAni: true
      });
      setTimeout(function () {
        this.setData({
          needAni: false
        });
      }, 800);
    },

    /**
     * 物品的点击事件
     * @method touchOnGoods
     * @param {object} e 事件
     */
    touchOnGoods: function (e) {
      console.log(e)
      // 如果good_box正在运动，则不处理
      if (!this.data.hide_good_box) return;
      //定义手指点击位置
      let finger = {};
      //定义动画顶点位置
      let topPoint = {};
      console.log("e.detail:", e.detail)
      finger['x'] = e.detail.clientX;
      finger['y'] = e.detail.clientY;
      console.log("finger(y):", finger['y'])
      console.log("data.busPos(y)", this.data.busPos['y'])
      // 当手指点击位置y轴小于购物车位置时，顶点以手指点击位置向上移150
      if (finger['y'] < this.data.busPos['y']) {
        topPoint['y'] = finger['y'] - 150;
      } else {
        // 当手指点击位置y轴大于购物车位置时，顶点以购物车位置向上移150
        topPoint['y'] = this.data.busPos['y'] - 150;
      }

      //点击位置是否在购物车右面
      let isright = false
      if (finger['x'] > this.data.busPos['x']) {
        //点击位置在购物车右面时，顶点y轴应该在购物车下方
        isright = true
        topPoint['y'] = finger['y'] - Math.abs(this.data.busPos['y'] - finger['y'])
        //点击位置在购物车右面时，顶点x轴应该点击位置左侧
        topPoint['x'] = Math.abs(finger['x'] - this.data.busPos['x']) / 2 - finger['x'];
      } else {
        //点击位置在购物车左侧时，顶点x轴应该点击位置右侧
        topPoint['x'] = Math.abs(finger['x'] - this.data.busPos['x']) / 2 + finger['x'];
      }

      //计算出贝塞尔曲线运动位置数组
      let linePos = this.bezier([finger, topPoint, this.data.busPos], 30, isright);
      this.setData({
        linePos: linePos,
        finger: finger
      })
      //开始动画
      this.startAnimation(linePos);
    },

    /**
    * 开始动画
    * @method startAnimation
    * @param {object} e 事件
    */
    startAnimation: function () {
      var index = 0   //定义定时器执行次数
      let that = this
      let bezier_points = that.data.linePos['bezier_points'];

      this.setData({
        hide_good_box: false,
        bus_x: this.data.finger['x'],
        bus_y: this.data.finger['y']
      })
      //开启定时器，依次按照贝塞尔曲线位置做动画位移
      this.timer = setInterval(function () {
        index++;  //记录定时器执行次数
        that.setData({  //改变运动中图标位置
          bus_x: bezier_points[index]['x'],
          bus_y: bezier_points[index]['y']
        })

        if (index >= 28) {
          /** 定时器执行达到28次则关闭定时器 */
          clearInterval(that.timer);
          that.setData({
            hide_good_box: true,
            hideCount: false,
            count: that.data.count += 1
          })
        }
      }, 33);
    },
    bezier: function (points, times, isright) {
      // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
      // 1、计算相邻控制点间距。
      // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
      // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
      // 4、根据DE的正余弦值和DE的值计算出F的坐标。
      // 邻控制AB点间距
      var bezier_points = [];
      var points_D = [];
      var points_E = [];
      const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
      // 邻控制BC点间距
      const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
      // D每次在AB方向上移动的距离
      const EACH_MOVE_AD = DIST_AB / times;
      // E每次在BC方向上移动的距离 
      const EACH_MOVE_BE = DIST_BC / times;
      // 点AB的正切
      const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
      // 点BC的正切
      const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
      // 点AB的弧度值
      const RADIUS_AB = Math.atan(TAN_AB);
      // 点BC的弧度值
      const RADIUS_BC = Math.atan(TAN_BC);
      // 每次执行
      for (var i = 1; i <= times; i++) {
        // AD的距离
        var dist_AD = EACH_MOVE_AD * i;
        // BE的距离
        var dist_BE = EACH_MOVE_BE * i;
        // D点的坐标
        var point_D = {};
        if (isright) {
          point_D['x'] = -dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
        } else {
          point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
        }

        point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
        points_D.push(point_D);
        // E点的坐标
        var point_E = {};
        if (isright) {
          point_E['x'] = -dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
        } else {
          point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
        }

        point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
        points_E.push(point_E);
        // 此时线段DE的正切值
        var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
        // tan_DE的弧度值
        var radius_DE = Math.atan(tan_DE);
        // 地市DE的间距
        var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
        // 此时DF的距离
        var dist_DF = (dist_AD / DIST_AB) * dist_DE;
        // 此时DF点的坐标
        var point_F = {};
        point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
        point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
        bezier_points.push(point_F);
      }
      return {
        'bezier_points': bezier_points
      };
    },
  },
});

