const Path = require("path");
const utils = require("../../utils");

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(Path.resolve("config", "sequelize.json"))[env];

const FULLPATH = require("../file_loader").FULLPATH;

module.exports = {

    loadModel(options) {
        
        let sequelize;
        if (config.use_env_variable) {
            sequelize = new Sequelize(
                process.env[config.use_env_variable],
                config
            );
        } else {
            console.log('config', config);
            sequelize = new Sequelize(
                config.database,
                config.username,
                config.password,
                config
            );
        }

        const delegate = "model";

        var app = this.app;
        
        let context = app.context;
        let model = app[delegate] = {};


        Object.defineProperty(model, delegate, {
            value: sequelize,
            writable: false,
            configurable: true,
        });

        const DELEGATE = Symbol(`context#sequelize_${delegate}`);

        Object.defineProperty(context, delegate, {
            get() {
                // context.model is different with app.model
                // so we can change the properties of ctx.model.xxx
                if (!this[DELEGATE]) {
                    this[DELEGATE] = Object.create(model[delegate]);
                    this[DELEGATE].ctx = this;
                }
                return this[DELEGATE];
            },
            configurable: true,
        });
        
        const modelDir = Path.join(this.options.baseDir, "app/model");
        

        const target = delegate;

        const models = [];

        this.loadToApp(modelDir, target, {
            caseStyle: 'upper',
            filter(model) {
                if (!model || !model.sequelize) return false;
                models.push(model);
                return true;
            },
            initializer(factory) {
                if (typeof factory === 'function') {
                    return factory(app, sequelize);;
                }
            },
        });

        Object.assign(model[delegate], app[target]);

        models.forEach(model => {
            typeof model.associate === 'function' && model.associate();
        });
        
    },


};
