const HELPER = Symbol('Context#helper');

module.exports = {

    get helper(){
        if(!this[HELPER]){
            this[HELPER] = new this.app.Helper(this);
        }

        return this[HELPER];
    }

}
