<template>
  <div class="game-wrapper" v-show="show">
    <div class="main-box">
      <div class="close">
        <span @click="Initialize">c</span>
        <span @click="minustime">-</span>
        <span @click="addtime">+</span>
        <span @click="bengin">s</span>
        <span @click="close">x</span>
      </div>
      <div class="ant">
        <div class="game-field" ref="animate">
          <div class="line-box">
            <div class="line-1">
              <img src="@img/animate/line.png" width="100%" />
            </div>
            <div class="line-2">
              <img src="@img/animate/line.png" width="100%" />
            </div>
          </div>
          <div class="game-num">
            <div class="num-left">剩余时间： {{ AnimationTime }}</div>
            <!-- <div class="num-left">{{lotteryResults.name}}</div> -->
            <div class="num-center">
              <ul>
                <li v-for="n in 10" :key="n">{{n}}</li>
              </ul>
            </div>
            <!-- <div class="num-right">期号：{{lasttime}}</div> -->
          </div>
          <div class="topbg"></div>
          <div class="animate-box">
          </div>
          <div :class="'car car' + n" :id="'car' + n" v-for="n in 10" :key="n">
            <div class="car-div">
              <img :src="car[n-1]" width="100%" class="icar" />
              <div class="car-wheel wheel1a">
                <img src="@img/animate/wheel.gif" width="100%" />
              </div>
              <div class="car-wheel2 wheel1b">
                <img src="@img/animate/wheel.gif" width="100%" />
              </div>
              <div class="car-front wind1">
                <img src="@img/animate/wind.png" width="100%" />
              </div>
              <div class="car-after flame1">
                <img src="@img/animate/flame.png" width="100%" />
              </div>
            </div>
          </div>
        </div>
        <div class="game-light">
          <div class="countdownnum">00:00</div>
          <div class="countdownnum2">00</div>
          <div class="lightgreen">
            <img src="@img/animate/lightgreen.png" width="100%" />
          </div>
          <div class="lightyellow">
            <img src="@img/animate/lightyellow.png" width="100%" />
          </div>
          <div class="lightred">
            <img src="@img/animate/lightred.png" width="100%" />
          </div>
        </div>
      </div>
      <div class="rz-bg">
        <div :class="`place${n+1} place`" v-for="(img,n) in results" :key="n">
          <img :src="img" width="80%" />
          <div class="place-name-1"></div>
        </div>
      </div>
      <div class="game-rezult" style="visibility:hidden">
        <div class="rezult-left">
          <p><em>等待开奖：</em><span>{{thistime}}</span></p>
        </div>
        <div class="rezult-center">
          <p>
            <em>冠亚军和：</em>
            <i v-for="(item,index) in result1" :key="index">{{item}}</i>
          </p>
        </div>
        <div class="rezult-right">
          <p>
            <em>1-5龙虎：</em>
            <i v-for="(item,index) in result2" :key="index">{{item}}</i>
          </p>
        </div>
      </div>
      <div style="display: none;">{{newAnimation.name}}</div>
    </div>
  </div>
