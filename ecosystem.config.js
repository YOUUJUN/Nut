module.exports = {
    apps : [
        {
            name : "test",
            script : "./bin/www",
            watch: true,
            error_file : "./logs/.pm2/err.log",
            out_file : "./logs/.pm2/out.log",
            ignore_watch : ['node_modules','logs','web'],
            env : {
                "NODE_ENV" : "development",
            },
            env_production : {
                "NODE_ENV" : "production"
            }
        }
    ]
};
