<template>
  <div>
    <div id="dsCalendar"></div>
  </div>
</template>

<script>
export default {
  data() {
    var lunarInfo = new Array(
      0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
      0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
      0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
      0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
      0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
      0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
      0x14b63);
    var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
    var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
    var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var nStr2 = new Array('初', '十', '廿', '卅', '□');
    var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
    //国历节日 *表示放假日
    var sFtv = new Array(
      "0101*元旦节",
      "0202 世界湿地日",
      "0210 国际气象节",
      "0214 情人节",
      "0301 国际海豹日",
      "0303 全国爱耳日",
      "0305 学雷锋纪念日",
      "0308 妇女节",
      "0312 植树节 孙中山逝世纪念日",
      "0314 国际警察日",
      "0315 消费者权益日",
      "0317 中国国医节 国际航海日",
      "0321 世界森林日 消除种族歧视国际日 世界儿歌日",
      "0322 世界水日",
      "0323 世界气象日",
      "0324 世界防治结核病日",
      "0325 全国中小学生安全教育日",
      "0330 巴勒斯坦国土日",
      "0401 愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)",
      "0407 世界卫生日",
      "0422 世界地球日",
      "0423 世界图书和版权日",
      "0424 亚非新闻工作者日",
      "0501*劳动节",
      "0502*劳动节假日",
      "0503*劳动节假日",
      "0504 青年节",
      "0505 碘缺乏病防治日",
      "0508 世界红十字日",
      "0512 国际护士节",
      "0515 国际家庭日",
      "0517 国际电信日",
      "0518 国际博物馆日",
      "0520 全国学生营养日",
      "0523 国际牛奶日",
      "0531 世界无烟日",
      "0601 国际儿童节",
      "0605 世界环境保护日",
      "0606 全国爱眼日",
      "0617 防治荒漠化和干旱日",
      "0623 国际奥林匹克日",
      "0625 全国土地日",
      "0626 国际禁毒日",
      "0701 香港回归纪念日 中共诞辰 世界建筑日",
      "0702 国际体育记者日",
      "0707 抗日战争纪念日",
      "0711 世界人口日",
      "0730 非洲妇女日",
      "0801 建军节",
      "0808 中国男子节(爸爸节)",
      "0815 抗日战争胜利纪念",
      "0908 国际扫盲日 国际新闻工作者日",
      "0909 毛泽东逝世纪念",
      "0910 中国教师节",
      "0914 世界清洁地球日",
      "0916 国际臭氧层保护日",
      "0918 九·一八事变纪念日",
      "0920 国际爱牙日",
      "0927 世界旅游日",
      "0928 孔子诞辰",
      "1001*国庆节 世界音乐日 国际老人节",
      "1002*国庆节假日 国际和平与民主自由斗争日",
      "1003*国庆节假日",
      "1004 世界动物日",
      "1006 老人节",
      "1008 全国高血压日 世界视觉日",
      "1009 世界邮政日 万国邮联日",

      "1010 辛亥革命纪念日 世界精神卫生日",
      "1013 世界保健日 国际教师节",
      "1014 世界标准日",
      "1015 国际盲人节(白手杖节)",
      "1016 世界粮食日",
      "1017 世界消除贫困日",
      "1022 世界传统医药日",
      "1024 联合国日",
      "1031 世界勤俭日",
      "1107 十月社会主义革命纪念日",
      "1108 中国记者日",
      "1109 全国消防安全宣传教育日",
      "1110 世界青年节",
      "1111 国际科学与和平周(本日所属的一周)",
      "1112 孙中山诞辰纪念日",
      "1114 世界糖尿病日",
      "1117 国际大学生节 世界学生节",
      "1120*彝族年",
      "1121*彝族年 世界问候日 世界电视日",
      "1122*彝族年",
      "1129 国际声援巴勒斯坦人民国际日",
      "1201 世界艾滋病日",
      "1203 世界残疾人日",
      "1205 国际经济和社会发展志愿人员日",
      "1208 国际儿童电视日",
      "1209 世界足球日",
      "1210 世界人权日",
      "1212 西安事变纪念日",
      "1213 南京大屠杀(1937年)纪念日！紧记血泪史！",
      "1220 澳门回归纪念",
      "1221 国际篮球日",
      "1224 平安夜",
      "1225 圣诞节",
      "1226 毛泽东诞辰纪念")

    //农历节日 *表示放假日
    var lFtv = new Array(
      "0101*春节",
      "0102*春节",
      "0103*春节",
      "0115 元宵节",
      "0505 端午节",
      "0624*火把节",
      "0625*火把节",
      "0626*火把节",
      "0707 七夕情人节",
      "0715 中元节",
      "0815 中秋节",
      "0909 重阳节",
      "1208 腊八节",
      "1223 小年",
      "0100 除夕")

    //某月的第几个星期几
    var wFtv = new Array(
      "0150 世界麻风日", //一月的最后一个星期日（月倒数第一个星期日）
      "0520 国际母亲节",
      "0530 全国助残日",
      "0630 父亲节",
      "0730 被奴役国家周",
      "0932 国际和平日",
      "0940 国际聋人节 世界儿童日",
      "0950 世界海事日",
      "1011 国际住房日",
      "1013 国际减轻自然灾害日(减灾日)",
      "1144 感恩节")
    return {

    }
  },
  created() {
    this.test()
    window.onload = function () {
      (function dsCalendar() {
        var oCalendar = document.getElementById('dsCalendar');

        /*上面控制栏所有内容*/
        var oDiv = document.createElement('div');
        oDiv.innerHTML = '<span class="yBtn"><img src="images/y_left.png" alt=""></span>' +
          '<span><img src="images/m_left.png" alt=""></span><div id="cDetail"></div>' +
          '<span><img src="images/m_right.png" alt=""></span>' +
          '<span class="yBtn"><img src="images/y_right.png" alt=""></span>';
        oCalendar.appendChild(oDiv);
        /*日历内容解析*/
        var oDate = new Date();
        var oYear = oDate.getYear();
        var isLeap = oYear % 400 == 0 ? 1 : ((oYear % 100 != 0 && oYear % 4 == 0) ? 1 : 0);
        var aMouth = [31, 28 + isLeap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//创建月份尾数表，作为每张日历最后一个数
        var aWeek = ['日', '一', '二', '三', '四', '五', '六'];
        var y = oDate.getFullYear();
        var m = oDate.getMonth(),
          d = oDate.getDate(),
          w = oDate.getDay();
        //hour=oDate.getHours(),
        //min=oDate.getMinutes(),
        //sec=oDate.getSeconds();
        var oDetail = document.getElementById('cDetail');//显示当前日期的栏目
        var oSpan = oDiv.getElementsByTagName('span');   //4个按钮

        function update() {
          /*table里面的所有内容*/
          var cTable = document.createElement('table'); //创建table
          var cTHead = document.createElement('thead'); //创建thead
          var cTBody = document.createElement('tbody'); //创建tbody
          /*无中生有，通过javascript创造一个table表格*/
          var cTr0 = document.createElement('tr');
          for (var k = 0; k < 7; k++) {
            var cTd0 = document.createElement('td');
            cTd0.innerHTML = aWeek[k];
            cTr0.appendChild(cTd0);
          }
          cTHead.appendChild(cTr0);
          cTable.appendChild(cTHead);


          var firstDate = new Date(y, m, 1); //获取当月第一天
          var dayOfWeek = firstDate.getDay();//获取当月的第一天是星期几
          for (var i = 0; i < 6; i++) {
            var ctr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
              var re = i * 7 + j;
              var re1 = re - dayOfWeek + 1;
              var ctd = document.createElement('td');
              if (re1 <= 0 || re1 > aMouth[m]) {
                ctd.innerHTML = '';
              }
              else {
                ctd.innerHTML = re1;
                if (re1 == d && m == oDate.getMonth() && y == oDate.getFullYear()) {
                  ctd.style.color = 'black';
                  ctd.style.border = '1px dasher black';
                }
              }
              ctr.appendChild(ctd); //将创造出来的td插入到tr中
            }
            cTBody.appendChild(ctr); //将创造出来的tr插入到tbody中
          }
          cTable.appendChild(cTBody); //将创造出来的tbody插入到table中
          oCalendar.appendChild(cTable);//将创造出来的table插入到指定id的div中，完成一个完整table的创建

          /*在控制栏的中部加入当天的时间*/

          oDetail.innerHTML = y + '年' + (m + 1) + '月' + d + '日' + ' ' + '星期' + aWeek[w];

          //4个按钮的功能函数
          for (var a = 0; a < oSpan.length; a++) {
            oSpan[a].index = a;
            oSpan[a].onclick = function () {
              for (var i = 0; i < oSpan.length; i++) {
                oSpan[i].style.background = '';
              }
              this.style.background = 'yellow';
              switch (this.index) {
                case 0: y -= 1; break;
                case 1: {
                  m -= 1;
                  if (m < 0) {
                    m = 11;
                    y -= 1;
                  }
                } break;
                case 2: {
                  m += 1;
                  if (m > 11) {
                    m = 0;
                    y += 1;
                  }
                } break; break;
                case 3: y += 1; break;
              }
              oCalendar.removeChild(cTable);
              update();
              oDetail.innerHTML = y + '年' + (m + 1) + '月' + d + '日' + ' ' + '星期' + aWeek[w];
            };
          }

          //点击任意一天的功能函数
          //var ctr1=cTBody.getElementsByTagName('tr');
          var ctd1 = cTBody.getElementsByTagName('td');
          for (var i = 0; i < ctd1.length; i++) {
            ctd1[i].index = i;
            ctd1[i].onclick = function () {
              for (var i = 0; i < ctd1.length; i++) {
                ctd1[i].style.background = '';
              }
              ctd1[this.index].style.background = 'skyblue';
              oDetail.innerHTML = y + '年' + (m + 1) + '月' + ctd1[this.index].innerText + '日' + ' ' + '星期' + aWeek[(this.index % 7)];
              console.log(this.index);
            }
          }
          console.log(ctd1.length);

        }
        update();
      })();
    };
  },
  methods: {
    test() {
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDay()
      console.log(y, m, d)
    },

  }
}
</script>
<style lang="less">
#dsCalendar {
  width: 500px;
  height: 396px;
  margin: 100px auto;
  border-radius: 20px;
  border: 1px solid black;
  box-shadow: 5px 5px #222;
  box-sizing: border-box;
}

