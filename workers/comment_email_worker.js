const { Queue } = require('kue');
const queue = require('../dbconnect/kue');

const comments_mailer =require('../mailer/comment_mail');


queue.process('emails', function(job, done){
    console.log('emails worker is working ', job.data);

    comments_mailer.newComment(job.data);

    done();
})