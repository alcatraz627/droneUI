const commandStatus = {
	EMPTY: 'EMPTY',
	RUNNING: 'RUNNING',
	DONE: 'DONE',
}

var vm = new Vue({
	el: '#app',
	delimiters: ['[[', ']]'],
	data: {
		history: [],
		status: commandStatus.EMPTY,
		newCommand: 'ls'
	},

	methods: {
		issueCommand: function () {
			if (this.newCommand.trim() !== '') {
				vm.history.push(`[${vm.history.length/2 + 1}]>> ${vm.newCommand}`);

				fetch('/issue', {
					method: 'POST',
					body: JSON.stringify({ 'command': this.newCommand }),
				}).then(function (response) {
					return response.text()
				}).then(function (response) {
					console.log('Response', response);
					vm.history.push(response);
					this.newCommand = '';
				})
			}
		}
	},

	mounted: function () {
		console.log('Connected!')
	}
});
