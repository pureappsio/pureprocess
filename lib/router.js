Router.configure({
    layoutTemplate: 'layout'
});

// Routes
Router.route('/processes', { name: 'processes', data: function() { this.render('procedures') } });

Router.route('/tasks', { name: 'tasks' });

Router.route('/admin', { name: 'admin' });
Router.route('/', { name: 'home', data: function() { this.render('procedures') } });

Router.route('/processes/:id', { name: 'processDetails', data: function() {
        return Procedures.findOne(this.params.id) } });
