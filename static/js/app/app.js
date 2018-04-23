Vue.options.delimiters
const app = new Vue({
    delimiters: ['{!',  '!}'],
  // create your Vue Object
  el: '#main',
  data: {
      run_time: '',
      selected: [],
      platforms: [],
      chart1: null,
      chart2: null,
      chart3: null,
    },
  mounted: function () {
      // `this` points to the vm instance
      var c1 = document.getElementById('chart1')
      var c2 = document.getElementById('chart2')
      var c3 = document.getElementById('chart3')
      this.$data.chart1 = new Chart(c1, { type: 'bar' })
      this.$data.chart2 = new Chart(c2, { type: 'line' })
      this.$data.chart3 = new Chart(c3, { type: 'line' })
      this.get_platform()
      this.get_data()
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
            var chart1_data = {
                    datasets: [{
                                data: data.bar1_data.series,
                                label: 'Game Title'
                              }],
                    labels: data.bar1_data.labels
                }
            this.$data.chart1.data = chart1_data
            this.$data.chart1.update()

            var chart2_data = {
                    datasets: [{
                                data: data.pie1_data.series,
                                label: 'Publisher'
                              }],
                    labels: data.pie1_data.labels
                }
            this.$data.chart2.data = chart2_data
            this.$data.chart2.update()

            var chart3_data = {
                    datasets: data.bar3_data.series,
                    labels: data.bar3_data.labels
                }
            this.$data.chart3.data = chart3_data
            this.$data.chart3.update()

            this.$data.run_time = data.run_time
          })
        }
    }
})
