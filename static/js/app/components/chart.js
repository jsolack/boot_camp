const chart = {
	props: ['options', 'render_to'],
	template: `
		<div class="card">
			<div class="card-content">
				<div class="content">
					<div :id="render_to"></div>
				</div>
			</div>
		</div>
	`,
	data(){
		return{ high_chart:undefined }
	},
	methods:{
		redraw(){
			this.high_chart.update(this.options)
			this.high_chart.redraw()
		}
	},
	watch: {
		options: {
			handler (a) {
				this.redraw()
			},
			deep: true
		}
	},
	mounted() {
		this.options.chart.renderTo = this.render_to
		this.high_chart = new Highcharts.chart(this.options)
	}
};


export default chart