</template>
<script>
import { NumArr } from '@a/js/tools'
export default {
  props: {
    show: {
      type: Boolean,
      // default: false
    }
  },
  data() {
    return {
      lotteryResults: {},
      lasttime: '',
      thistime: '',
      result1: '',
      result2: '',
      lastresult: [],
      car: [
        require('@img/animate/car1.png'),
        require('@img/animate/car2.png'),
        require('@img/animate/car3.png'),
        require('@img/animate/car4.png'),
        require('@img/animate/car5.png'),
        require('@img/animate/car6.png'),
        require('@img/animate/car7.png'),
        require('@img/animate/car8.png'),
        require('@img/animate/car9.png'),
        require('@img/animate/car10.png'),
      ],
      results: [
        require('@img/rezult/result1.png'),
        require('@img/rezult/result2.png'),
        require('@img/rezult/result3.png'),
      ],
      colorArr: ['#ffff00', '#0089ff', '#4d4d4d', '#ff7300', '#81ffff', '#5200ff', '#bab9b9', '#ff0000', '#760000', '#28C300'],
      CarDiv: [],
      beginTime: 3000,
      InitializeTime: 5000,
      SetTime: 60,
      AnimationTime: 60,
      timer: null,
      timer2: null
    }
  },
  mounted() {
    let arr = [5, 8, 1, 3, 6, 9, 2, 4, 7, 10]
    this.color()
  },
  computed: {
    newAnimation() {
      let val = this.$store.getters.newAnimation
      this.lotteryResults = val
      this.CarDiv = val.result
      this.lasttime ? '' : this.lasttime = val.qishu
      this.thistime ? '' : this.thistime = val.qishu + 1
      this.result1 ? '' : [val.result ? this.result1 = this.computedResult1(val.result) : '']
      this.result2 ? '' : [val.result ? this.result2 = this.computedResult2(val.result) : '']
      return val;
    },
    suspended() {
      return this.$store.getters.suspended;
    },
  },
  watch: {
    $route(newVal, oldVal) {
      this.Initialize()
    },
    newAnimation(newval, oldval) {
      if (newval.qishu !== oldval.qishu && oldval.qishu) {
        console.log('时间到')
        this.AnimationTime = 5;
        setTimeout(() => {
          this.thistime = newval.qishu + 1
          this.lasttime = newval.qishu
          this.result1 = this.computedResult1(newval.result)
          this.result2 = this.computedResult2(newval.result)
        }, 6000)
      } else {
      }
    },
    suspended(newval, oldval) {
      oldval == false && newval == true ? [this.Initialize(), this.start()] : ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    minustime() {
      if (this.AnimationTime > 15) {
        this.AnimationTime = this.AnimationTime - 15
      }
    },
    addtime() {
      this.AnimationTime = this.AnimationTime + 10
    },
    bengin() {
      this.CarDiv = NumArr(10, 10, 1)
      this.Initialize()
      this.start()
    },
    computedResult1(arr) {
      arr = arr.map(Number);
      let newArr = []
      newArr[0] = arr.slice(0, 2).reduce((total, item) => total + item);
      newArr[1] = newArr[0] % 2 ? '单' : '双';
      newArr[2] = newArr[0] > 11 ? '大' : '小';
      return newArr
    },
    computedResult2(arr) {
      arr = arr.map(Number);
      let len = arr.length - 1
      let newArr = new Array(5)
      for (let i = 0, len2 = newArr.length; i < len2; i++) {
        newArr[i] = arr[i] - arr[len - i] > 0 ? '龙' : '虎'
      }
      return newArr
    },
    xuhuan(arr, name, val) {
      let i = 0, len = arr.length
      if (name) {
        for (i; i < len; i++) {
          arr[i].style[name] = val
        }
      } else {
        for (i; i < len; i++) {
          arr[i].removeAttribute('style')
        }
      }
    },
    Initialize() {
      clearInterval(this.timer);
      this.timer = null
      clearInterval(this.timer2);
      this.timer2 = null
      document.querySelector('.rz-bg').style.display = "none"
      let front = document.querySelectorAll('.car-front')
      let after = document.querySelectorAll('.car-after')
      let wheela = document.querySelectorAll('.car-wheel')
      let wheelb = document.querySelectorAll('.car-wheel2')
      this.xuhuan(front, 'display', 'none')
      this.xuhuan(after, 'display', 'none')
      this.xuhuan(wheela, 'display', 'none')
      this.xuhuan(wheelb, 'display', 'none')
      document.querySelector('.game-field').style.display = "block"
      document.querySelector('.game-light').style.display = "block"
      let cars = document.getElementsByClassName('car')
      this.xuhuan(cars)
      document.querySelector('.lightgreen').removeAttribute('style')
      document.querySelector('.lightyellow').removeAttribute('style')
      document.querySelector('.lightred').removeAttribute('style')
      let place = document.querySelectorAll('.place')
      for (let i = 0; i < place.length; i++) {
        place[i].removeAttribute('style')
        place[i].className = 'place place' + (i + 1)
      }
      this.$refs.animate.classList.remove('animate')
      this.$refs.animate.classList.remove('animate2')
      document.querySelector('.game-light .countdownnum').innerHTML = '00:00'
      document.querySelector('.game-light .countdownnum2').innerHTML = '000'
    },
    start() {
      this.countDownCIT(this.beginTime, function (mint, seco, hm) {
        document.querySelector('.game-light .countdownnum').innerHTML = mint + ':' + seco
        document.querySelector('.game-light .countdownnum2').innerHTML = hm
        // $('.game-light .countdownnum').html(mint + ':' + seco);
        // $('.game-light .countdownnum2').html(hm);
      });
      this.color();
    },
    // 倒计时 执行动画
    countDownCIT(rs, fnc) {
      this.timer2 = setInterval(() => {
        if (rs > 0) {
          let mint = parseInt(rs / (60 * 1000))
          let seco = parseInt((rs - (mint * 60 * 1000)) / 1000);
          let hm = parseInt((rs - (mint * 60 * 1000)) % 1000);
          hm = parseInt(hm.toFixed(2))
          if (mint < 10) {
            mint = '0' + mint
          };
          if (seco < 10) {
            seco = '0' + seco
          };
          fnc(mint, seco, hm);
          rs = rs - 10;
          if (rs <= 3000) {
            document.querySelector('.lightred').style.display = "block"
          }
          if (rs <= 2000) {
            document.querySelector('.lightred').style.display = "block"
            document.querySelector('.lightyellow').style.display = "block"
          }
          if (rs <= 1000) {
            document.querySelector('.lightred').style.display = "block"
            document.querySelector('.lightyellow').style.display = "block"
            document.querySelector('.lightgreen').style.display = "block"
          }
        } else {
          clearInterval(this.timer2);
          this.timer2 = null
          this.timeTo()
          document.querySelector('.game-light').style.display = "none"
          document.querySelector('.game-light .countdownnum').innerHTML = '00:00'
          document.querySelector('.game-light .countdownnum2').innerHTML = '000'
        }
      }, 10);
    },
    timeTo() {
      this.$refs.animate.classList.add('animate')
      let wheel = document.querySelectorAll('.car-wheel')
      let wheel2 = document.querySelectorAll('.car-wheel2')
      this.xuhuan(wheel, 'display', 'block')
      this.xuhuan(wheel2, 'display', 'block')
      this.timer = setInterval(() => {
        let list = [];
        let arr = [];
        this.AnimationTime == 12 ? this.AnimationTime = 60 : ''
        if (this.AnimationTime > 2) {
          let arr2 = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
          arr2.forEach((item, index) => {
            if (item > 0.3) {
              document.querySelector(`.car${index + 1} .car-front`).style.display = "none"
              document.querySelector(`.car${index + 1} .car-after`).style.display = "none"
              if (item > 1) {
                arr2[index] = item - 1
              }
            } else {
              document.querySelector(`.car${index + 1} .car-front`).style.display = "block"
              document.querySelector(`.car${index + 1} .car-after`).style.display = "block"
            }
            if (index > 1) {
              document.querySelector(`.car${index + 1}`).style.left = [item * 500 - 10 * (index - 1)] + 'px'
            }
            document.querySelector(`.car${index + 1}`).style.left = item * 500 + 'px'
          })
          this.AnimationTime -= 2;
          for (let i = 1; i <= 10; i++) {
            let left = {}
            left.num = parseInt(document.querySelector(`.car${i}`).style.left)
            left.id = i
            list.push(left)
            arr.push(parseInt(document.querySelector(`.car${i}`).style.left))
          }
          // 测试
          let aa = arr;
          let kk = this.arrayKeys(aa);  // 原索引数组
          this.heapSort(aa, kk, 'asc');
          // console.log(aa);  // 排序后
          // console.log(kk);  // 原索引
          let html = ''
          for (let j = 0; j < kk.length; j++) {
            html += `<li>${kk[j]}</li>`
          }
          document.querySelector('.num-center ul').innerHTML = html
          this.color();
          console.log(this.AnimationTime)
          if (this.AnimationTime <= 2) {
            this.sortcar();
          }
        }
      }, 2000);
    },
    // 名次排序
    sortcar() {
      let len = this.CarDiv.length
      for (let i = 0; i < len; i++) {
        document.querySelector(`.car${this.CarDiv[i]}`).style.left = 60 * (i + 1) + 'px'
      }
      let html = ''
      for (let j = 0; j < len; j++) {
        html += `<li>${this.CarDiv[j]}</li>`
      }
      document.querySelector('.num-center ul').innerHTML = html
      this.color();
      clearInterval(this.timer);
      this.timer = null

      let front = document.querySelectorAll('.car-front')
      let after = document.querySelectorAll('.car-after')
      let wheel = document.querySelectorAll('.car-wheel')
      let wheel2 = document.querySelectorAll('.car-wheel2')
      setTimeout(() => {
        this.$refs.animate.classList.remove('animate')
        this.$refs.animate.classList.add('animate2')
        this.AnimationTime = this.SetTime
        this.xuhuan(front, 'display', 'none')
        this.xuhuan(after, 'display', 'none')
        setTimeout(() => {
          this.xuhuan(wheel, 'display', 'none')
          this.xuhuan(wheel2, 'display', 'none')
        }, 2000);
      }, 2000);
      setTimeout(() => {
        this.winAnimation();
      }, 3000)
    },
    arrayKeys(arr) {
      let i = 1,
        len = arr.length + 1,
        keys = [];
      while (i < len) {
        keys.push(i++);
      }
      return keys;
    },
    // 判断变量是否为数组
    isArray(arr) {
      return ({}).toString.call(arr).match(/^\[[^\s]+\s*([^\s]+)\]$/)[1] == 'Array';
    },
    // 堆排序
    heapSort(arr, keys, order) {
      if (!this.isArray(arr) || !this.isArray(keys)) return;
      order = (order + '').toLowerCase() == 'desc' ? order : 'asc';
      // 交换位置
      function changePos(arr, cur, left) {
        let tmp;
        tmp = arr[cur];
        arr[cur] = arr[left];
        arr[left] = tmp;
      }
      // 构造二叉堆
      function heap(arr, start, end, isMax) {
        isMax = isMax == undefined ? true : isMax;  // 是否最大堆，否为最小堆
        let cur = start,        // 当前节点的位置
          left = 2 * cur + 1;  // 左孩子的位置
        for (; left <= end; cur = left, left = 2 * left + 1) {
          // left是左孩子，left + 1是右孩子
          if (left < end && ((isMax && arr[left] < arr[left + 1]) || (!isMax && arr[left] > arr[left + 1]))) {
            left++;  // 左右子节点中取较大/小者
          }
          if ((isMax && arr[cur] >= arr[left]) || (!isMax && arr[cur] <= arr[left])) {
            break;
          } else {
            // 原index跟随排序同步进行
            changePos(keys, cur, left);
            changePos(arr, cur, left);
          }
        }
      }
      return (() => {
        // 从(n/2-1) --> 0逐次遍历。遍历之后，得到的数组实际上是一个二叉堆
        let len = arr.length,
          i = Math.floor(len / 2) - 1
        for (; i >= 0; i--) {
          heap(arr, i, len - 1, order == 'asc');
        }
        // 从最后一个元素开始对序列进行调整，不断的缩小调整的范围直到第一个元素
        for (i = len - 1; i > 0; i--) {
          changePos(keys, 0, i);
          changePos(arr, 0, i);
          // 调整arr[0...i - 1]，使得arr[0...i - 1]仍然是一个最大/小堆
          // 即，保证arr[i - 1]是arr[0...i - 1]中的最大/小值
          heap(arr, 0, i - 1, order == 'asc');
        }
      })();
    },
    // 设置序号颜色
    color() {
      let ulli = document.querySelectorAll('.game-num ul li')
      for (let i = 0, len = ulli.length; i < len; i++) {
        ulli[i].style.background = this.colorArr[parseInt(ulli[i].innerHTML) - 1]
      }
    },
    // 名次显示动画效果
    winAnimation() {
      let sT = 2
      let Time_S = setInterval(() => {
        if (sT > 0) {
          sT--;
        } else {
          clearInterval(Time_S);
          this.theWinner();
          setTimeout(() => {
            this.NumOne()
          }, 500)
        }
      }, 1000)
    },
    NumOne() {
      let node = document.querySelector(`.place1`);
      node.style.visibility = "visible"
      node.style.left = "420px"
      node.style.top = "195px"
      setTimeout(() => {
        this.NumTwo()
      }, 500)
    },
    NumTwo() {
      let node = document.querySelector(`.place2`);
      node.style.visibility = "visible"
      node.style.left = "185px"
      node.style.top = "150px"
      setTimeout(() => {
        this.NumThree()
      }, 500)
    },
    NumThree() {
      let node = document.querySelector(`.place3`);
      node.style.visibility = "visible"
      node.style.left = "670px"
      node.style.top = "150px"
      setTimeout(() => {
        this.Initialize()
      }, this.InitializeTime)
    },
    // 获取比赛结果前三名
    theWinner() {
      document.querySelector(`.rz-bg`).style.display = "block"
      document.querySelector(`.game-field`).style.display = "none"
      let box = document.querySelectorAll('.place')
      for (let i = 0; i < 3; i++) {
        box[i].classList.add('PN_' + this.CarDiv[i])
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null
    clearInterval(this.timer2);
    this.timer2 = null
  }
}
</script>