#dsCalendar table {
  width: 500px;
  height: 336px;
  border: 1px solid black;
  box-sizing: border-box;
  // background: url(images/calendar.jpg) 100%;
  font: 25px Times New Roman;
  text-align: center;
  border-radius: 20px;
}
#dsCalendar table thead {
  width: 500px;
  border-radius: 20px;
}
/*#dsCalendar table thead{width:500px;height:56px;background:red;}*/
#dsCalendar table thead tr td {
  color: black;
  height: 80px;
}

#dsCalendar table tbody tr td {
  color: red;
  cursor: pointer;
  height: 36px;
  border-radius: 36px;
}
#dsCalendar table tbody tr td:hover {
  background: skyblue;
  color: black;
}

#dsCalendar div {
  width: 500px;
  height: 60px;
  border-radius: 60px;
}
#dsCalendar div span,
#dsCalendar div span img {
  width: 40px;
  height: 40px;
  border-radius: 50px;
}
#dsCalendar div span {
  float: left;
  box-sizing: border-box;
  cursor: pointer;
  margin-top: 10px;
}

#dsCalendar div .yBtn,
#dsCalendar div .yBtn img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-top: 0;
}

#dsCalendar #cDetail {
  float: left;
  width: 300px;
  height: 60px;
  border: 1px solid black;
  box-sizing: border-box;
  font: 20px Times New Roman;
  text-align: center;
  line-height: 60px;
}
#dsCalendar div:after {
  clear: both;
  content: '';
  display: block;
}
</style>
