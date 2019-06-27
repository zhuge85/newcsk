<template>
  <div id="showCld"></div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      today = year + '-' + month + '-' + day,
      monthLength = 30,
      week = ['日', '一', '二', '三', '四', '五', '六'],
      total = 42
    return {
      year,
      month,
      day,
      today,
      monthLength,
      week,
      total,
      select: today,
      time: '',
      e: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.time && (this.select = this.time)
      this.CalendarDom()
    })
  },
  methods: {
    selectBtn() {
      let calendar = document.getElementById('showCld')
      document.body.removeChild(calendar)
    },
    cancelBtn() {
      let calendar = document.getElementById('showCld')
      document.body.removeChild(calendar)
    },
    getMonthDates(year, month) {
      return new Date(year, month, 0).getDate()
    },
    getMonthFirstDay(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    CalendarDom(parent) {
      // let calendar = document.createElement('div')
      // calendar.setAttribute('id', 'showCld')
      // document.body.appendChild(calendar)
      let calendar = document.getElementById('showCld')
      let html = `
        <div class="picker-panel-body">
          <div class="picker-panel-header">
            <div class="picker-prev-btn icon-btn" id="zhu-ymin"><<</div>
            <div class="picker-prev-btn icon-btn" id="zhu-mmin"><</div>
            <span class="" id="zhu-showtime">${this.year}年${this.month}月${this.day}</span>
            <div class="picker-next-btn icon-btn" id="zhu-yadd">>></div>
            <div class="picker-next-btn icon-btn" id="zhu-madd">></div>
          </div>
          <div class="picker-panel-content">
            <div class="picker-cells">
              <div class="picker-cells-header">
                <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
              </div>
              <div class="picker-cells-body"></div>
            </div>
          </div>
        </div>`
      calendar.innerHTML = html
      let mmin = document.getElementById('zhu-mmin'),
        showtime = document.getElementById('zhu-showtime'),
        madd = document.getElementById('zhu-madd'),
        ymin = document.getElementById('zhu-ymin'),
        yadd = document.getElementById('zhu-yadd'),
        body = calendar.getElementsByClassName('picker-cells-body')[0],
        start = () => {
          let firstDay = this.getMonthFirstDay(this.year, this.month) || 7,
            startNum = 1,
            prevMonth = this.getMonthDates(this.year, this.month - 1),
            thisMonth = this.getMonthDates(this.year, this.month),
            arr = [],
            html = ''
          for (let i = prevMonth; i > prevMonth - firstDay; i--) {
            arr.unshift(i)
          }
          let nextMonth = this.total - arr.length - thisMonth,
            isShow = this.year + '-' + this.month + '-' + this.day == this.today
          for (let i = 0, len = arr.length; i < len; i++) {
            html += `<span class="picker-cells-cell-prev-month">
                <em>${arr[i]}</em>
              </span>`
          }
          for (let i = 1; i <= thisMonth; i++) {
            html += `<span class="picker-cells-cell-month${
              isShow && i == this.day ? ' picker-cells-cell-today' : ''
              } ${this.select == this.year + '-' + this.month + '-' + i ? 'picker-cells-cell-selected' : ''}">
                <em>${i}</em>
              </span>`
          }
          for (let i = 1; i <= nextMonth; i++) {
            html += `<span class="picker-cells-cell-next-month">
                <em>${i}</em>
              </span>`
          }
          showtime.innerHTML = `${this.year}年${this.month}月${this.day}`
          body.innerHTML = html
        }
      start()
      body.addEventListener( // removeEventListener
        'click',
        (e) => {
          let name, value, node
          if (e.target.nodeName === 'EM') {
            name = e.target.parentNode.className
            value = parseInt(e.target.innerText)
            node = e.target.parentNode
          } else {
            name = e.target.className
            value = parseInt(e.target.children[0].innerText)
            node = e.target
          }
          // console.log(parent)
          switch (true) {
            case name.includes('picker-cells-cell-month'):
              this.day = value
              this.select = this.year + '-' + this.month + '-' + this.day
              break
            case name.includes('picker-cells-cell-prev-month'):
              this.month = this.month - 1
              this.day = value
              this.select = this.year + '-' + this.month + '-' + this.day
              break
            case name.includes('picker-cells-cell-next-month'):
              this.month = this.month + 1
              this.day = value
              this.select = this.year + '-' + this.month + '-' + this.day
              break
            default:
              console.log('估计是外星时间')
          }
          if (parent) {
            parent.value = this.select
          }
          this.e.value = this.select
          this.selectBtn()
          // document.body.removeChild(calendar)
          // start()
          // calendar.classList.add('leave-active')
          // setTimeout(() => {
          //   calendar.style.display = 'none'
          // }, 190)
          // setTimeout(() => {
          //   calendar.classList.remove('leave-active')
          // }, 200)
        },
        true
      )
      calendar.onclick = function (e) {
        e.stopPropagation()
        e.cancelBubble = true
      }
      mmin.onclick = function () {
        this.month--
        this.month == 0 ? [(this.month = 12), this.year--] : ''
        this.monthLength = this.getMonthDates(this.year, this.month)
        start()
      }
      madd.onclick = function () {
        this.month++
        this.month == 13 ? [(this.month = 1), this.year++] : ''
        this.monthLength = this.getMonthDates(this.year, this.month)
        start()
      }
      ymin.onclick = function () {
        this.year--
        this.monthLength = this.getMonthDates(this.year, this.month)
        start()
      }
      yadd.onclick = function () {
        this.year++
        this.monthLength = this.getMonthDates(this.year, this.month)
        start()
      }
    }
  }
}
</script>
<style lang="less">
#showCld {
  position: absolute;
  top: 100px;
  overflow: visible;
  width: auto;
  margin: 5px 0;
  font-size: 12px;
  background-color: #fff;
  user-select: none;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.picker-panel-body {
  float: left;
}
.picker-panel-header {
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-bottom: 1px solid #e8eaec;
}
.icon-btn {
  display: inline-block;
  width: 20px;
  height: 24px;
  line-height: 26px;
  margin-top: 4px;
  text-align: center;
  cursor: pointer;
  color: #c5c8ce;
  transition: color 0.2s ease-in-out;
}
.icon-btn:hover {
  color: #2d8cf0;
}
.picker-prev-btn {
  float: left;
}
.picker-next-btn {
  float: right;
}
.picker-panel-content {
}
.picker-cells {
  width: 196px;
  margin: 10px;
  white-space: normal;
}
.picker-cells span,
.picker-cells span em {
  display: inline-block;
  width: 24px;
  height: 24px;
}
.picker-cells-header span {
  line-height: 24px;
  text-align: center;
  margin: 2px;
  color: #c5c8ce;
}
.picker-cells-body span {
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.picker-cells-body span em {
  line-height: 24px;
  margin: 2px;
  font-style: normal;
  border-radius: 3px;
  text-align: center;
  transition: all 0.2s ease-in-out;
}
.picker-cells-cell-month:hover em {
  background: #e1f0fe;
}
.picker-cells-cell-prev-month em,
.picker-cells-cell-next-month em {
  color: #c5c8ce;
}
.picker-cells-cell-prev-month:hover em,
.picker-cells-cell-next-month:hover em {
  color: #333;
}
.picker-cells-cell-today em {
  position: relative;
}
.picker-cells-cell-today em:after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2d8cf0;
  position: absolute;
  top: 1px;
  right: 1px;
}
.picker-cells-cell-today.picker-cells-cell-selected em:after {
  background: #fff;
}
.picker-cells-cell-selected:hover em,
.picker-cells-cell-selected em {
  background: #2d8cf0;
  color: #fff;
}
.enter-active {
  animation: ivuTransitionDropIn 0.2s ease-in-out;
}
.leave-active {
  animation: ivuTransitionDropOut 0.2s linear;
}
@keyframes ivuTransitionDropIn {
  0% {
    opacity: 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@keyframes ivuTransitionDropOut {
  0% {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    -webkit-transform: scaleY(0.8);
    transform: scaleY(0.8);
  }
}
</style>
