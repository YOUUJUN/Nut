const FileLoader = require('./file_loader');
const utils = require('../utils');

const CLASSLOADER = Symbol('classLoader');
const EXPORTS = FileLoader.EXPORTS;


class ClassLoader {

    constructor (options){
        this.__cache = new Map();
        this.__ctx = options.ctx;

        const properties = options.properties;  //service目录下JS文件暴露的方法属性；

        //获取service目录下所有js文件，在ClassLoader对象上设置defineProperty;
        for(const property in properties){
            this.setProperty(property, properties[property]);
        }
    }

    setProperty(property, values){
        Object.defineProperty(this, property, {
            get(){
                //使用相同模块直接取缓存，无需重复加载;
                let instance = this.__cache.get(property);
                if(!instance){
                    instance = getInstance(values, this.__ctx);
                    this.__cache.set(property, instance);
                }

                return instance;
            }
        })
    }

}


class ContextLoader extends FileLoader{

    constructor(options){

        const cursor = options.cursor = {};

        if (options.fieldClass) {
            options.inject[options.fieldClass] = cursor;
        }

        super(options);

        const app = this.options.inject;
        const property = this.options.property;

        Object.defineProperty(app.context, property, {
            get(){
                if(!this[CLASSLOADER]){
                    this[CLASSLOADER] = new Map();
                }
                const classLoader = this[CLASSLOADER];

                let instance = classLoader.get(property);

                //创建并缓存service实例======>classLoader;
                if(!instance){
                    //此时已经调用过从file_loader.js 继承来的loader()了,cursor指针指向被赋值；
                    instance = getInstance(cursor, this);
                    classLoader.set(property, instance);
                }

                return instance;
            }
        })
    }

}

module.exports = ContextLoader;


function getInstance(values, ctx){
    //如果是目录下面的属性，则没有EXPORTS Symbol属性；
    const Class = values[EXPORTS] ? values : null;
    let instance = {};
    //如果有EXPORTS属性，则为JS文件下暴露属性；
    if(Class){
        //如果是module.exports = Class写法，则:
        if(utils.isClass(Class)){
            instance = new Class(ctx);
        }else{  //如果是module.exports = Object写法，则:
            instance = Class;
        }
    }else if(utils.isPrimitive(values)){  //判断是否为简单类型参数，简单类型无法设置property; // like module.exports = 1;
        instance = values;
    }else{  //如果是null;则创建classLoader对象;
        instance = new ClassLoader({ctx, properties: values});
    }

    return instance;
}


