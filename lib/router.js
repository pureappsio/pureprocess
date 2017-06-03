Router.configure({
    layoutTemplate: 'layout'
});

// Routes
Router.route('/processes', { name: 'processes', data: function() { this.render('procedures') } });

Router.route('/tasks', { name: 'tasks' });
Router.route('/domains', { name: 'domains' });
Router.route('/calendar', { name: 'calendar' });
Router.route('/ideas', { name: 'ideas' });

Router.route('/content/:id', {
    name: 'contentDetails',
    data: function() {
        return Content.findOne(this.params.id)
    }
});

Router.route('/ideas/:id', {
    name: 'ideaDetails',
    data: function() {
        return Content.findOne(this.params.id)
    }
});

Router.route('/domains/:id', {
    name: 'domainDetails',
    data: function() {
        return Domains.findOne(this.params.id)
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
