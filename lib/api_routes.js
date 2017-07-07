Router.route('/api/status', { where: 'server' }).get(function() {

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify({ message: 'System online' }));

});