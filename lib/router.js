Router.configure({
    layoutTemplate: 'layout'
});

// Routes
Router.route('/processes', { name: 'processes', data: function() { this.render('procedures') } });

Router.route('/tasks', { name: 'tasks' });

Router.route('/calendar', { name: 'calendar' });

Router.route('/content/:id', {
    name: 'contentDetails',
    data: function() {
        return Content.findOne(this.params.id)
    }
});

Router.route('/tasks/:id', {
    name: 'taskDetails',
    data: function() {
        return Tasks.findOne(this.params.id)
    }
});


Router.route('/admin', { name: 'admin' });
Router.route('/settings', { name: 'settings' });

Router.route('/', { name: 'home', data: function() { this.render('procedures') } });

Router.route('/processes/:id', {
    name: 'processDetails',
    data: function() {
        return Procedures.findOne(this.params.id)
    }
});
