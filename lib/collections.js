import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.debug = true;

// Collections
Procedures = new Mongo.Collection('procedures');
Steps = new Mongo.Collection('steps');
Categories = new Mongo.Collection('categories');
Tasks = new Mongo.Collection('tasks');
DefaultTasks = new Mongo.Collection('defaulttasks');

Content = new Mongo.Collection('content');
Projects = new Mongo.Collection('projects');

Notes = new Mongo.Collection('notes');

References = new Mongo.Collection('references');
Schedules = new Mongo.Collection('schedules');

Domains = new Mongo.Collection('domains');
Preferences = new Mongo.Collection('preferences');
Integrations = new Mongo.Collection('integrations');

// Shemas
const Schemas = {};
Schemas.Domains = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    },
    url: {
        type: String,
        label: "Url"
    },
    filesUrl: {
        optional: true,
        type: String,
        label: "Files URL"
    }
});


Domains.attachSchema(Schemas.Domains);

var knox, bound, client, Request, cfdomain, Collections = {};

if (Meteor.isServer) {
    // Fix CloudFront certificate issue
    // Read: https://github.com/chilts/awssum/issues/164
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    knox = Npm.require('knox');
    Request = Npm.require('request');
    bound = Meteor.bindEnvironment(function(callback) {
        return callback();
    });
    cfdomain = 'https://' + Meteor.settings.s3.cloudfront; // <-- Change to your Cloud Front Domain
    client = knox.createClient({
        key: Meteor.settings.s3.key,
        secret: Meteor.settings.s3.secret,
        bucket: Meteor.settings.s3.bucket,
        region: Meteor.settings.s3.region
    });
}

// Files
this.Files = new Meteor.Files({
    debug: false, // Change to `true` for debugging
    throttle: false,
    chunkSize: 272144,
    storagePath: 'assets/app/uploads/uploadedFiles',
    collectionName: 'Files',
    allowClientCode: false,
    onAfterUpload: function(fileRef) {
        // In onAfterUpload callback we will move file to AWS:S3
        var self = this;
        _.each(fileRef.versions, function(vRef, version) {
            // We use Random.id() instead of real file's _id
            // to secure files from reverse engineering
            // As after viewing this code it will be easy
            // to get access to unlisted and protected files
            var filePath = "files/" + (Random.id()) + "-" + version + "." + fileRef.extension;
            console.log(filePath);
            console.log(vRef);
            client.putFile(vRef.path, filePath, function(error, res) {
                bound(function() {
                    var upd;
                    if (error) {
                        console.log('putFile error');
                        console.error(error);
                    } else {
                        upd = {
                            $set: {}
                        };
                        upd['$set']["versions." + version + ".meta.pipeFrom"] = cfdomain + '/' + filePath;
                        upd['$set']["versions." + version + ".meta.pipePath"] = filePath;
                        self.collection.update({
                            _id: fileRef._id
                        }, upd, function(error) {
                            if (error) {
                                console.log('collection update error');
                                console.error(error);
                            } else {
                                // Unlink original files from FS
                                // after successful upload to AWS:S3
                                console.log('Uploaded to S3');
                                self.unlink(self.collection.findOne(fileRef._id), version);
                                console.log(self.collection.findOne(fileRef._id).versions);
                            }
                        });
                    }
                });
            });
        });
    },
    interceptDownload: function(http, fileRef, version) {
        var path, ref, ref1, ref2;
        path = (ref = fileRef.versions) != null ? (ref1 = ref[version]) != null ? (ref2 = ref1.meta) != null ? ref2.pipeFrom : void 0 : void 0 : void 0;
        if (path) {
            // If file is moved to S3
            // We will pipe request to S3
            // So, original link will stay always secure

            Request({
                url: path,
                headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
            }).pipe(http.response);
            return true;
        } else {
            // While file is not yet uploaded to S3
            // We will serve file from FS
            return false;
        }
    }
});
