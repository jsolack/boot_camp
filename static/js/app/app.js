import solackChart from './components/area_chart.js'

Vue.use(VueHighcharts)
Vue.options.delimiters = ['{%', '%}']


new Vue({
    el: '#main',
	components: { 'solack-chart': solackChart },
	data: {
		age: 55,
		currentPensionValue: 22000,
		retireAge: 87
	},
    computed: {
        data() { return (this.currentPensionValue) / (this.retireAge - this.age) },
        steven() { return this.data * 1.4 },
        agePotValue() {
            var vm = this;
            var agePotValue = [[vm.age, (vm.data)], [vm.retireAge, vm.currentPensionValue]];

            return agePotValue;
        }
	}
})
// const app = new Vue({
//   // create your Vue Object
//   el: '#main',
//   data: {
//       run_time: '',
//       selected: [],
//       platforms: [],
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
//   mounted: function () {
//       // `this` points to the vm instance
//       this.get_platform()
//       this.get_data()
//   },
//   methods: {
//       get_platform: function () {
//           axios.get(GETPLATFORM)
//           .then (response => {
//                 this.$data.platforms = response.data
//                 this.$data.selected = response.data
//           })
//       },
//       get_data: function () {
//         axios.get(GETDATA, {params: {selected: this.$data.selected}})
//           .then(response => {
//             var data = response.data
//             var bar1_data = this.$data.bar1_data
//             bar1_data.labels = data.bar1_data.labels
//             bar1_data.series = []
//             bar1_data.series.push(data.bar1_data.series.map((x) => {return parseFloat(x)}))
//             new Chartist.Bar('.ct-chart1', bar1_data)

//             var pie1_data = this.$data.pie1_data
//             pie1_data.labels = data.pie1_data.labels
//             pie1_data.series = []
//             pie1_data.series.push(data.pie1_data.series.map((x) => {return parseFloat(x)}))
//             new Chartist.Line('.ct-chart2', pie1_data)

//             var bar3_data = this.$data.bar3_data
//             bar3_data.labels = data.bar3_data.labels
//             bar3_data.series = data.bar3_data.series
//             new Chartist.Line('.ct-chart3', bar3_data)

//             this.$data.run_time = data.run_time
//           })
//         }
//     }
// })
