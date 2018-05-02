import EventBus from './event-bus.js'

const platforms = {
	props: ['platforms', 'selected'],
    template: `
        <nav class="panel">
            <p class="panel-heading">
                Platform Filters
            </p>
            <div class="panel-block">
                <div class="select is-multiple">
                    <select multiple size="18" v-model='mySelected' v-on:change="emitChange" class='multi-select'>
                        <option v-for="platform in platforms" v-bind:value="platform">
                            {% platform %}
                        </option>
                    </select>
                </div>
            </div>
        </nav>
	`,
	data(){
        return{mySelected: this.selected  }
    },
	methods:{
        emitChange() {
            EventBus.$emit('dataUpdate', this.mySelected)
        }
	},
	watch: {
	},
	mounted() {
	}
};


export default platforms
