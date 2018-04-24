import bar_base from './components/chart_base.js'
import bar_chart from './components/bar_chart.js'

Vue.use(VueHighcharts)
Vue.options.delimiters = ['{%', '%}']


const app = new Vue({
    el: '#main',
	components: { 'bar-chart': bar_chart },
	data: {
        run_time: '',
        selected: [],
        platforms: [],
        title: '',
        x_title: '',
        y_title: '',
        bar1_data: [1,2,3],
        bar1_options: bar_base,
        bar1_render_to: 'chart1'
	},
    computed: {
    },
    mounted: function () {
        // `this` points to the vm instance
        this.get_platform()
        // this.get_data()
    },
    methods: {
        get_platform: function () {
            axios.get(GETPLATFORM)
            .then (response => {
                    this.$data.platforms = response.data
                    this.$data.selected = response.data
            })
        },
      get_data: function () {
        axios.get(GETDATA, {params: {selected: this.$data.selected}})
          .then(response => {
            var data = response.data
            // var bar1_data = this.$data.bar1_data
            // bar1_data.labels = data.bar1_data.labels
            // bar1_data.series = []
            // bar1_data.series.push(data.bar1_data.series.map((x) => {return parseFloat(x)}))
            // new Chartist.Bar('.ct-chart1', bar1_data)

            // var pie1_data = this.$data.pie1_data
            // pie1_data.labels = data.pie1_data.labels
            // pie1_data.series = []
            // pie1_data.series.push(data.pie1_data.series.map((x) => {return parseFloat(x)}))
            // new Chartist.Line('.ct-chart2', pie1_data)

            // var bar3_data = this.$data.bar3_data
            // bar3_data.labels = data.bar3_data.labels
            // bar3_data.series = data.bar3_data.series
            // new Chartist.Line('.ct-chart3', bar3_data)

            // this.$data.run_time = data.run_time
          })
        }
    }
})
// const app = new Vue({
//   // create your Vue Object
//   el: '#main',
//   data: {
//       bar1_data: {
//           labels: [],
//           series: [],
//           chartPadding: 80,
//           labelOffset: 50,

//       },
//       pie1_data: {
//           labels: [],
//           series: [],
//           chartPadding: 80,
//           labelOffset: 50,
//       },
//       bar3_data: {
//           labels: [],
//           series: [],
//           chartPadding: 80,
//           labelOffset: 50,
//       },
//     },
// })
