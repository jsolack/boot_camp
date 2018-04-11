const app = new Vue({
  // create your Vue Object
  el: '#main',
  data: {
    big_diff: {},
    bar_option: {
      title: {
          text: ''
      },
      tooltip: {},
      legend: {
          data:['']
      },
      xAxis: {
          data: []
      },
      yAxis: {},
      series: [{
          name: '',
          type: 'bar',
          data: []
      }]
    }
  },
  mounted: function () {
      // `this` points to the vm instance
      var myChart = echarts.init(document.getElementById('t1'))
      this.get_data(myChart)
  },
  methods: {
      get_data: function (mc) {
        axios.get(GETDATA)
          .then(response => {
            var x = response.data
            var ops = this.$data.bar_option
            ops.title.text = 'Games with highest difference from user to critic score'
            ops.legend.data = ["Score"]
            ops.series[0].data = response.data.big_diff.data
            ops.xAxis.data = response.data.big_diff.names
            mc.setOption(ops)
          })
        }
    }
})
